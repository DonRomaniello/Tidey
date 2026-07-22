import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import {colorRange} from './css/Epicycles.module.js'

const beadColor = 'rgba(219, 80, 74, 1)'
const beadSize = 2
const timeRate = 0.000025 // animation time units per millisecond
const timePerPixel = 0.0032 // animation time represented by one pixel of the tide chart
const chartStep = 0.25 // tide chart sample spacing, in CSS pixels
const amplitudeRate = 1 / 256 // amplitude units per millisecond when easing constituents in or out

export const Epicycles = () => {

  const { harmonics, shownNumber, canvasSize } = useSelector((state) => state.harmonics)

  const canvasEl = useRef(null)
  const timeOriginRef = useRef(null)
  const lastTimestampRef = useRef(null)
  /*
  Each constituent's on-screen amplitude eases toward its target (its real
  amplitude when shown, zero when hidden) at amplitudeRate. The overall
  scale is the sum of these eased amplitudes, so the circles, the tide
  line, and the vertical zoom all transition together on the same clock.
  Kept in a ref so transitions survive re-renders.
  */
  const shownAmplitudesRef = useRef(null)

  useEffect(() => {
    const canvas = canvasEl.current
    if (!canvas || harmonics.length === 0) { return }

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

    const phased = harmonics.map((constituent, idx) => ({
      key: constituent.name || String(idx),
      target: idx <= shownNumber ? constituent.amplitude : 0,
      speed: constituent.speed,
      phase: constituent.phase_GMT * (Math.PI / 180),
    }))

    // On the first frame after a popup opens, start at the targets outright.
    if (shownAmplitudesRef.current === null) {
      shownAmplitudesRef.current = new Map(phased.map((c) => [c.key, c.target]))
    }

    const stepToward = (current, target, increment) => {
      if (current < target) { return Math.min(current + increment, target) }
      if (current > target) { return Math.max(current - increment, target) }
      return current
    }

    const getSteppedColor = (depth, count) => {
      let degreeB = depth / count
      let degreeA = 1 - degreeB
      let r = (colorRange.start.r * degreeA) + (colorRange.end.r * degreeB)
      let g = (colorRange.start.g * degreeA) + (colorRange.end.g * degreeB)
      let b = (colorRange.start.b * degreeA) + (colorRange.end.b * degreeB)
      return { r, g, b }
    }

    // The tide height is just the sum of every constituent's vertical
    // component, so the whole chart can be recomputed each frame instead of
    // accumulating samples; the line stays smooth when constituents change.
    const tideY = (active, time, unit) => {
      let y = centerY
      active.forEach((constituent) => {
        y += (constituent.amplitude * unit) *
          Math.cos((time + constituent.phase) * constituent.speed)
      })
      return y
    }

    const drawEpicycles = (ctx, active, time, unit) => {
      let xCenter = chartStartX
      let yCenter = centerY
      active.forEach((constituent, depth) => {
        const radius = constituent.amplitude * unit
        if (radius > 0) {
          const baseColor = getSteppedColor(depth, active.length)
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

    const drawTideChart = (ctx, active, time, unit) => {
      ctx.strokeStyle = `rgba(${colorRange.end.r}, ${colorRange.end.g}, ${colorRange.end.b}, 1)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(chartStartX, tideY(active, time, unit))
      for (let x = chartStartX + chartStep; x <= width; x += chartStep) {
        ctx.lineTo(x, tideY(active, time - ((x - chartStartX) * timePerPixel), unit))
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

      const shownAmplitudes = shownAmplitudesRef.current
      const active = []
      phased.forEach((constituent) => {
        const eased = stepToward(shownAmplitudes.get(constituent.key) ?? 0,
          constituent.target, amplitudeRate * delta)
        shownAmplitudes.set(constituent.key, eased)
        if (eased > 0) {
          active.push({ ...constituent, amplitude: eased })
        }
      })

      const scale = active.reduce((sum, c) => sum + c.amplitude, 0)
      const time = (timestamp - timeOriginRef.current) * timeRate

      ctx.clearRect(0, 0, width, height)

      if (scale > 0) {
        const unit = ((height / 2) - 2) / scale
        const [xCenter, yCenter] = drawEpicycles(ctx, active, time, unit)
        drawTideChart(ctx, active, time, unit)
        drawArrow(ctx, xCenter, yCenter)
        drawBead(ctx, xCenter, yCenter)
        drawBead(ctx, chartStartX, yCenter)
      }

      rafId = window.requestAnimationFrame(draw)
    }

    rafId = window.requestAnimationFrame(draw)
    return () => window.cancelAnimationFrame(rafId)
  }, [harmonics, shownNumber, canvasSize])

  return (
    <div>
      <canvas
      ref={canvasEl}
      />
    </div>
  )
}
