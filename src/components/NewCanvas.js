import React, {useEffect, useMemo, useState, useRef} from "react";

import { useSelector } from "react-redux";

import L from 'leaflet'
import { setDistance } from '../store/features/compass';

export const NewCanvas = (props) => {

  const {canvasName, canvasSize} = props

  const { harmonics, shownNumber } = useSelector((state) => state.harmonics)

  const canvasEl = useRef(null)

  let frame = 0;
  let yAxis, xAxis;
  const frameDuration = 41;
  const beadSize = 2
  const mainSpeed = 1
  const axesStrokeColor = 'rgba(128, 128, 128, 1)'
  const beadColor = 'rgba(219, 80, 74, 1)'
  const wavePrecision = 10


  const constituents = useMemo(() => [...harmonics].sort((a, b) => b.amplitude - a.amplitude).slice(0, shownNumber));

  const scale = useMemo(() => constituents.map((a) => a.amplitude).reduce((a, b) => a + b))

  useEffect(() => {
      const draw = (ctx, canvas) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = `rgb(255,0,${shownNumber * 30}, 1)`
        ctx.rect(frame,0,canvas.width,frame)
        ctx.fill()
      }
    const testFrame = () => {
      if (frame <= 30) {
        frame++
      } else {
        console.log('limit!')
        frame = 0;
      }
    }
    const drawUpdate = setInterval(() => {
      const canvas = canvasEl.current
      canvas.width = canvasSize[0]
      canvas.height = canvasSize[1]
      const ctx = canvas.getContext("2d")
      ctx.lineJoin = 'round';
      xAxis = Math.floor(canvas.height/2);
      yAxis = Math.floor(canvas.width/4 - scale);
      testFrame()
      draw(ctx, canvas)
    }, frameDuration);

    return () => clearInterval(drawUpdate);


  }, [frameDuration, constituents])

  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
