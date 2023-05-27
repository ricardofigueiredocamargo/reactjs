import { useEffect, useState } from 'react'
import { Map } from 'ol'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import './assets/App.css'
import { toLonLat, fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import axios from 'axios';


import { Control, Botoes } from './assets/StyledComponents';
import { ChangeLayerButton } from './Components/ChangeLayerButton';
import { LocationInput } from './Components/LocationInput';
import { LineString } from 'ol/geom';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

function App() {
  const [map, setMap] = useState(new Map())
  
  const [originCoordinates, setOriginCoordinates] = useState('')
  const [destinationCoordinates, setDestinationCoordinates] = useState('')
  const apiKey = '5b3ce3597851110001cf6248083c52d853ae4b4c968ee8717fbde02e'

  useEffect(() => {
    document.querySelector('#map').innerHTML = ''

    setMap(new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
          title: 'OSMStandard'
        })
      ],
      view: new View({
        center: [-4842800.131497843, -2318792.1804284034],
        zoom: 15
      })
    }))
  }, [])

  useEffect(() => {
    if (originCoordinates !== '' && destinationCoordinates !== '') {
      const fetchRoute = async () => {
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoordinates}&end=${destinationCoordinates}`

        try {
          const response = await axios.get(url)
          const routeCoordinates = response.data.features[0].geometry.coordinates

          map.getLayers().getArray()
            .filter(layer => layer.get('name') === 'Line')
            .forEach(layer => map.removeLayer(layer));
   
          let lineStyle = [
            // linestring
            new Style({
              stroke: new Stroke({
                color: 'blue',
                width: 4
              })
            })
          ];

          for (let pos in routeCoordinates) {
            let next = Number(pos) + 1

            let firstCoordinate = fromLonLat(routeCoordinates[pos])
            let secondCoordinate = fromLonLat(routeCoordinates[next])

            //create the line       
            let line = new VectorLayer({
              source: new VectorSource({
                features: [new Feature({
                  geometry: new LineString([firstCoordinate, secondCoordinate]),
                  name: 'Line'
                })]
              }),
              name: 'Line'
            });

            //set the style and add to layer
            line.setStyle(lineStyle);
            map.addLayer(line);
          }   
          console.log(map.getLayers())
  
        } catch (error) {
          console.log(error)
        }
      }

      fetchRoute()
    }

  }, [originCoordinates, destinationCoordinates])

  return (
    <>
      <Control>
        <LocationInput apiKey={apiKey} map={map} setOriginCoordinates={setOriginCoordinates} setDestinationCoordinates={setDestinationCoordinates} />
        <Botoes>
          <ChangeLayerButton layer={'OSMStandard'} map={map}/>
          <ChangeLayerButton layer={'OSMHumanitarian'} map={map}/>
          <ChangeLayerButton layer={'waterColor'} map={map}/>
        </Botoes>
      </Control>
      <div style={{height:'100vh',width:'100%'}} id='map'></div>
    </>
  )
}

export default App


// `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${origin}&focus.point.lon=-43.50361376060541&focus.point.lat=-20.385812669995545&boundary.country=BR&layers=locality`