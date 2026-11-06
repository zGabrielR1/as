"use client"

import { useEffect, useRef, type ReactNode } from "react";

interface ShaderBackgroundProps {
  children?: ReactNode;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      console.error("WebGL not supported — showing static fallback");
      return;
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);

    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Pastel mesh (pink / periwinkle / lavender / peach) on a deep navy-plum
    // base, so the previous pinkish image's vibe survives as code without
    // needing a 7MB raster — and white hero text stays readable.
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 4; i++) {
          v += amp * noise(p);
          p = p * 2.0 + vec2(1.7, 9.2);
          amp *= 0.5;
        }
        return v;
      }

      vec3 pastel(vec2 uv, float t) {
        vec2 q = vec2(
          fbm(uv * 1.2 + vec2(0.0, t * 0.05)),
          fbm(uv * 1.2 + vec2(5.2, 1.3) - t * 0.04)
        );
        vec2 r = vec2(
          fbm(uv * 1.2 + 4.0 * q + vec2(1.7, 9.2) + t * 0.03),
          fbm(uv * 1.2 + 4.0 * q + vec2(8.3, 2.8) - t * 0.02)
        );
        float f = fbm(uv * 1.2 + 4.0 * r);

        vec3 deep  = vec3(0.07, 0.06, 0.14);
        vec3 rose  = vec3(0.94, 0.62, 0.80) * 0.65;
        vec3 peri  = vec3(0.55, 0.66, 0.95) * 0.60;
        vec3 lav   = vec3(0.72, 0.65, 0.92) * 0.45;
        vec3 peach = vec3(0.98, 0.76, 0.60) * 0.35;

        vec3 col = deep;
        col = mix(col, rose,  clamp(f * f * 2.2, 0.0, 1.0));
        col = mix(col, peri,  clamp(length(q) * 0.55, 0.0, 1.0) * 0.7);
        col = mix(col, lav,   clamp(length(r.x) * 0.5, 0.0, 1.0) * 0.5);
        col = mix(col, peach, clamp(r.y * 0.35, 0.0, 1.0) * 0.35);

        float vignette = smoothstep(1.4, 0.4, length(uv));
        col *= mix(0.75, 1.1, vignette);
        return col;
      }

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= 1.8;
        gl_FragColor = vec4(pastel(uv, iTime), 1.0);
      }
    `;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
      window.removeEventListener("resize", resizeCanvas);
      return;
    }

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      window.removeEventListener("resize", resizeCanvas);
      return;
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Shader link error:", gl.getProgramInfoLog(shaderProgram));
      gl.deleteProgram(shaderProgram);
      window.removeEventListener("resize", resizeCanvas);
      return;
    }
    gl.useProgram(shaderProgram);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(shaderProgram, "iTime");
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "iResolution");

    resizeCanvas();

    let rafId = 0;
    let disposed = false;
    const startTime = Date.now();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderOnce = (time: number) => {
      gl.uniform1f(timeUniformLocation, time);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (prefersReducedMotion) {
      renderOnce(12.0);
      return () => {
        window.removeEventListener("resize", resizeCanvas);
        gl.deleteProgram(shaderProgram);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      };
    }

    const render = () => {
      if (disposed) return;
      const currentTime = (Date.now() - startTime) / 1000;
      renderOnce(currentTime);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className="pastel-fallback relative min-h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
