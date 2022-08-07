import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'
import { useEffect } from 'react'

const Square = (props) => {
  const context = useLeafletContext()

  const { center } = props

  useEffect(() => {
    const bounds = L.latLng(props.center).toBounds(props.size)
    const square = new L.Rectangle(bounds)
    const container = context.layerContainer || context.map
    container.addLayer(square)

    // const canvasTest = L.Canvas().params

    // .params({data: points})     // optional add any custom data that will be passed to draw function

    return () => {
      container.removeLayer(square)
    }
  })

  return () => {
    <Square center={center} size={1000} />
  }
}

export default Square
