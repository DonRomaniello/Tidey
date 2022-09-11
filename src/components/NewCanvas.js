import React, {useEffect, useMemo, useState, useRef} from "react";

import { useSelector } from "react-redux";

import L from 'leaflet'

export const NewCanvas = (props) => {

  const {canvasName, canvasSize} = props

  const shown = useSelector((state) => state.harmonics.shownConstituents)

  const canvasEl = useRef(null)

  let frame = 0;

  let canvas, ctx;

  const frameDuration = 41;


  useEffect(() => {



      const draw = (ctx, canvas) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = `rgb(255,0,${shown * 30}, 1)`
        ctx.rect(frame,0,canvas.width,frame)
        ctx.fill()
        console.log(shown)
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


  }, [frameDuration, shown])

  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
