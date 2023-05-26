import { Inserir, Label, Input } from "../assets/StyledComponents"
import { useState } from "react"
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import View from 'ol/View.js';
import axios from 'axios'

export function LocationInput({ apiKey, map, setOriginCoordinates, setDestinationCoordinates }) {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    function handleOrigin(event) {
        setOrigin(event.target.value)
    }
    
    function handleDestination(event) {
    setDestination(event.target.value)
    }
    
    function searchLocation(location) {
    const fetchRoute = async () => {
        const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${location}&focus.point.lon=-43.50361376060541&focus.point.lat=-20.385812669995545&boundary.country=BR&layers=locality`;
    
        try {
        const response = await axios.get(url);
        const routeCoordinates = response.data.features[0].geometry.coordinates;

        if (location == origin) {
            setOriginCoordinates(routeCoordinates)
            location = 'origin'
        }

        if (location == destination) {
            setDestinationCoordinates(routeCoordinates)
            location = 'destination'
        }
    
        const marker = new Feature({
            geometry: new Point(fromLonLat(routeCoordinates))
        });
    
        const markerStyle = new Style({
            image: new Icon({
            src: `src/assets/marker-${location}.svg`,
            })
        });
    
        marker.setStyle(markerStyle);
    
        const vectorLayer = new VectorLayer({
            source: new VectorSource({
            features: [marker]
            })
        });
    
        map.addLayer(vectorLayer);

        map.setView(new View({
            center: fromLonLat(routeCoordinates),
            zoom: 10
        }))
        } catch (error) {
        console.log(error);
        }
    };

    fetchRoute();
    }

    return (
        <>
        <Inserir>
          <Label htmlFor="origem">Origem: </Label>
          <Input 
            type="text" 
            id="origem" 
            placeholder='Digite o local de origem' 
            value={origin}
            onChange={handleOrigin}
            onBlur={() => searchLocation(origin)}
          />
        </Inserir>
        <Inserir>
          <Label htmlFor="destino">Destino: </Label>
          <Input 
            type="text" 
            id="destino" 
            placeholder='Digite o local de destino' 
            value={destination}
            onChange={handleDestination}
            onBlur={() => searchLocation(destination)}
          />
        </Inserir> 
        </>
    )
}