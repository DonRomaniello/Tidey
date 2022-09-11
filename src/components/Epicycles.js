
import React, {useState, useRef, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'

import { NewCanvas }  from './NewCanvas'

import drawVisualizer from './modules/drawHarmonicConstituents';

import icon from './assets/pin.svg';

const Epicycles = (props) => {

  const { stationInfo } = props

  const canvasSize = [400, 200]

  const [couldOpen, setCouldOpen] = useState(false)

  const harmonics = useSelector((state) => state.harmonics)

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

  const autoPanPad = {
    x: (window.innerWidth - 500) / 2,
    y: (window.innerHeight - 300) / 2,
 }

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
          couldOpen &&
          <NewCanvas canvasSize={canvasSize} />
          // couldOpen && <canvas ref={canvasName}/>

            :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}




export default Epicycles

