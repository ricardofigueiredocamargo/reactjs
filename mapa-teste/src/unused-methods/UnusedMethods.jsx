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

/**
 * 
 * map.addEventListener('click', (e) => {
      console.log(e.coordinate)
    })
 */

    /**
     * 
     * //Layer Switcher Logic
      const baseLayerElements = document.querySelectorAll('input[type=radio]')
      for (let pos in baseLayerElements) {
        baseLayerElements[pos].addEventListener('change', () => {
          let baseLayerElementValue = this.value
          baseLayerGroup.getLayers().forEach((element) => {
            let baseLayerTitle = element.get('title')
            element.setVisible(baseLayerTitle === baseLayerElementValue)
          })
        })
      }
     */

      // Base Layers
    const openStreetMapStandard = new TileLayer({
        source: new OSM(),
        visible:  false,
        title: 'OSMStandard'
      })
  
      const openStreetMapHumanitarian = new TileLayer({
        source: new OSM({
          url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible:  false,
        title: 'OSMHumanitarian'
      }) 
  
      const stamenTerrain = new TileLayer({
        source: new OSM({
          url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
        }),
        visible: false,
        title: 'StamenTerrain'
      })
  
      // Layer Group
      const baseLayerGroup = new LayerGroup({
        layers: [
          openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
        ]
      })
  
      map.addLayer(baseLayerGroup) 

/*  useEffect(() => {
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
      let xy = toLonLat(e.coordinate);
      console.log(xy);
      xy = fromLonLat(xy)
      console.log(xy);
    })

    map.setTarget(mapRef.current)
  }, []) */      

  useEffect(() => {
    const mapObject = new Map({
      view: new View({
        center: center,
        zoom: 15,
        maxZoom: 20,
        minZoom: 5,
      }),
      layers: [
        new TileLayer({source: new OSM()})
      ]
    })

    mapObject.setTarget(mapRef.current)
  }, [])

  /* const estiloLinha = new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 2
            })
          })

          for (let pos in routeCoordinates) {
            const linha = new Feature({
              geometry: new LineString(fromLonLat(routeCoordinates[pos]))
            })

            linha.setStyle(estiloLinha)

            const camadaRota = new VectorLayer({
              source: new VectorSource({
                features: [linha]
              })
            })

            map.addLayer(camadaRota) */