import React, {useMemo, useState} from "react"

import { useSelector } from "react-redux"

import MarkerAndPopup from "./MarkerAndPopup";
import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';

export const Stations = () => {

  const {stations} = useSelector((state) => state.stations);

  const [bounds, setBounds] = useState(useMap().getBounds())

  const map = useMapEvent('moveend', () => {
    setBounds(map.getBounds())
  })

  const stationFilter = (station) => {
    let northEast = bounds._northEast
    let southWest = bounds._southWest
    if ((station.lat < northEast.lat) && (station.lat > southWest.lat)) {
      if ((station.lng < northEast.lng) && (station.lng > southWest.lng)) {
        return true
      }
    }
  }

  return (
    <>
    {stations.filter(stationFilter).map((stationInfo, idx) => {
      return <MarkerAndPopup
              key={stationInfo.id + stationInfo.lat + stationInfo.lng}
              stationInfo={stationInfo}
              />
      })}
    </>

  )}








