
// const drawIntro = (canvasSize = [500, 500],loopCallback) => {
// Record the initial time so the delta can be calculated later
const timeSubtract = new Date().getTime()
// The amplitude indicators on the harmonics are called beads
const beadSize = 2
const speed = 1
const frameRate = 60
const axesStrokeColor = 'rgba(128, 128, 128, 1)'
const featureFillColor = 'rgba(0, 128, 255, .1)'
const featureStrokeColor = 'rgba(0, 128, 255, 1)'

const canvasSize = [500, 500]

const wavePrecision = .25 // How smooth the tide chart curves should be
let width = canvasSize[0]
let height = canvasSize[1]

let globeSize = width / 4

// This is how much to scale by
// const unit = ((height / 2) / scale)

// declare a lot of variables that should not be redeclared each time
let canvas, ctx, xAxis, yAxis,
timeSeriesLength;


const init = () => {
 // this may change, will revisit
 canvas = document.getElementById('canvas');

 canvas.width = canvasSize[0];
 canvas.height = canvasSize[1];

 ctx = canvas.getContext("2d");
 ctx.lineJoin = 'round';

 xAxis = Math.floor(height/2);
 yAxis = Math.floor(width/2);

 timeSeriesLength = ((width - yAxis) / wavePrecision)

 ctx.save();

 window.requestAnimationFrame(draw);
}

const draw = () => {

 const time = new Date()

 ctx.clearRect(0, 0, width, height);

 // Draw the axes in their own path
 ctx.strokeStyle = axesStrokeColor;



 // Set styles for animated graphics
 ctx.save();
 ctx.strokeStyle = featureStrokeColor;
 ctx.fillStyle = featureFillColor;
 ctx.lineWidth = 1;


drawGlobe(globeSize)

 // Update the time and draw again
 draw.t = (time - timeSubtract) / (100000 / speed);
 ctx.restore();


 drawTideCurve(draw.t)


setTimeout(draw, (1000 / frameRate));
}

const drawTideCurve = (time) => {





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



init()
