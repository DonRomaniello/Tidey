import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { useSelector } from "react-redux";

import {colorRange} from './css/NewCanvas.module.js'

export const NewCanvas = (props) => {

  const {canvasName, canvasSize} = props

  const { harmonics, shownNumber } = useSelector((state) => state.harmonics)

  const [frame, setFrame] = useState(0);

  const canvasEl = useRef(null)

  const frameDuration = 41;
  const beadSize = 2
  const mainSpeed = 1
  const axesStrokeColor = 'rgba(128, 128, 128, 1)'
  const beadColor = 'rgba(219, 80, 74, 1)'
  const wavePrecision = 10

  const updateTimeSeries  = (frame) => {
    // doSomething
  }

  const produceConstituentArray = (_harmonics, _shownNumber) => {
    let a = [..._harmonics].sort((a, b) => b.amplitude - a.amplitude).slice(0, _shownNumber)
    return a
  }
  const constituents = useMemo(() => produceConstituentArray(harmonics, shownNumber), [harmonics, shownNumber]);

  const calcScale = (_constituents) => {
    let s = _constituents.map((a) => a.amplitude).reduce((a, b) => a + b)
    return s
  }
  const scale = useMemo(() => calcScale(constituents), [constituents])

  const calcUnit = (_canvasSize, _scale) => {
    let u = ((canvasSize[1] / 2) / scale)
    return u
  }
  const unit = useMemo(() => calcUnit(canvasSize, scale), [canvasSize, scale])

  const calcXAxis = (_canvasSize) => {
    let x = Math.floor(_canvasSize[1]/2)
    return x
  }
  const xAxis = useMemo(() => calcXAxis(canvasSize), [canvasSize])

  const calcYAxis = (_canvasSize, _scale) => {
    let y = Math.floor(_canvasSize[1]/4 - _scale)
    return y
  }
  const yAxis = useMemo(() => calcYAxis(canvasSize, scale), [canvasSize, scale])

  const timeSeriesChords = useMemo(() => updateTimeSeries(frame), [frame])

  const [nextXCenter, setNextXCenter] = useState(yAxis)

  const [nextYCenter, setNextYCenter] = useState(xAxis)

  const canvasSetup = useCallback(() => {
    const canvas = canvasEl.current
    canvas.width = canvasSize[0]
    canvas.height = canvasSize[1]
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    // console.log(yAxis, xAxis, unit, scale, constituents)
    return [canvas, ctx]
  }, [canvasEl, canvasSize])



  const getSteppedColor = (idx) => {
    let degreeB = idx / shownNumber
    let degreeA = 1 - degreeB
    let r = (colorRange.start.r * degreeA) + (colorRange.end.r * degreeB)
    let g = (colorRange.start.g * degreeA) + (colorRange.end.g * degreeB)
    let b = (colorRange.start.b * degreeA) + (colorRange.end.b * degreeB)
    return { r, g, b }
  }

  const getRadians = (angle) => {
    return (angle * (Math.PI / 180))
  }

  // const getPhasedXY = (time, radius, constituent) => {
  //   const { phase_GMT, speed} = constituent
  //   let phase = phase_GMT
  //   let phaseX = nextXCenter + (radius * Math.sin(((time + getRadians(phase)) * speed)))
  //   let phaseY = nextYCenter + (radius * Math.cos(((time + getRadians(phase)) * speed)))
  //   return phaseX, phaseY
  // }

  // const drawEpicycles = (radius, ctx, idx) => {
  //   let baseColor = getSteppedColor(idx)
  //   ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`
  //   ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, .2)`
  //   ctx.beginPath()
  //   ctx.arc(nextXCenter, nextYCenter, radius, 0, 2 * Math.PI, false);
  //   // ctx.fill();
  //   ctx.stroke();
  // }

  // const runThroughConstituents = (time, drawFunction) => {
  //   constituents.forEach((constituent, idx) => {
  //     const radius = Math.floor(constituent.amplitude * unit)
  //     drawFunction(radius, idx)
  //     getLocationOnCircle(time, radius, constituent)
  //     timeSeriesCounter++;
  //     if (idx == (constituents.length - 1) && (timeSeriesCounter % wavePrecision == 0)) {
  //       timeSeriesChords = [...timeSeriesChords, nextYCenter].slice(-timeSeriesLength)
  //     }
  //   })
  // }


  useEffect(() => {
    const draw = () => {
        let [canvas, ctx, yAxis, xAxis] = canvasSetup()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = `rgb(255,0,${shownNumber * 30}, 1)`
        ctx.rect(frame,0,canvas.width,frame)
        ctx.fill()
      }
      window.requestAnimationFrame(draw);
    return () => {};
  }, [frame, constituents, canvasEl, canvasSetup, shownNumber])

  useEffect(() => {
    const frameUpdate = setInterval(() => {
        if (frame <= 30) {
          setFrame(frame + 1)
        } else {
          setFrame(0)
        }
    }, frameDuration);
    console.log('limit!')
    return () => clearInterval(frameUpdate)
  }, [frame])

  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
