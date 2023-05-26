import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export function createNewVectorLayer() {
  return new VectorLayer({
    source: new VectorSource()
  });
}