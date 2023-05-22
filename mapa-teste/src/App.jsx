import { useState, useRef, useEffect } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import * as ol from "ol";

function App() {
  /* const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  const initialMap = new Map({
    target: mapElement.current,
    layers: [
      new TileLayer({source: new OSM()}),
    ],
    view: new View({
        center: [0, 0],
        zoom: 0,
      }),
  });

  useEffect(() => {
      setMap(initialMap);
  }, []); */

  const mapRef = useRef();
  // on component mount
  useEffect(() => {
    let options = {
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
      layers: [
        new TileLayer({source: new OSM()}),
      ],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <>
      <div style={{height:'100vh',width:'100%'}} ref={mapRef} />
    </>
  )
}

export default App
