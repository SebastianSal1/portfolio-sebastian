"use client";

import React, { useEffect, useRef } from "react";
import { FullSiteStudyTheme } from "@/lib/theme";

export interface AnimatedFlowProps {
  className?: string;
  children?: React.ReactNode;
  theme: FullSiteStudyTheme;
  flowSpeed?: number;
  zoomScale?: number;
  distortionWarp?: number;
  colorContrast?: number;
  interactive?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16) / 255;
    const g = parseInt(cleanHex[1] + cleanHex[1], 16) / 255;
    const b = parseInt(cleanHex[2] + cleanHex[2], 16) / 255;
    return [r, g, b];
  }
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) / 255, ((num >> 8) & 0xff) / 255, (num & 0xff) / 255];
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scale;
uniform float u_warp;
uniform float u_contrast;

uniform int u_studyMode;
uniform vec3 u_colorBase;
uniform vec3 u_colorSoft;
uniform vec3 u_colorMid;
uniform vec3 u_colorPrimary;
uniform vec3 u_colorSecondaryMid;
uniform vec3 u_colorSecondaryDeep;
uniform vec3 u_colorHighlight;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  vec3 g = a0 * vec3(m.x, m.y, m.z) + h * vec3(m.x, m.y, m.z);
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;

  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 aspectUv = vec2(uv.x * aspect, uv.y);

  // Elevated directional flow coordinates
  float cosA = 0.9135;
  float sinA = -0.4067;
  vec2 pivot = vec2(0.58 * aspect, 0.34);
  vec2 rel = aspectUv - pivot;
  vec2 rotUv = vec2(rel.x * cosA - rel.y * sinA, rel.x * sinA + rel.y * cosA);

  vec2 mouseDist = uv - u_mouse;
  float mouseEffect = exp(-dot(mouseDist, mouseDist) * 16.0) * 0.25;

  vec2 q = vec2(
    snoise(rotUv * u_scale * 0.95 + vec2(0.0, 0.0) + u_time * 0.06),
    snoise(rotUv * u_scale * 0.95 + vec2(5.1, 1.7) + u_time * 0.06)
  );

  vec2 r = vec2(
    snoise(rotUv * u_scale * 1.35 + 2.8 * q + vec2(2.3, 8.1) + u_time * 0.12 + mouseEffect),
    snoise(rotUv * u_scale * 1.35 + 2.8 * q + vec2(7.4, 3.2) + u_time * 0.12 + mouseEffect)
  );

  float f = snoise(rotUv * u_scale + u_warp * r + u_time * 0.08);
  float fSecondary = snoise(rotUv * u_scale * 1.55 - 2.4 * q + vec2(3.7, 9.2) + u_time * 0.10);

  // Sharpened streamlines and contour folds
  float streamPhase = f * 3.14159 * 2.4 + rotUv.y * 6.5 + u_time * 0.16;
  float ribbonSine = sin(streamPhase);
  float thinLines = pow(clamp(1.0 - abs(ribbonSine), 0.0, 1.0), 4.5);
  float crestFilaments = pow(clamp(sin(streamPhase * 1.5), 0.0, 1.0), 5.0);

  float ridgeShape = pow(clamp(f * 0.5 + 0.5, 0.0, 1.0), 1.6);
  float rawFluid = mix(ridgeShape, clamp(ribbonSine * 0.5 + 0.5, 0.0, 1.0), 0.45);
  rawFluid = clamp(rawFluid + thinLines * 0.4 + crestFilaments * 0.3, 0.0, 1.0);

  // Visible Left Tail
  float leftTailStream1 = exp(-pow((uv.y - 0.32 - q.y * 0.14) / 0.12, 2.0));
  float leftTailStream2 = exp(-pow((uv.y - 0.42 + q.x * 0.10) / 0.08, 2.0));
  float leftTailLines = (leftTailStream1 * 0.7 + leftTailStream2 * 0.5) * (0.15 + 0.85 * thinLines);
  float leftTailMask = leftTailLines * (1.0 - smoothstep(0.08, 0.48, uv.x));

  // Elevated Right-Center Body
  float rightCenterWeight = smoothstep(0.18, 0.58, uv.x);
  float organicVoids = clamp(snoise(rotUv * 0.8 + vec2(2.5, 5.0)) * 0.5 + 0.55, 0.1, 1.0);
  float verticalEnvelop = smoothstep(0.01, 0.18, uv.y) * (1.0 - smoothstep(0.58, 0.78, uv.y));
  float rightBodyMask = rightCenterWeight * verticalEnvelop * organicVoids;

  float systemPresence = clamp(leftTailMask * 0.75 + rightBodyMask * 0.98, 0.0, 1.0);
  float t = clamp(rawFluid * systemPresence * u_contrast, 0.0, 1.0);

  vec3 flowCol = u_colorBase;

  if (u_studyMode == 0) {
    // STUDY A: Warm Vermilion Monochrome
    if (t < 0.16) {
      flowCol = mix(u_colorBase, u_colorSoft, smoothstep(0.0, 1.0, t / 0.16));
    } else if (t < 0.45) {
      flowCol = mix(u_colorSoft, u_colorMid, smoothstep(0.0, 1.0, (t - 0.16) / 0.29));
    } else if (t < 0.78) {
      flowCol = mix(u_colorMid, u_colorPrimary, smoothstep(0.0, 1.0, (t - 0.45) / 0.33));
    } else if (t < 0.93) {
      flowCol = mix(u_colorPrimary, u_colorSecondaryDeep, smoothstep(0.0, 1.0, (t - 0.78) / 0.15));
    } else {
      flowCol = mix(u_colorSecondaryDeep, u_colorHighlight, smoothstep(0.0, 1.0, (t - 0.93) / 0.07));
    }
  } else {
    // STUDIES B, C, D, E: Dual-Pigment System (Primary Chroma + Deep Secondary Veins)
    float secVein = smoothstep(0.28, 0.75, (fSecondary * 0.5 + 0.5) * (1.0 - abs(ribbonSine) * 0.5));
    float secondaryMask = secVein * smoothstep(0.18, 0.85, t) * 0.92;

    vec3 primaryLayer = u_colorBase;
    if (t < 0.16) {
      primaryLayer = mix(u_colorBase, u_colorSoft, smoothstep(0.0, 1.0, t / 0.16));
    } else if (t < 0.52) {
      primaryLayer = mix(u_colorSoft, u_colorPrimary, smoothstep(0.0, 1.0, (t - 0.16) / 0.36));
    } else if (t < 0.88) {
      primaryLayer = mix(u_colorPrimary, u_colorSoft, smoothstep(0.0, 1.0, (t - 0.52) / 0.36) * 0.25);
    } else {
      primaryLayer = mix(u_colorPrimary, u_colorHighlight, smoothstep(0.0, 1.0, (t - 0.88) / 0.12));
    }

    vec3 secondaryLayer = mix(u_colorSecondaryMid, u_colorSecondaryDeep, smoothstep(0.20, 0.80, secVein));
    flowCol = mix(primaryLayer, secondaryLayer, secondaryMask);
  }

  // Luminous highlight filaments
  float edgeGlow = thinLines * crestFilaments * smoothstep(0.35, 0.95, t);
  flowCol = mix(flowCol, u_colorHighlight, edgeGlow * 0.85);

  // Left tail accent
  if (uv.x < 0.42 && leftTailMask > 0.1) {
    float tailAccentFactor = smoothstep(0.3, 0.85, leftTailLines);
    flowCol = mix(flowCol, u_colorPrimary, tailAccentFactor * 0.65);
  }

  vec3 finalColor = mix(u_colorBase, flowCol, smoothstep(0.02, 0.98, systemPresence));
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function AnimatedFlow({
  className = "",
  children,
  theme,
  flowSpeed = 0.65,
  zoomScale = 1.0,
  distortionWarp = 3.2,
  colorContrast = 1.55,
  interactive = true,
}: AnimatedFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.62, y: 0.34, targetX: 0.62, targetY: 0.34 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: false, powerPreference: "high-performance" }) ||
               (canvas.getContext("experimental-webgl", { preserveDrawingBuffer: false }) as WebGLRenderingContext | null);
    if (!gl) return;

    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uScale = gl.getUniformLocation(program, "u_scale");
    const uWarp = gl.getUniformLocation(program, "u_warp");
    const uContrast = gl.getUniformLocation(program, "u_contrast");

    const uStudyMode = gl.getUniformLocation(program, "u_studyMode");
    const uColorBase = gl.getUniformLocation(program, "u_colorBase");
    const uColorSoft = gl.getUniformLocation(program, "u_colorSoft");
    const uColorMid = gl.getUniformLocation(program, "u_colorMid");
    const uColorPrimary = gl.getUniformLocation(program, "u_colorPrimary");
    const uColorSecondaryMid = gl.getUniformLocation(program, "u_colorSecondaryMid");
    const uColorSecondaryDeep = gl.getUniformLocation(program, "u_colorSecondaryDeep");
    const uColorHighlight = gl.getUniformLocation(program, "u_colorHighlight");

    let animId: number | null = null;
    let isVisible = true;
    const startTime = performance.now();
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(300, Math.floor((rect.width || window.innerWidth) * dpr));
      const h = Math.max(300, Math.floor((rect.height || window.innerHeight) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / (rect.width || 1)));
      const y = Math.max(0, Math.min(1, 1.0 - (clientY - rect.top) / (rect.height || 1)));
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("touchmove", handlePointerMove, { passive: true });
    }
    resize();

    const s = theme.shader;
    const cBase = hexToRgb(s.base);
    const cSoft = hexToRgb(s.soft);
    const cMid = hexToRgb(s.mid);
    const cPrimary = hexToRgb(s.primary);
    const cSecMid = hexToRgb(s.secondaryMid);
    const cSecDeep = hexToRgb(s.secondaryDeep);
    const cHighlight = hexToRgb(s.highlight);

    const render = (now: number) => {
      const elapsedTime = (now - startTime) * 0.001 * flowSpeed;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsedTime);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uScale, zoomScale);
      gl.uniform1f(uWarp, distortionWarp);
      gl.uniform1f(uContrast, colorContrast);

      gl.uniform1i(uStudyMode, s.mode);
      gl.uniform3f(uColorBase, cBase[0], cBase[1], cBase[2]);
      gl.uniform3f(uColorSoft, cSoft[0], cSoft[1], cSoft[2]);
      gl.uniform3f(uColorMid, cMid[0], cMid[1], cMid[2]);
      gl.uniform3f(uColorPrimary, cPrimary[0], cPrimary[1], cPrimary[2]);
      gl.uniform3f(uColorSecondaryMid, cSecMid[0], cSecMid[1], cSecMid[2]);
      gl.uniform3f(uColorSecondaryDeep, cSecDeep[0], cSecDeep[1], cSecDeep[2]);
      gl.uniform3f(uColorHighlight, cHighlight[0], cHighlight[1], cHighlight[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    // Pause render loop when offscreen to conserve GPU/battery
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    animId = requestAnimationFrame(render);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      if (interactive) {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("touchmove", handlePointerMove);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    theme,
    colorContrast,
    distortionWarp,
    flowSpeed,
    interactive,
    zoomScale,
  ]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}

export default AnimatedFlow;
