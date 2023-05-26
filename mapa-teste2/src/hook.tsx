import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { Stroke, Style } from 'ol/style';
import { useCallback } from 'react';

import { mapConfig } from '@/configs/mapConfig';

import { useMap } from './index';

interface AddPinProps {
  id: string;
  coordinates: number[];
}

export function useDirections() {
  const storageKey = '@terraplanner:directions';
  const { directionsLayer } = useMap();
  const source = directionsLayer.getSource()!;

  const addDirection = useCallback(
    ({ id, coordinates }: AddPinProps) => {
      if (source.getFeatureById(id)) return;

      const lineString = new LineString(coordinates);
      lineString.transform('EPSG:4326', mapConfig.projection);

      const direction = new Feature(lineString);
      direction.setStyle(
        new Style({
          stroke: new Stroke({ color: [255, 0, 0, 1], width: 5 })
        })
      );

      const formattedDirection = {
        id,
        color: [255, 0, 0, 1],
        opacity: 1
      };
      direction.setId(id);

      source.addFeature(direction);

      return formattedDirection;
    },
    [source]
  );

  return {
    addDirection,
  };
}