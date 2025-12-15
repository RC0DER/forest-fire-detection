import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * MapView - Displays interactive map with sensor location marker
 * @param {number} latitude - Sensor latitude
 * @param {number} longitude - Sensor longitude
 * @param {number} fireScore - Fire score for marker color
 */
export const MapView = ({ latitude, longitude, fireScore }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Only initialize map when we have valid coordinates
    if (!mapInstanceRef.current && mapRef.current && latitude && longitude) {
      // Use dark theme tiles (CartoDB Dark Matter)
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }

    // Update map center and marker when coordinates change
    if (mapInstanceRef.current && latitude && longitude) {
      const lat = latitude;
      const lng = longitude;

      // Update map center
      mapInstanceRef.current.setView([lat, lng], 13);

      // Determine marker color based on fire score
      const getMarkerColor = (score) => {
        if (score === null || score === undefined) return '#6b7280'; // gray
        if (score > 0.8) return '#ef4444'; // red
        if (score > 0.5) return '#f59e0b'; // yellow
        return '#10b981'; // green
      };

      const markerColor = getMarkerColor(fireScore);

      // Remove existing marker
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
      }

      // Create custom pin icon with SVG
      const pinIconSvg = `
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C10.477 0 6 4.477 6 10c0 6 10 18 10 18s10-12 10-18c0-5.523-4.477-10-10-10z" 
                fill="${markerColor}" 
                stroke="#ffffff" 
                stroke-width="2"/>
          <circle cx="16" cy="10" r="4" fill="#ffffff"/>
        </svg>
      `;

      const icon = L.divIcon({
        className: 'custom-pin-marker',
        html: pinIconSvg,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40]
      });

      // Add new marker with popup showing coordinates
      markerRef.current = L.marker([lat, lng], { icon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="text-align: center; padding: 4px;">
            <strong>Sensor Location</strong><br/>
            <small>${lat.toFixed(6)}, ${lng.toFixed(6)}</small>
          </div>
        `);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, fireScore]);

  return (
    <div className="map-view">
      <div ref={mapRef} className="map-view__container" />
      {(!mapInstanceRef.current || !latitude || !longitude) && (
        <div className="map-view__placeholder">
          <div className="map-view__placeholder-text">Waiting for sensor location...</div>
        </div>
      )}
    </div>
  );
};

