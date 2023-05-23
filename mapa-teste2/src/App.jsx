import React, { useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const startCoordinates = await getCoordinates(startLocation);
      const endCoordinates = await getCoordinates(endLocation);

      displayRoute(startCoordinates, endCoordinates);
    } catch (error) {
      console.error('Erro ao obter as coordenadas:', error);
    }
  };

  const getCoordinates = async (location) => {
    const apiKey = '5b3ce3597851110001cf6248083c52d853ae4b4c968ee8717fbde02e';
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${location}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { features } = data;

      if (features.length > 0) {
        const [longitude, latitude] = features[0].geometry.coordinates;
        return fromLonLat([longitude, latitude]);
      }
    } catch (error) {
      console.error('Erro ao obter as coordenadas:', error);
    }

    return null;
  };

  const displayRoute = (startCoordinates, endCoordinates) => {
    const start = new Feature({
      geometry: new LineString([startCoordinates, endCoordinates]),
    });

    const vectorSource = new VectorSource({
      features: [start],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: startCoordinates,
        zoom: 12,
      }),
    });

    map.getView().fit(vectorSource.getExtent(), {
      padding: [50, 50, 50, 50],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Local de partida:
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Local de destino:
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Gerar rota</button>
      </form>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default App;
