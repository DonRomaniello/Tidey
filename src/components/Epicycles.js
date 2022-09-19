import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { wideToggle } from "../store/features/harmonics.js";

import {colorRange} from './css/Epicycles.module.js'

export const Epicycles = (props) => {

  const {platform, canvasSize} = props

  const { harmonics, shownNumber } = useSelector((state) => state.harmonics)
  const axesStrokeColor = 'rgba(128, 128, 128, 1)'
  const beadColor = 'rgba(219, 80, 74, 1)'
  const frameDuration = 16;
  const fadeTime = 1; // in secomds
  const scaleIncrement = 1 / (fadeTime * frameDuration);
  const canvasIncrement = (platform === 'desktop') ? 30 : 10
  const speed = 0.0004
  const beadSize = 2
  const waveRoughness = 10
  const waveScaling = .0125

  const [frame, setFrame] = useState(0);

  const [timeSeries, setTimeSeries] = useState([])

  const [currentCanvasSize, setCurrentCanvasSize] = useState(canvasSize)

  const canvasEl = useRef(null)

  const produceConstituentArray = (_harmonics, _shownNumber) => {
    let hc = [..._harmonics]
    return hc.slice(0, _shownNumber + 1)}
  const constituents = useMemo(() => produceConstituentArray(harmonics, shownNumber), [harmonics, shownNumber]);

  const calcScale = (_constituents) => {
    let s = _constituents.map((a) => a.amplitude).reduce((a, b) => a + b)
    return s}
  const scale = useMemo(() => calcScale(constituents), [constituents])
  const [currentScale, setCurrentScale] = useState(scale)


  const calcUnit = (_currentCanvasSize, _currentScale) => {
    let u = (((_currentCanvasSize[0] / 2) - 2) / _currentScale)
    return u}
  const unit = useMemo(() => calcUnit(currentCanvasSize, currentScale), [currentCanvasSize, currentScale])

  const calcXAxis = (_currentCanvasSize) => {
    let x = Math.floor(_currentCanvasSize[0]/2)
    return x}
  const xAxis = useMemo(() => calcXAxis(currentCanvasSize), [currentCanvasSize])

  const calcYAxis = (_currentCanvasSize) => {
    let y = Math.floor(_currentCanvasSize[1]/(2 * (_currentCanvasSize[1]/_currentCanvasSize[0])))
    return y}
  const yAxis = useMemo(() => calcYAxis(currentCanvasSize), [currentCanvasSize])

  const calcTimeSeriesSteps = (_currentCanvasSize, _waveRoughness, _waveScaling, _yAxis) => {
    let steps = Math.floor((_currentCanvasSize[1] - _yAxis) / (_waveRoughness * _waveScaling)) + 50
    return steps
  }
  const timeSeriesSteps = useMemo(() => calcTimeSeriesSteps(currentCanvasSize, waveRoughness, waveScaling, yAxis), [currentCanvasSize, waveRoughness, waveScaling, yAxis])

  const canvasSetup = useCallback((_currentCanvasSize) => {
    const canvas = canvasEl.current
    canvas.height = _currentCanvasSize[0]
    canvas.width = _currentCanvasSize[1]
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    return [canvas, ctx]
  }, [canvasEl])

  const getSteppedColor = useCallback((depth) => {
    let degreeB = depth / (shownNumber + 1)
    let degreeA = 1 - degreeB
    let r = (colorRange.start.r * degreeA) + (colorRange.end.r * degreeB)
    let g = (colorRange.start.g * degreeA) + (colorRange.end.g * degreeB)
    let b = (colorRange.start.b * degreeA) + (colorRange.end.b * degreeB)
    return { r, g, b }
  },[shownNumber] )

  const getRadians = (angle) => {
    return (angle * (Math.PI / 180))
  }

  const drawEpicycle = useCallback((xCenter, yCenter, radius, ctx, depth) => {
    let baseColor = getSteppedColor(depth)
    ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`
    ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, .2)`
    ctx.beginPath()
    ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }, [getSteppedColor])

  const drawBead = (ctx, xCenter, yCenter) => {
    ctx.beginPath()
    ctx.strokeStyle = beadColor;
    ctx.fillStyle = beadColor;
    ctx.arc(xCenter, yCenter, beadSize, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  const drawArrow = useCallback((ctx, _xCenter, _yCenter) => {
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.setLineDash([2, 4]);
    ctx.moveTo(yAxis, _yCenter)
    ctx.lineTo(_xCenter, _yCenter)
    ctx.stroke()
  }, [yAxis])

    const getPhasedXY = useCallback((_xCenter, _yCenter, time, radius, constituent) => {
      const { phase_GMT, speed } = constituent
      let phase = phase_GMT
      let phaseX = _xCenter + (radius * Math.sin(((time + getRadians(phase)) * speed)))
      let phaseY = _yCenter + (radius * Math.cos(((time + getRadians(phase)) * speed)))
      return [phaseX, phaseY]
    }, [])

    const drawTideChart = useCallback((ctx) => {
      ctx.strokeStyle = `rgba(${colorRange.end.r}, ${colorRange.end.g}, ${colorRange.end.b}, 1)`
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(yAxis, timeSeries[0]);
      timeSeries.forEach((_yCoordinate, idx) => {
        if (idx % waveRoughness){
          ctx.lineTo((yAxis + ((idx * (waveRoughness * waveScaling)))), _yCoordinate);
        }
      })
      ctx.stroke();
      ctx.lineWidth = 1;
    }, [yAxis, timeSeries, waveRoughness, waveScaling])


  const fadeStep = (current, target, increment) => {
    if (current < target) {
      return Math.min(current + increment, target)
    } else if (current > target){
      return Math.max(current - increment, target)
    }
  }

  useEffect(() => {
    const runThroughConstituents = (ctx, _xCenter, _yCenter, time, depth) => {
      const radius = constituents[depth].amplitude * unit
      drawEpicycle(_xCenter, _yCenter, radius, ctx, depth)
      if (depth === shownNumber) {
        [_xCenter, _yCenter] = getPhasedXY(_xCenter, _yCenter, time, radius, constituents[depth])
        setTimeSeries([_yCenter, ...timeSeries].slice(0, timeSeriesSteps + 1))
        drawTideChart(ctx, currentCanvasSize)
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

    const smoothScaling = (_currentScale, _scale, _currentCanvasSize, _canvasSize, _scaleIncrement, _canvasIncrement) => {
      if (_currentScale !== _scale) {
        setCurrentScale(fadeStep(_currentScale, _scale, _scaleIncrement))
      }
      if (_currentCanvasSize[1] !== _canvasSize[1]) {
        let [height, width] = _currentCanvasSize
        if (_currentCanvasSize[1] !== _canvasSize[1]) {
          width = fadeStep(_currentCanvasSize[1], _canvasSize[1], _canvasIncrement)
        }
        setCurrentCanvasSize([height, width])
    }
  }

    const draw = () => {
        let [canvas, ctx] = canvasSetup(currentCanvasSize)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if ((currentScale != scale) || (currentCanvasSize[1] != canvasSize[1])){
          smoothScaling(currentScale, scale,
             currentCanvasSize, canvasSize,
              scaleIncrement, canvasIncrement)
        }
        runThroughConstituents(ctx, yAxis, xAxis, frame * speed, 0)
      }
      window.requestAnimationFrame(draw);
    return () => {};
  }, [frame, canvasSize, currentCanvasSize, scale, currentScale, xAxis, yAxis, canvasSetup, scaleIncrement, canvasIncrement, constituents, drawArrow, drawEpicycle, drawTideChart, getPhasedXY, shownNumber, timeSeries, timeSeriesSteps, unit])

  useEffect(() => {
    const frameUpdate = setInterval(() => {
          setFrame(frame + 1)
    }, frameDuration);
    return () => clearInterval(frameUpdate)
  }, [frame])

  return (
    <div>
      <canvas
      ref={canvasEl}
      />
    </div>
  )
}
