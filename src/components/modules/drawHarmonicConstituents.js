
const drawVisualizer = (harcon, canvasName,
   numOfConstituents = 5,
    canvasSize = [500, 500]) => {
// Record the initial time so the delta can be calculated later
const timeSubtract = new Date().getTime()
// The amplitude indicators on the harmonics are called beads
const beadSize = 2
const speed = 1
const frameRate = 60
const axesStrokeColor = 'rgba(128, 128, 128, 1)'
const featureFillColor = 'rgba(0, 128, 255, .1)'
const featureStrokeColor = 'rgba(0, 128, 255, 1)'
let beadColor = 'rgba(255, 0, 0, 1)'
const wavePrecision = .25 // How smooth the tide chart curves should be
let constituents = [...harcon]
constituents.sort((a, b) => b.amplitude - a.amplitude)
constituents = constituents.slice(0, numOfConstituents)
let width = canvasSize[0]
let height = canvasSize[1]

// This is how much to scale by
const scale = constituents.map((a) => a.amplitude).reduce((a, b) => a + b)

const unit = ((height / 2) / scale)

let timeSeriesChords = []

// declare a lot of variables that should not be redeclared each time
let canvas, ctx, xAxis, yAxis,
    x, y, nextXCenter, nextYCenter, timeSeriesLength;

const emptyFunction = () => {
}

const init = () => {
  // this may change, will revisit
  canvas = document.getElementById(canvasName);

  canvas.width = canvasSize[0];
  canvas.height = canvasSize[1];

  ctx = canvas.getContext("2d");
  ctx.lineJoin = 'round';

  xAxis = Math.floor(height/2);
  yAxis = Math.floor(width/4 - scale);

  timeSeriesLength = ((width - yAxis) / wavePrecision)

  populateTimeSeries(timeSeriesLength, emptyFunction)

  ctx.save();

  window.requestAnimationFrame(draw);
}

const draw = () => {

  const time = new Date()

  nextXCenter = yAxis
  nextYCenter = xAxis

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
  draw.t = (time - timeSubtract) / (100000 / speed);
  runThroughConstituents(draw.t * Math.PI, drawEpicycles)
  drawTideChart();
  drawArrow();
  drawBead()
  ctx.restore();

  setTimeout(draw, (1000 / frameRate));
}

const runThroughConstituents = (time, drawFunction) => {
  constituents.forEach((constituent, idx) => {
    const radius = Math.floor(constituent.amplitude * unit)
    drawFunction(radius)
    getLocationOnCircle(time, radius, constituent)
    if (idx == (constituents.length - 1)) {
      timeSeriesChords = [...timeSeriesChords, nextYCenter].slice(-timeSeriesLength)
    }
  })
}

const getRadians = (angle) => {
  return (angle * (Math.PI / 180))
}

const getLocationOnCircle = (time, radius, constituent) => {
  let nextCenters = getPhasedXY(time, radius, constituent)
  nextXCenter = nextCenters[0]
  nextYCenter = nextCenters[1]
}

const getPhasedXY = (time, radius, constituent) => {
  const { phase_GMT, speed} = constituent
  let phase = phase_GMT
  let phaseX = nextXCenter + (radius * Math.sin(((time + getRadians(phase)) * speed)))
  let phaseY = nextYCenter + (radius * Math.cos(((time + getRadians(phase)) * speed)))
  return [phaseX, phaseY]
}

const populateTimeSeries = (timeSeriesLength) => {
  for (let i = 0; i < timeSeriesLength; i++) {
    runThroughConstituents(i, emptyFunction)
    timeSeriesChords.push(nextYCenter)
  }
}

// Drawing functions
const drawArrow = () => {
  ctx.beginPath()
  ctx.setLineDash([5, 10]);
  ctx.moveTo(yAxis, nextYCenter)
  ctx.lineTo(nextXCenter, nextYCenter)
  ctx.stroke()
}

const drawBead = () => {
  ctx.beginPath()
      ctx.strokeStyle = beadColor;
      ctx.fillStyle = beadColor;
      ctx.arc(nextXCenter, nextYCenter, beadSize, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = featureStrokeColor; // restore color
}


const drawEpicycles = (radius) => {
  ctx.beginPath()
  ctx.arc(nextXCenter, nextYCenter, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}



function drawTideChart() {
  ctx.beginPath();
  ctx.moveTo(width, timeSeriesChords[0]);
  timeSeriesChords.slice(1).forEach((yCoordinate, idx) => {
    ctx.lineTo((width - ((idx + 1) * wavePrecision)), yCoordinate);
  })
  ctx.stroke();
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

init()
}

export default drawVisualizer
