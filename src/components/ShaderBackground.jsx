import { useEffect, useRef } from 'react';

// Animated "plasma lines" behind the hero, adapted for a light page:
// a white base (read from the parent's own background, so the edges blend
// in) with brand-blue lines kept faint enough to read text over.
//
// Sized to its parent (not the window), paused while off-screen, a single
// still frame for prefers-reduced-motion, and nothing at all without WebGL
// — the parent's plain background simply shows through.

// Brand blue #0062ff as 0–1 RGB.
const BRAND_BLUE = [0 / 255, 98 / 255, 255 / 255];
// How strongly the lines tint the white base (0 = invisible, 1 = solid blue).
const LINE_STRENGTH = 0.08;
// Cap the backing-store resolution; the lines are soft, so full Retina
// resolution costs GPU time without looking any different.
const MAX_DPR = 1.5;

const VERTEX_SHADER = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform float uStrength;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float scale = 5.0;
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;
    // Scale by the wider of width and (stretched) height, so a tall, narrow
    // phone canvas shows the same full flow instead of a thin strip.
    float span = max(iResolution.x, iResolution.y * 1.6);
    vec2 space = (fragCoord - iResolution.xy / 2.0) / span * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    float lines = 0.0;
    for (int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      lines += (line + circle) * rand;
    }

    // Light version of the original: instead of adding glowing lines onto a
    // dark purple base, tint a white base towards brand blue where lines are.
    // verticalFade keeps the top and bottom edges clean so the canvas blends
    // into the section around it; textCalm cuts the lines to 15% in the centre
    // column, where the hero copy sits, so body text keeps its contrast.
    float textCalm = mix(0.15, 1.0, smoothstep(0.18, 0.42, abs(uv.x - 0.5)));
    float amount = clamp(lines, 0.0, 1.0) * uStrength * verticalFade * textCalm;
    gl_FragColor = vec4(mix(uBase, uLine, amount), 1.0);
  }
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('ShaderBackground compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// "rgb(250, 251, 253)" → [0.98, 0.98, 0.99]; falls back to white.
function parseRgb(value) {
  const m = /rgba?\(([^)]+)\)/.exec(value || '');
  if (!m) return [1, 1, 1];
  const [r, g, b, a = 1] = m[1].split(',').map((n) => parseFloat(n));
  if (a === 0) return [1, 1, 1];
  return [r / 255, g / 255, b / 255];
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined; // no WebGL: the parent's background shows through

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return undefined;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('ShaderBackground link error:', gl.getProgramInfoLog(program));
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aVertexPosition');
    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');
    const uBase = gl.getUniformLocation(program, 'uBase');
    const uLine = gl.getUniformLocation(program, 'uLine');
    const uStrength = gl.getUniformLocation(program, 'uStrength');

    gl.useProgram(program);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    const host = canvas.parentElement;
    gl.uniform3fv(uBase, parseRgb(host && getComputedStyle(host).backgroundColor));
    gl.uniform3fv(uLine, BRAND_BLUE);
    gl.uniform1f(uStrength, LINE_STRENGTH);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let frame = 0;
    let visible = true;

    const draw = (now) => {
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      // Reduced motion: one representative still frame, never animated.
      gl.uniform1f(uTime, reduceMotion ? 12 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = (now) => {
      draw(now);
      frame = visible && !reduceMotion ? requestAnimationFrame(loop) : 0;
    };
    const play = () => { if (!frame) frame = requestAnimationFrame(loop); };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Stop drawing while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    io.observe(canvas);
    play();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className={`shader-bg ${className}`.trim()} aria-hidden="true" />;
}
