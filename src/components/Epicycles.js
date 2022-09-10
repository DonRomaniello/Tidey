
import React, {useState, useRef, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'


import drawVisualizer from './modules/drawHarmonicConstituents';

import icon from './assets/pin.svg';

const Epicycles = (props) => {

  const { stationInfo } = props

  const harmonics = useSelector((state) => state.harmonics)

  const shown = useSelector((state) => state.harmonics.shownConstituents)

  const [couldOpen, setCouldOpen] = useState(false)

  const dispatch = useDispatch();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    // shadowUrl: iconShadow,
    iconAnchor: [16, 42],
    popupAnchor: [-50, 0],// this should be half width, full height of popup
  });

  L.Popup.prototype.options.offset = [0,0] // look here

  L.Marker.prototype.options.icon = DefaultIcon;

  L.Popup.prototype.options.maxWidth = '1000%'

  L.Popup.prototype.options.className = 'popuply'

  const position = [stationInfo?.lat, stationInfo?.lng]

  // const canvasName = `epicycleCanvas + ${stationInfo.id + stationInfo.lat + stationInfo.lng}`

  const canvasName = useRef(null)

  const autoPanPad = {
    x: (window.innerWidth - 500) / 2,
    y: (window.innerHeight - 300) / 2,
 }

  useEffect(() => {
    const stopLooping = () => {
      return {
        continue: couldOpen,
        numOfConstituents: shown,
    }
  }
    if (harmonics.loaded && couldOpen) {
      drawVisualizer(harmonics.harmonics, canvasName, constituentColors,
        [400, 200], stopLooping)
    }

  }, [canvasName, couldOpen, harmonics, shown])

  return (
    <>
    <Marker
    maxWidth='400px'
    position={position}
    autoPan={true}
    autoPanOnFocus={true}
    riseOnHover={true}
    eventHandlers={{
      popupopen: () => {
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
        setCouldOpen(true);
      },
      popupclose: (e) => {
        setCouldOpen(false)
      }}}
    >
      <Popup
      autoPanPadding={autoPanPad}
      autoPan={true}
      >
      {((harmonics.loaded) && couldOpen) ?
          <canvas ref={canvasName}/>
            :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}

const constituentColors = {
  start : {
    r: 22,
    g: 105,
    b: 122
  },
  end : {
    r: 134,
    g: 216,
    b: 154
  }
}



export default Epicycles

