
import React, {useState, useRef, useMemo, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';


import { fetchHarmonics } from '../store/features/harmonics';

import { updateSelected } from '../store/features/stations';

import { useMedia } from 'tiny-use-media-esm';

import L from 'leaflet';

import {
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'

import { Epicycles } from './Epicycles';

import icon from './assets/pin.svg';

const MarkerAndPopup = (props) => {

  const { stationInfo } = props

  const { current } = useMedia({
    mobile: 0,
    desktop: 960,
  })

  const [couldOpen, setCouldOpen] = useState(false)

  const harmonics = useSelector((state) => state.harmonics)

  const { wide } = harmonics

const canvasSizer = (_current, _wide) => {
  console.log('run', _wide, _current)
  switch (_current) {
    case 'desktop':
      return [200, _wide ? Math.floor(window.innerWidth * .8) : 400]
    case 'mobile':
      return [125, _wide ? window.innerWidth - 50 : 250]
    default:
      return [200, 400]
}
}
const canvasSize = useMemo(() => canvasSizer(current, wide), [current, wide])

  const calcPadding = (_current, _wide) => {
    const getPad = (dimWin, dimPop) => {
      return Math.floor(((dimWin = dimPop) / 2))
    }
    switch (_current) {
      case 'desktop':
        return [getPad(window.innerHeight, 200), _wide ? getPad(window.innerWidth, (window.innerWidth * .8)): getPad(window.innerHeight, 400)]
      case 'mobile':
        return [getPad(window.innerHeight, 125), _wide ? getPad(window.innerWidth, (window.innerWidth - 50)) : getPad(window.innerWidth, 250)]
      default:
        return [getPad(window.innerHeight, 200), getPad(window.innerWidth, 400)]
  }
  }
  const padding = useMemo(() => calcPadding(current, wide), [wide, current])

  const dispatch = useDispatch();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [16, 42],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  L.Popup.prototype.options.maxWidth = '1000%'
  L.Popup.prototype.options.className = 'popuply'
  L.Popup.prototype.options.offset = [0,0] // look here

  const position = [stationInfo?.lat, stationInfo?.lng]

  const map = useMap()

  useEffect(() => {
    // L.Popup.update()


    map.panTo(position)
  }, [wide])

  return (
    <>
    <Marker
    autoPan={true}
    autoPanOnFocus={true}
    position={position}
    riseOnHover={true}
    eventHandlers={{
      popupopen: () => {
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
        dispatch(updateSelected(stationInfo.id))
        setCouldOpen(true);
      },
      popupclose: (e) => {
        setCouldOpen(false)
      }}}
    >
      <Popup
      autoPan={true}
      autoPanOnFocus={true}
      // autoPanPadding={padding}
      // autoPanPadding={[window.innerHeight / 10,window.innerWidth / 10]}
      >
      {(harmonics.loaded && couldOpen) ?
          couldOpen &&
          <Epicycles
          platform={current}
          canvasSize={canvasSize}
           />
            :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}

export default MarkerAndPopup

