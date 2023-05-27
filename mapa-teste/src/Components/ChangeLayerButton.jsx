import { Button } from "../assets/StyledComponents";

import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import LayerGroup from 'ol/layer/Group';

export function ChangeLayerButton({ layer, map }) {

    function mudarMapa(baseLayerElementValue) {
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
    
        const waterColor = new TileLayer({
          source: new OSM({
            url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
          }),
          visible: false,
          title: 'waterColor'
        })
    
        // Layer Group
        const baseLayerGroup = new LayerGroup({
          layers: [
            openStreetMapStandard, openStreetMapHumanitarian, waterColor
          ]
        })

        map.getLayers().getArray()
          .filter(layerTitle => layerTitle.get('title') !== layer)
          .forEach(layerTitle => map.removeLayer(layerTitle));
    
        map.addLayer(baseLayerGroup)
    
        baseLayerGroup.getLayers().forEach((element) => {
          let baseLayerTitle = element.get('title')
          element.setVisible(baseLayerTitle === baseLayerElementValue)
        })
      }

    return (
        <Button onClick={() => mudarMapa(layer)}>{layer}</Button>
    )
}