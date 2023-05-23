import { useRef, useEffect, useState } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import OLVectorLayer from "ol/layer/Vector";
import './assets/App.css'
import { Control, Input, Inserir, Label } from './assets/StyledComponents';
import { toLonLat, fromLonLat } from 'ol/proj';

function App() {
  const mapRef = useRef()
  const [newMap, setNewMap] = useState('')

  useEffect(() => {
    const map = new Map({
      view: new View({
        center: [-4842800.131497843, -2318792.1804284034],
        zoom: 15,
        maxZoom: 20,
        minZoom: 5,
      }),
      layers: [
        new TileLayer({source: new OSM()})
      ]
    })

    map.addEventListener('click', (e) => {
      /* console.log(e.coordinate) */
      let xy = toLonLat(e.coordinate);
      console.log(xy);
      xy = fromLonLat(xy)
      console.log(xy);
    })

    map.setTarget(mapRef.current)
  }, [])

  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248083c52d853ae4b4c968ee8717fbde02e&start=-43.504317480609025,%20-20.386786687923774&end=-43.51215423453657,%20-20.397917705516818');

  request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);

      if (this.status === 200) {
        var response = JSON.parse(this.responseText);
        var coordinates = response.features[0].geometry.coordinates;
  
        // Extrair os valores das coordenadas
        var startLatitude = coordinates[0][1];
        var startLongitude = coordinates[0][0];
        var endLatitude = coordinates[coordinates.length - 1][1];
        var endLongitude = coordinates[coordinates.length - 1][0];
  
        console.log('Start Latitude:', startLatitude);
        console.log('Start Longitude:', startLongitude);
        console.log('End Latitude:', endLatitude);
        console.log('End Longitude:', endLongitude);
      }
    }
  };

  return (
    <>
      <Control>
        <Inserir>
          <Label htmlFor="origem">Origem: </Label>
          <Input type="text" name="origem" id="origem" placeholder='Digite o local de origem' />
        </Inserir>
        <Inserir>
          <Label htmlFor="destino">Destino: </Label>
          <Input type="text" name="destino" id="destino" placeholder='Digite o local de destino' />
        </Inserir>
      </Control>
      <div style={{height:'100vh',width:'100%'}} ref={mapRef}></div>
    </>
  )
}

export default App

//