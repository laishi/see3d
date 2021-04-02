var image,
    canvas,
    rect,
    gl,
    m = [0, 0],
    vertices = [],
    velocities = [],
    particles = 100,
    time = 0,
    iW, iH;

var simplex = new SimplexNoise();

var resolutionLocation,
    vertexPosAttribLocation;

window.onload = start;
window.onresize = resize;
window.onmousemove = function(e) { m[0] = e.pageX; m[1] = e.pageY };

function resize() {

  iW = canvas.width = window.innerWidth,
  iH = canvas.height = window.innerHeight;

  rect = canvas.getBoundingClientRect();

  if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  gl.viewport(0, 0, canvas.width, canvas.height);

};

function start() {

  image = document.getElementById("image");
  canvas = document.getElementById("c");
  gl = canvas.getContext("experimental-webgl");

  resize();
  
  m[0] = canvas.width / 2;
  m[1] = canvas.height / 2;

  main();

}

function main() {

  var vshader = load_shader("vertex-shader", gl.VERTEX_SHADER);
  var fshader = load_shader("fragment-shader", gl.FRAGMENT_SHADER);

  gl.program = gl.createProgram();
  gl.attachShader(gl.program, vshader);
  gl.attachShader(gl.program, fshader);
  gl.linkProgram(gl.program);
  gl.useProgram(gl.program);

  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  vertexPosAttribLocation = gl.getAttribLocation(gl.program, "vertexPosition");
  resolutionLocation = gl.getUniformLocation(gl.program, "u_resolution");

  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.enableVertexAttribArray(vertexPosAttribLocation);
  gl.vertexAttribPointer(vertexPosAttribLocation, 2, gl.FLOAT, false, 0, 0);

  setup();

  loop();

}

function load_shader(el, type) {

  var script = document.getElementById(el);
  var shader = gl.createShader(type);

  gl.shaderSource(shader, script.text);
  gl.compileShader(shader);

  return shader;

}

function setup() {
  
  for (i = 0; i < particles; i++) {

    var x = canvas.width / 2,
        y = canvas.height / 2;

    vertices.push(x, y, x, y);

    velocities.push(Math.random() * 6 - 3, Math.random() * 6 - 3);
  }

  vertices = new Float32Array(vertices);
  velocities = new Float32Array(velocities);

}

function calc_particles() {

  for (i = 0; i < particles; i++) {

    bp = i * 4;

    vertices[bp] = vertices[bp + 2];
    vertices[bp + 1] = vertices[bp + 3];

    var s = simplex.noise3D(vertices[bp] / 100, vertices[bp + 1] / 100, time / 1000);

    vertices[bp + 2] += velocities[bp] + s;
    vertices[bp + 3] += velocities[bp + 1] + s;

    if (vertices[bp] < 0 || vertices[bp] > canvas.width || vertices[bp + 1] < 0 || vertices[bp + 1] > canvas.height) {
      vertices[bp] = vertices[bp + 2] = m[0];
      vertices[bp + 1] = vertices[bp + 3] = m[1];
    }

  }

}

function loop(){

  calc_particles();

  gl.lineWidth(2);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, particles * 2);
  gl.flush();

  time++;

  requestAnimationFrame(loop);

}