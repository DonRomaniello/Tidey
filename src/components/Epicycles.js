import React, { useEffect, useMemo, useRef } from "react";

import { useSelector } from "react-redux";

import {colorRange} from './css/Epicycles.module.js'

const beadColor = 'rgba(219, 80, 74, 1)'
const beadSize = 2
const timeRate = 0.000025 // animation time units per millisecond
const timePerPixel = 0.0032 // animation time represented by one pixel of the tide chart
const chartStep = 0.25 // tide chart sample spacing, in CSS pixels
const scaleRate = 1 / 256 // scale units per millisecond when easing between totals

export const Epicycles = () => {

  const { harmonics, shownNumber, canvasSize } = useSelector((state) => state.harmonics)

  const canvasEl = useRef(null)
  const timeOriginRef = useRef(null)
  const lastTimestampRef = useRef(null)
  // Eased copy of the total scale, kept in a ref so transitions survive re-renders
  const currentScaleRef = useRef(null)

  const constituents = useMemo(
    () => harmonics.slice(0, shownNumber + 1),
    [harmonics, shownNumber])

  const scale = useMemo(
    () => constituents.reduce((sum, c) => sum + c.amplitude, 0),
    [constituents])

  useEffect(() => {
    const canvas = canvasEl.current
    if (!canvas || constituents.length === 0) { return }

    const height = canvasSize[0]
    const width = canvasSize[1]

    // Size the backing store for the device's pixel density so lines stay
    // sharp on high resolution displays, while CSS keeps the layout size.
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext("2d")
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineJoin = 'round'

    const centerY = height / 2
    const chartStartX = height / 2

    const phased = constituents.map((constituent) => ({
      amplitude: constituent.amplitude,
      speed: constituent.speed,
      phase: constituent.phase_GMT * (Math.PI / 180),
    }))

    const getSteppedColor = (depth) => {
      let degreeB = depth / phased.length
      let degreeA = 1 - degreeB
      let r = (colorRange.start.r * degreeA) + (colorRange.end.r * degreeB)
      let g = (colorRange.start.g * degreeA) + (colorRange.end.g * degreeB)
      let b = (colorRange.start.b * degreeA) + (colorRange.end.b * degreeB)
      return { r, g, b }
    }

    // The tide height is just the sum of every constituent's vertical
    // component, so the whole chart can be recomputed each frame instead of
    // accumulating samples; the line stays smooth when constituents change.
    const tideY = (time, unit) => {
      let y = centerY
      phased.forEach((constituent) => {
        y += (constituent.amplitude * unit) *
          Math.cos((time + constituent.phase) * constituent.speed)
      })
      return y
    }

    const drawEpicycles = (ctx, time, unit) => {
      let xCenter = chartStartX
      let yCenter = centerY
      phased.forEach((constituent, depth) => {
        const radius = constituent.amplitude * unit
        if (radius > 0) {
          const baseColor = getSteppedColor(depth)
          ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1)`
          ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, .2)`
          ctx.beginPath()
          ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false)
          ctx.fill()
          ctx.stroke()
        }
        const angle = (time + constituent.phase) * constituent.speed
        xCenter += radius * Math.sin(angle)
        yCenter += radius * Math.cos(angle)
      })
      return [xCenter, yCenter]
    }

    const drawTideChart = (ctx, time, unit) => {
      ctx.strokeStyle = `rgba(${colorRange.end.r}, ${colorRange.end.g}, ${colorRange.end.b}, 1)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(chartStartX, tideY(time, unit))
      for (let x = chartStartX + chartStep; x <= width; x += chartStep) {
        ctx.lineTo(x, tideY(time - ((x - chartStartX) * timePerPixel), unit))
      }
      ctx.stroke()
      ctx.lineWidth = 1
    }

    const drawArrow = (ctx, xCenter, yCenter) => {
      ctx.lineWidth = 2
      ctx.setLineDash([2, 4])
      ctx.beginPath()
      ctx.moveTo(chartStartX, yCenter)
      ctx.lineTo(xCenter, yCenter)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.lineWidth = 1
    }

    const drawBead = (ctx, xCenter, yCenter) => {
      ctx.beginPath()
      ctx.strokeStyle = beadColor
      ctx.fillStyle = beadColor
      ctx.arc(xCenter, yCenter, beadSize, 0, 2 * Math.PI, false)
      ctx.fill()
    }

    let rafId

    const draw = (timestamp) => {
      if (timeOriginRef.current === null) {
        timeOriginRef.current = timestamp
      }
      const lastTimestamp = lastTimestampRef.current ?? timestamp
      const delta = Math.min(timestamp - lastTimestamp, 100)
      lastTimestampRef.current = timestamp

      if (currentScaleRef.current === null) {
        currentScaleRef.current = scale
      } else if (currentScaleRef.current < scale) {
        currentScaleRef.current = Math.min(currentScaleRef.current + (scaleRate * delta), scale)
      } else if (currentScaleRef.current > scale) {
        currentScaleRef.current = Math.max(currentScaleRef.current - (scaleRate * delta), scale)
      }

      const unit = ((height / 2) - 2) / currentScaleRef.current
      const time = (timestamp - timeOriginRef.current) * timeRate

      ctx.clearRect(0, 0, width, height)
      const [xCenter, yCenter] = drawEpicycles(ctx, time, unit)
      drawTideChart(ctx, time, unit)
      drawArrow(ctx, xCenter, yCenter)
      drawBead(ctx, xCenter, yCenter)
      drawBead(ctx, chartStartX, yCenter)

      rafId = window.requestAnimationFrame(draw)
    }

    rafId = window.requestAnimationFrame(draw)
    return () => window.cancelAnimationFrame(rafId)
  }, [constituents, scale, canvasSize])

  return (
    <div>
      <canvas
      ref={canvasEl}
      />
    </div>
  )
}
