// Record the initial time so the delta can be calculated later
const timeSubtract = new Date().getTime()
// The amplitude indicators on the harmonics are called beads
const beadSize = 2
const mainSpeed = 5000
const frameRate = 60
const axesStrokeColor = 'rgba(128, 128, 128, 1)'
const featureFillColor = 'rgba(0, 128, 255, .1)'
const featureStrokeColor = 'rgba(0, 128, 255, 1)'

const globeSize = 100

let canvasSize = {
  x: 500,
  y: 500
}

let width = canvasSize.x
let height = canvasSize.y
// This is how much to scale by







// declare a lot of variables that should not be redeclared each time
let canvas, ctx, xAxis, yAxis;

const init = () => {
 // this may change, will revisit
 canvas = document.getElementById('canvas');

 canvas.width = canvasSize.x;
 canvas.height = canvasSize.y;

 ctx = canvas.getContext("2d");
 ctx.lineJoin = 'round';

 xAxis = Math.floor(height/2);
 yAxis = Math.floor(width/2);

 ctx.save();

 window.requestAnimationFrame(draw);
}

const draw = () => {

 const time = new Date()

 ctx.clearRect(0, 0, width, height);

 // Draw the axes in their own path
 ctx.strokeStyle = axesStrokeColor;
 ctx.beginPath();
 drawAxes();

 // Set styles for animated graphics
 ctx.save();
 ctx.strokeStyle = featureStrokeColor;
 ctx.fillStyle = featureFillColor;
 ctx.lineWidth = 1;

 // Update the time and draw again
 draw.t = (time - timeSubtract) / (100000 / mainSpeed);

 ctx.restore();

 drawEllipse(draw.t)
 drawGlobe(globeSize)

setTimeout(draw, (1000 / frameRate));


}

const getRadians = (angle) => {
  return (angle * (Math.PI / 180))
}

const drawGlobe = (globeSize) => {
  ctx.strokeStyle = '#464655';
  ctx.fillStyle = '#464655';
  ctx.lineWidth = 1;
  ctx.beginPath()
  ctx.arc(xAxis, yAxis, globeSize, 0, 2 * Math.PI, false)
  ctx.fill()
  ctx.stroke()
}

const drawAxes = () => {
 // Draw X and Y axes
 ctx.strokeStyle = axesStrokeColor;
 ctx.moveTo(0, xAxis);
 ctx.lineTo(width, xAxis);
 ctx.moveTo(yAxis, 0);
 ctx.lineTo(yAxis, height);
 ctx.stroke();
}

const drawEllipse = (time) => {
  let startAngle = getRadians(time % 360)
  ctx.strokeStyle = featureStrokeColor;
  ctx.fillStyle = featureFillColor;
  ctx.beginPath();
  ctx.ellipse(xAxis, yAxis, globeSize + 5, globeSize + 20, startAngle, 0, Math.PI);
  ctx.arc(xAxis, yAxis, globeSize + 5, startAngle + Math.PI, startAngle);
  ctx.stroke();
  ctx.fill()
}

init()
