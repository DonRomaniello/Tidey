import React, {useEffect, useMemo, useState} from "react"

import { useDispatch, useSelector } from "react-redux"

import MarkerAndPopup from "./MarkerAndPopup";

import { fetchHarmonics } from '../store/features/harmonics'

import { useMap, useMapEvents } from 'react-leaflet';

// How many constituent fetches may be in flight at once.
const maxConcurrentFetches = 8

export const Stations = () => {

  const dispatch = useDispatch()

  const {stations, selected} = useSelector((state) => state.stations);

  const cacheStatus = useSelector((state) => state.harmonics.cacheStatus);

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

  /* Stream the tide data in: prefetch constituents for the stations in
   view, a few at a time, so their markers can appear as soon as the data
   is ready and popups open without a loading delay. */
  useEffect(() => {
    const inFlight = Object.values(cacheStatus)
      .filter((status) => status === 'loading').length
    filteredStations
      .filter((station) => !cacheStatus[station.id])
      .slice(0, Math.max(0, maxConcurrentFetches - inFlight))
      .forEach((station) => dispatch(fetchHarmonics(station)))
  }, [filteredStations, cacheStatus, dispatch])

  // A marker only appears once its tide data is ready.
  const readyStations = filteredStations
    .filter((station) => cacheStatus[station.id] === 'loaded')

  return (
    <>
    {readyStations.map((stationInfo, idx) => {
      return <MarkerAndPopup
              key={stationInfo.id + stationInfo.lat + stationInfo.lng}
              stationInfo={stationInfo}
              />
      })}
    </>
  )}
