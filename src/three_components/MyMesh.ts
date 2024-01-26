import { 
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap } from "three";

class MyMesh<TGeometry extends BufferGeometry<NormalBufferAttributes> = BufferGeometry<NormalBufferAttributes>, 
  TMaterial extends Material | Material[] = Material | Material[], 
  TEventMap extends Object3DEventMap = Object3DEventMap> 
  extends Mesh<TGeometry, TMaterial, TEventMap> {

  #isSelectable = true;

  constructor(
    geometry: TGeometry, 
    material: TMaterial,
    options: {
      selectable?: boolean;
    }) {
    super(geometry, material);
    
    if (options.selectable != undefined)
      this.#isSelectable = options.selectable;
  }

  isSelectable() {
    return this.#isSelectable;
  }

  setSelectable(val: boolean) {
    this.#isSelectable = val;
  }

}

export { MyMesh };