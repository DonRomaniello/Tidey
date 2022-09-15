import React, {useEffect, useMemo, useState} from "react"

import { useSelector } from "react-redux"

import MarkerAndPopup from "./MarkerAndPopup";

import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';

export const Stations = () => {

  const {stations, selected} = useSelector((state) => state.stations);

  const [bounds, setBounds] = useState(useMap().getBounds())

  const [zoom, setZoom] = useState(useMap().getZoom())

  const map = useMapEvents({
    moveend: () => {
      setBounds(map.getBounds())
    },
    zoomend: () => {
      setZoom(map.getZoom())
    }
  }, [bounds, zoom])



  const filteredStations = useMemo(() => {
    const filterStations = (_stations, _bounds, _zoom) => {
      const stationFilter = (station, idx) => {
        // First, check for selected station
        if (station.id === selected) { return true }
        let northEast = _bounds._northEast
        let southWest = _bounds._southWest
        /* This prevents crowding, while still keeping already shown markers
         on map as zoom level changes. */
        if (idx % (32 / Math.pow(2, (_zoom - 2))) === 0){
          if ((station.lat < northEast.lat) && (station.lat > southWest.lat)){
            if ((station.lng < northEast.lng) && (station.lng > southWest.lng)){
              return true}}}}
      return _stations.filter(stationFilter)
    }
    return filterStations(stations, bounds, zoom)
  }, [stations, bounds, zoom, selected])

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








