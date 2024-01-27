import { BufferGeometry, NormalBufferAttributes, Object3DEventMap, Vector3 } from "three";
import { MyMesh } from "./MyMesh";
import { ColoredMaterial } from "../types";
import { Selectable } from "../types";

class SelectableMesh<TGeometry extends BufferGeometry<NormalBufferAttributes> = BufferGeometry<NormalBufferAttributes>, 
TMaterial extends ColoredMaterial = ColoredMaterial, 
TEventMap extends Object3DEventMap = Object3DEventMap> 
extends MyMesh<TGeometry, TMaterial, TEventMap> implements Selectable {

  #isSelectable;
  #isCurrentlySelected = false;

  constructor(geometry: TGeometry, material: TMaterial, coordinates?: Vector3, selectable?: boolean) {
    super(geometry, material, coordinates);
    this.#isSelectable = selectable == null ? true : selectable;
  }

  isSelectable() {
    return this.#isSelectable;
  }

  setSelectable(val: boolean) {
    if (!this.#isSelectable) return;
    this.#isSelectable = val;
    if (!val) this.#isCurrentlySelected = false;
  }

  currentlySelected() {
    return this.#isCurrentlySelected;
  }

  select() {
    if (!this.#isSelectable) return;
    this.#isCurrentlySelected = true;
    this.changeToSelectedAppearance();
  }

  unselect() {
    this.#isCurrentlySelected = false;
    this.changeToUnselectedAppearance();
  }

  toggleSelect() {
    if (!this.#isSelectable) return;
    if (this.#isCurrentlySelected) this.changeToUnselectedAppearance();
    else this.changeToSelectedAppearance();
    this.#isCurrentlySelected = !this.#isCurrentlySelected;
  }

  // Hooks to implement later
  changeToSelectedAppearance() {}

  changeToUnselectedAppearance() {}

}

export { SelectableMesh };