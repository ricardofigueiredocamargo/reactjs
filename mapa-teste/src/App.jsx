import { useRef, useEffect, useState } from 'react'
import { Map } from 'ol'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import OLVectorLayer from "ol/layer/Vector";
import LayerGroup from 'ol/layer/Group';
import './assets/App.css'
import { Control, Input, Inserir, Label } from './assets/StyledComponents';
import { toLonLat, fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps'

function App() {
  const [center, setCenter] = useState([-4842800.131497843, -2318792.1804284034])
  const [map, setMap] = useState()
  const [source, setSource] = useState(new OSM())

  function updateLayer({ map, type, url, className }) {
    const layers = map.getLayers();
  
    const layerTypes = {
      ors: new XYZ({
        url
      }),
      google: new XYZ({
        url
      }),
      bing: new BingMaps({
        key: 'Aq37ETnW9edsqiavi4acwoSc1lE5r5cIYM_mKQps0dOl98CBSK7OWRURIun1uLv9',
        imagerySet: url
      })
    };
  
    const newLayers = layers?.getArray().map((layer) => {
      if (layer.getClassName() === className) {
        layer = new TileLayer({
          className,
          source: layerTypes[type]
        });
      }
    })

    return newLayers
  } 

  function createMap(center, source) {
    setMap(new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: source
        })
      ],
      view: new View({
        center,
        zoom: 15
      })
    }))
  }

  const mudarMapa = () => {
    map?.setLayers(updateLayer({ map, className: 'Tile', type: 'bing', url: 'Aerial'}))
    
  }

  useEffect(() => {
    createMap(center, source)
  }, [])

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
        <button onClick={mudarMapa}>mudar</button>
      </Control>
      <div style={{height:'100vh',width:'100%',display:'flex'}} id='map'></div>
    </>
  )
}

export default App
