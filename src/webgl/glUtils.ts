export function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[gl] shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function link(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string
): WebGLProgram | null {
  const vert = compile(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  // The shaders live on inside the program; drop our references either way.
  gl.deleteShader(vert);
  gl.deleteShader(frag);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("[gl] program link failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function makeBuffer(
  gl: WebGLRenderingContext,
  data: Float32Array
): WebGLBuffer | null {
  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

export function bindAttrib(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  buffer: WebGLBuffer,
  size: number
) {
  const loc = gl.getAttribLocation(program, name);
  if (loc < 0) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
}
