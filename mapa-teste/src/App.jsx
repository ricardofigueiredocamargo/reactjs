import { useEffect, useState } from 'react'
import { Map } from 'ol'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import './assets/App.css'

import { Control, Botoes } from './assets/StyledComponents';
import { ChangeLayerButton } from './Components/ChangeLayerButton';
import { LocationInput } from './Components/LocationInput';

import { CreateRoute } from './CreateRoute';

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
    if (originCoordinates !== '' && destinationCoordinates !== ''){
      CreateRoute(map, originCoordinates, destinationCoordinates, apiKey)
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
