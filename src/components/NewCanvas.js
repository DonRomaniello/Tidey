import React, {useEffect, useMemo, useState, useRef} from "react";

import L from 'leaflet'

export const NewCanvas = (props) => {

  const {canvasName} = props

  const canvasEl = useRef(null)

  let frame = 0;

  let canvas, ctx;

  const frameDuration = 41;


  useEffect(() => {

      const draw = (ctx, canvas) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = 'rgb(255,0,0, 1)'
        ctx.rect(frame,0,canvas.width,frame)
        ctx.fill()
      }
    const testFrame = () => {

      if (frame <= 30) {
        // console.log(frame)
        frame++
      } else {
        console.log('limit!')
        // console.log(canvasEl.current)
        frame = 0;
      }
    }
    const drawUpdate = setInterval(() => {
      const canvas = canvasEl.current
      canvas.width = 400
      canvas.height = 200
      const ctx = canvas.getContext("2d")
      testFrame()
      draw(ctx, canvas)
    }, frameDuration);

    return () => clearInterval(drawUpdate);


  }, [frameDuration])



  return (

    <div>
      <canvas ref={canvasEl} id={canvasName} />
    </div>
  )
}
