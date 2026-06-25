import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_waveIntensity;
uniform float u_mouseInfluence;
uniform vec2 u_mouse;
varying float v_wave;

void main() {
  vec2 pos = a_pos / u_res;
  vec2 p = pos * 2.0 - 1.0;

  // Use aspect-corrected coordinates for calculations
  float aspect = u_res.x / u_res.y;
  vec2 p_corrected = p;
  p_corrected.x *= aspect;

  float t = u_time * u_waveSpeed;

  float w1 = sin(p_corrected.x * 4.0 + t) * cos(p_corrected.y * 3.0 - t * 0.8);
  float w2 = sin(p_corrected.x * 6.0 - t * 1.2) * sin(p_corrected.y * 5.0 + t);
  float w3 = cos((p_corrected.x + p_corrected.y) * 3.0 + t * 0.5);

  float displacement = w1 * 0.5 + w2 * 0.3 + w3 * 0.2;

  vec2 mousePos = (u_mouse / u_res) * 2.0 - 1.0;
  mousePos.x *= aspect;

  float dist = length(p_corrected - mousePos);
  float mouseEffect = exp(-dist * dist * 8.0) * u_mouseInfluence;

  float z = displacement * u_waveIntensity + mouseEffect;

  v_wave = z;
  gl_Position = vec4(p, z, 1.0);
  gl_PointSize = 2.0 + mouseEffect * 4.0;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
varying float v_wave;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res - 0.5;
  uv.x *= u_res.x / u_res.y;

  float t = u_time * 0.5;
  float colorWave = sin(v_wave * 5.0 + t) * 0.5 + 0.5;

  vec3 color1 = vec3(0.96, 0.62, 0.04);
  vec3 color2 = vec3(1.0, 0.84, 0.4);
  vec3 color3 = vec3(0.98, 0.95, 0.94);

  vec3 finalColor = mix(color1, color2, colorWave);
  finalColor += color3 * colorWave * 0.2;

  float vignette = smoothstep(0.8, 0.3, length(uv));
  finalColor *= vignette;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string): WebGLProgram | null {
  const vert = createShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  gl.deleteShader(vert);
  gl.deleteShader(frag);

  return program;
}

interface WaveformCanvasProps {
  isVisible: boolean;
}

export default function WaveformCanvas({ isVisible }: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const numPointsRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 16.0;
    const waveSpeed = 0.5;
    const waveIntensity = 0.15;
    const mouseInfluence = 0.2;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;
    glRef.current = gl;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;

    gl.useProgram(program);

    const posAttr = gl.getAttribLocation(program, 'a_pos');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uWaveSpeed = gl.getUniformLocation(program, 'u_waveSpeed');
    const uWaveIntensity = gl.getUniformLocation(program, 'u_waveIntensity');
    const uMouseInfluence = gl.getUniformLocation(program, 'u_mouseInfluence');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    uniformsRef.current = { uTime, uRes, uWaveSpeed, uWaveIntensity, uMouseInfluence, uMouse };

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    function buildGrid(w: number, h: number) {
      const positions: number[] = [];
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          positions.push(x, y);
        }
      }
      numPointsRef.current = positions.length / 2;
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(positions), gl!.STATIC_DRAW);
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      buildGrid(canvas!.width, canvas!.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (canvas.clientHeight - (e.clientY - rect.top)) * dpr;
    };
    canvas.addEventListener('mousemove', handleMouse);

    function render() {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      const t = performance.now() * 0.001;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uWaveSpeed, waveSpeed);
      gl!.uniform1f(uWaveIntensity, waveIntensity);
      gl!.uniform1f(uMouseInfluence, mouseInfluence);
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

      gl!.drawArrays(gl!.POINTS, 0, numPointsRef.current);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Animated waveform visualization"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
