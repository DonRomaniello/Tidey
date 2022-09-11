import React, {useEffect, useMemo, useState, useRef} from "react";

import { useSelector } from "react-redux";

import L from 'leaflet'

export const NewCanvas = (props) => {

  const {canvasName, canvasSize} = props

  const { harmonics, shownConstituents } = useSelector((state) => state.harmonics)

  // const harmonics = useSelector((state) => state.harmonics)

  const canvasEl = useRef(null)

  let frame = 0;

  let canvas, ctx;

  const frameDuration = 41;

  useEffect(() => {
      const draw = (ctx, canvas) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = `rgb(255,0,${shownConstituents * 30}, 1)`
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
      testFrame()
      draw(ctx, canvas)
    }, frameDuration);

    return () => clearInterval(drawUpdate);


  }, [frameDuration, shownConstituents])

  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
