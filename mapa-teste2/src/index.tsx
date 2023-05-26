import { Geometry } from 'ol/geom';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import ImageWMS from 'ol/source/ImageWMS';
import VectorSource from 'ol/source/Vector';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';

import {
  createLineLayer,
  createNewImageLayer,
  createNewVectorLayer
} from './Layers';

interface MapContextProps {
  map: Map;
  directionsLayer: VectorLayer<VectorSource<Geometry>>;
  pinLayer: VectorLayer<VectorSource<Geometry>>;
}

interface MapProviderProps {
  map: Map;
  children: React.ReactNode;
}

const MapContext = createContext<MapContextProps>({} as MapContextProps);

export function MapProvider({ children, map }: MapProviderProps) {
  const pinLayer = useMemo(() => createNewVectorLayer(), []);
  const directionsLayer = useMemo(() => createNewVectorLayer(), []);

  useEffect(() => {
    map.addLayer(directionsLayer);
    map.addLayer(pinLayer);
  }, [
    directionsLayer,
    map,
    pinLayer,
  ]);

  return (
    <MapContext.Provider
      value={{
        map,
        pinLayer,
        directionsLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap(): MapContextProps {
  const context = useContext(MapContext);
  if (!context) throw new Error('useMap must be used within a MapProvider');

  return context;
}