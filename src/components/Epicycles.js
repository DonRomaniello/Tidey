
import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Epicycles = (props) => {

  const harmonics = useSelector((state) => state.harmonics)

  const dispatch = useDispatch();

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [0, 0],
    popupAnchor: [0,0],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const { stationInfo } = props

  const position = [stationInfo?.lat, stationInfo?.lng]

  useEffect(() => {
    if (harmonics) {

      console.log(harmonics)
    }
  }, [harmonics])

  return (
    <>
    <Marker
    position={position}
    autoPan={true}
    autoPanOnFocus={true}
    riseOnHover={true}
    eventHandlers={{
      click: () => {
        console.log(stationInfo.harmonicConstituents)
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
      },
    }}
    >
      <Popup
      autoPanPadding={[500, 250]}
      autoPan={true}
      autoClose={false}>
          <div>

          </div>
      </Popup>
    </Marker>
    </>
)
}


export default Epicycles

