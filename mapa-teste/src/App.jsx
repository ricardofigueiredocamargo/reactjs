import { useEffect, useState } from 'react'
import { Map } from 'ol'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import OLVectorLayer from "ol/layer/Vector";
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
  const [center, setCenter] = useState([-4842800.131497843, -2318792.1804284034])
  const [map, setMap] = useState(new Map())
  const [source, setSource] = useState(new OSM())
  
  const [originCoordinates, setOriginCoordinates] = useState('')
  const [destinationCoordinates, setDestinationCoordinates] = useState('')
  const apiKey = '5b3ce3597851110001cf6248083c52d853ae4b4c968ee8717fbde02e'

  useEffect(() => {
    document.querySelector('#map').innerHTML = ''

    setMap(new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: source
        })
      ],
      view: new View({
        center: center,
        zoom: 15
      })
    }))
    console.log(toLonLat(center))
  }, [])

  useEffect(() => {
    if (originCoordinates !== '' && destinationCoordinates !== '') {
      const fetchRoute = async () => {
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoordinates}&end=${destinationCoordinates}`

        try {
          const response = await axios.get(url)
          const routeCoordinates = response.data.features[0].geometry.coordinates
          console.log(routeCoordinates)

          for (let pos in routeCoordinates) {
            console.log(routeCoordinates[pos])
          }

          const linha = new Feature({
            geometry: new LineString([fromLonLat(routeCoordinates[0])], [fromLonLat(routeCoordinates[1])])
          })

          const estiloLinha = new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 2
            })
          })

          linha.setStyle(estiloLinha)

          const camadaRota = new VectorLayer({
            source: new VectorSource({
              features: [linha]
            })
          })

          map.addLayer(camadaRota)
          
  
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