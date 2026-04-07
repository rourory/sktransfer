"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
// @ts-ignore
import "leaflet/dist/leaflet.css"

// Фикс иконок для Leaflet в Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface RouteMapProps {
  fromCoords: { lat: number; lon: number } | null
  toCoords: { lat: number; lon: number } | null
  routeLine: [number, number][] | null
}

// Компонент для авто-зума карты, чтобы вместить весь маршрут
function MapUpdater({ routeLine, fromCoords, toCoords }: RouteMapProps) {
  const map = useMap()

  useEffect(() => {
    if (routeLine && routeLine.length > 0) {
      const bounds = L.latLngBounds(routeLine)
      map.fitBounds(bounds, { padding: [50, 50] })
    } else if (fromCoords && !toCoords) {
      map.setView([fromCoords.lat, fromCoords.lon], 13)
    }
  }, [map, routeLine, fromCoords, toCoords])

  return null
}

export default function RouteMap({ fromCoords, toCoords, routeLine }: RouteMapProps) {
  // Центр по умолчанию (например, Минск)
  const defaultCenter: [number, number] = [53.9, 27.56]

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border-2 border-[var(--gold)]/20 shadow-md mb-6 z-0 relative">
      <MapContainer center={defaultCenter} zoom={6} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fromCoords && <Marker position={[fromCoords.lat, fromCoords.lon]} icon={customIcon} />}
        {toCoords && <Marker position={[toCoords.lat, toCoords.lon]} icon={customIcon} />}
        {routeLine && <Polyline positions={routeLine} color="#d97706" weight={5} opacity={0.8} />}
        
        <MapUpdater fromCoords={fromCoords} toCoords={toCoords} routeLine={routeLine} />
      </MapContainer>
    </div>
  )
}