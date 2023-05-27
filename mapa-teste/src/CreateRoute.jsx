import axios from "axios"
import Style from "ol/style/Style"
import Stroke from "ol/style/Stroke"
import { fromLonLat } from "ol/proj"
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';

export function CreateRoute(map, originCoordinates, destinationCoordinates, apiKey) {

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