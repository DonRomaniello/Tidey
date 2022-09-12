import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { useSelector } from "react-redux";

import {colorRange} from './css/NewCanvas.module.js'

export const NewCanvas = (props) => {

  const frameDuration = 41;
  const beadSize = 2
  const speed = .001
  const axesStrokeColor = 'rgba(128, 128, 128, 1)'
  const beadColor = 'rgba(219, 80, 74, 1)'
  // const beadStroke = `rgb(${colorRange.end.r},${colorRange.end.g},${colorRange.end.b})`
  const waveRoughness = 10
  const waveScaling = .05

  const {canvasName, canvasSize} = props

  const { harmonics, shownNumber } = useSelector((state) => state.harmonics)

  const [frame, setFrame] = useState(0);

  const canvasEl = useRef(null)

  const [timeSeries, setTimeSeries] = useState([])


  const produceConstituentArray = (_harmonics, _shownNumber) => {
    let hc = [..._harmonics]
    return hc.slice(0, _shownNumber + 1)}
  const constituents = useMemo(() => produceConstituentArray(harmonics, shownNumber), [harmonics, shownNumber]);

  const calcScale = (_constituents) => {
    let s = _constituents.map((a) => a.amplitude).reduce((a, b) => a + b)
    console.log(_constituents.length, s)
    return s}
  const scale = useMemo(() => calcScale(constituents), [constituents])

  const calcUnit = (_canvasSize, _scale) => {
    let u = (((_canvasSize[1] / 2) - 2) / _scale)
    console.log('unit:', u)
    return u}
  const unit = useMemo(() => calcUnit(canvasSize, scale), [canvasSize, scale])

  const calcXAxis = (_canvasSize) => {
    let x = Math.floor(_canvasSize[1]/2)
    return x}
  const xAxis = useMemo(() => calcXAxis(canvasSize), [canvasSize])

  const calcYAxis = (_canvasSize) => {
    let y = Math.floor(_canvasSize[0]/4)
    return y}
  const yAxis = useMemo(() => calcYAxis(canvasSize), [canvasSize])

  const calcTimeSeriesSteps = (_canvasSize, _waveRoughness) => {
    let steps = Math.floor((canvasSize[0] - yAxis) / (waveRoughness * waveScaling)) + 50
    console.log(steps)
    return steps
  }
  const timeSeriesSteps = useMemo(() => calcTimeSeriesSteps(canvasSize, waveRoughness, waveScaling), [canvasSize, waveRoughness, waveScaling])




            // const [xCenter, setXCenter] = useState(yAxis)

            // const [nextYCenter, setNextYCenter] = useState(xAxis)

  const canvasSetup = useCallback(() => {
    const canvas = canvasEl.current
    canvas.width = canvasSize[0]
    canvas.height = canvasSize[1]
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    return [canvas, ctx]
  }, [canvasEl, canvasSize])

  const getSteppedColor = (depth) => {
    let degreeB = depth / (shownNumber + 1)
    let degreeA = 1 - degreeB
    let r = (colorRange.start.r * degreeA) + (colorRange.end.r * degreeB)
    let g = (colorRange.start.g * degreeA) + (colorRange.end.g * degreeB)
    let b = (colorRange.start.b * degreeA) + (colorRange.end.b * degreeB)
    return { r, g, b }
  }

  const getRadians = (angle) => {
    return (angle * (Math.PI / 180))
  }

  const drawEpicycle = (xCenter, yCenter, radius, ctx, depth) => {
    let baseColor = getSteppedColor(depth)
    ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`
    ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, .2)`
    ctx.beginPath()
    ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  const drawBead = (ctx, xCenter, yCenter) => {
    ctx.beginPath()
    ctx.strokeStyle = beadColor;
    ctx.fillStyle = beadColor;
    ctx.arc(xCenter, yCenter, beadSize, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  const drawArrow = (ctx, _xCenter, _yCenter) => {
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.setLineDash([2, 4]);
    ctx.moveTo(yAxis, _yCenter)
    ctx.lineTo(_xCenter, _yCenter)
    ctx.stroke()
  }

    const getPhasedXY = (_xCenter, _yCenter, time, radius, constituent) => {
      const { phase_GMT, speed} = constituent
      let phase = phase_GMT
      let phaseX = _xCenter + (radius * Math.sin(((time + getRadians(phase)) * speed)))
      let phaseY = _yCenter + (radius * Math.cos(((time + getRadians(phase)) * speed)))
      return [phaseX, phaseY]
    }

    function drawTideChart(ctx) {
      ctx.strokeStyle = `rgba(${colorRange.end.r}, ${colorRange.end.g}, ${colorRange.end.b}, 1)`
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(yAxis, timeSeries[0]);
      timeSeries.forEach((_yCoordinate, idx) => {
          ctx.lineTo((yAxis + ((idx * (waveRoughness * waveScaling)))), _yCoordinate);
      })
      ctx.stroke();
      ctx.lineWidth = 1;
    }

  const runThroughConstituents = (ctx, _xCenter, _yCenter, time, depth) => {
    const radius = Math.floor(constituents[depth].amplitude * unit)
    drawEpicycle(_xCenter, _yCenter, radius, ctx, depth)
    if (depth === shownNumber) {
      [_xCenter, _yCenter] = getPhasedXY(_xCenter, _yCenter, time, radius, constituents[depth])
      setTimeSeries([_yCenter, ...timeSeries].slice(0, timeSeriesSteps + 1))
      drawTideChart(ctx, canvasSize)
      drawArrow(ctx, _xCenter, _yCenter)
      drawBead(ctx, _xCenter, _yCenter)
      drawBead(ctx, yAxis, _yCenter)
      return
    } else {
        [_xCenter, _yCenter] = getPhasedXY(_xCenter, _yCenter, time, radius, constituents[depth])
        depth++
        runThroughConstituents(ctx, _xCenter, _yCenter, time, depth)
      }
  }


  useEffect(() => {
    const draw = () => {
        let [canvas, ctx] = canvasSetup()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        runThroughConstituents(ctx, yAxis, xAxis, frame * speed, 0)
      }
      window.requestAnimationFrame(draw);
    return () => {};
  }, [frame])

  useEffect(() => {
    const frameUpdate = setInterval(() => {
          setFrame(frame + 1)
          console.log('still running')
    }, frameDuration);
    return () => clearInterval(frameUpdate)
  }, [frame])

  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
