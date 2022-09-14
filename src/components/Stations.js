import React, {useMemo, useState} from "react"

import { useSelector } from "react-redux"

import MarkerAndPopup from "./MarkerAndPopup";
import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';

export const Stations = () => {

  const {stations} = useSelector((state) => state.stations);

  const [bounds, setBounds] = useState(useMap().getBounds())

  // const [zoom, ]

  const map = useMapEvent('moveend', () => {
    setBounds(map.getBounds())
    console.log(map.getZoom())
  })

  const filterStations = (_stations, _bounds) => {
    const stationFilter = (station) => {
      let northEast = _bounds._northEast
      let southWest = _bounds._southWest
      if ((station.lat < northEast.lat) && (station.lat > southWest.lat)){
        if ((station.lng < northEast.lng) && (station.lng > southWest.lng)){
          return true}}
        }

    return _stations.filter(stationFilter)
  }


  const filteredStations = useMemo(() => filterStations(stations, bounds), [stations, bounds])

  return (
    <>
    {filteredStations.map((stationInfo, idx) => {
      return <MarkerAndPopup
              key={stationInfo.id + stationInfo.lat + stationInfo.lng}
              stationInfo={stationInfo}
              />
      })}
    </>

  )}








