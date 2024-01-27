import { 
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3} from "three";

import { ColoredMaterial } from "../types";

class MyMesh<TGeometry extends BufferGeometry<NormalBufferAttributes> = BufferGeometry<NormalBufferAttributes>, 
  TMaterial extends ColoredMaterial = ColoredMaterial, 
  TEventMap extends Object3DEventMap = Object3DEventMap> 
  extends Mesh<TGeometry, TMaterial, TEventMap> {

  #coordinates;

  constructor(geometry: TGeometry, material: TMaterial, coordinates?: Vector3) {
    super(geometry, material);

    this.#coordinates = coordinates ? coordinates : new Vector3(0,0,0);
  }

  isSelectable() {
    return false;
  }

  getCoordinates() {
    return this.#coordinates;
  }

}

export { MyMesh };