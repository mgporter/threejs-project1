import { SelectableMesh } from "../three_components/SelectableMesh";
import { MouseEvents } from "./MouseEvents";
import { Camera } from "three";

class MouseSelectRect extends MouseEvents {

  #currentTarget: SelectableMesh | null = null;
  #originOfSelection: SelectableMesh | null = null;
  #inSelectionMode = false;

  #_onClick;
  #_onMouseenter;
  #_onMouseleave;
  #_onMousedown;
  #_onMouseup;
  #_onMousemove;

  constructor(camera: Camera, canvas: HTMLElement) {
    super(camera, canvas);

    this.#_onClick = this.#onClick.bind(this);
    this.#_onMouseenter = this.#onMouseenter.bind(this);
    this.#_onMouseleave = this.#onMouseleave.bind(this);
    this.#_onMousedown = this.#onMousedown.bind(this);
    this.#_onMouseup = this.#onMouseup.bind(this);
    this.#_onMousemove = this.#onMousemove.bind(this);

    this.getCanvas().addEventListener("click", this.#_onClick);

    this.getCanvas().addEventListener("mousemove", this.#_onMousemove);

  }

  handleSelection() {
    console.log("Selection made!")
  }

  #onClick(e: MouseEvent) {
    if (this.#currentTarget) {

      if (this.#inSelectionMode) {
        this.handleSelection();
        this.#clearSelection();
      } else {
        this.#originOfSelection = this.#currentTarget;
        this.#inSelectionMode = true;
        this.#currentTarget = null;
      }

    } else {

      if (this.#inSelectionMode) {
        this.#clearSelection();
      }

    }
  }

  #clearSelection() {
    this.#originOfSelection = null;
    this.#currentTarget = null;
    this.#inSelectionMode = false;
    this.#unselectAll();
  }

  #unselectAll() {
    this.getObjects().filter(x => x.currentlySelected()).forEach(x => x.unselect());
  }

  #onMousedown(e: MouseEvent) {}

  #onMouseup(e: MouseEvent) {}

  #updateSelection(origin: SelectableMesh, target: SelectableMesh) {

    const originX = origin.getCoordinates().x, originZ = origin.getCoordinates().z;
    const targetX = target.getCoordinates().x, targetZ = target.getCoordinates().z;

    let minX: number, maxX: number, minZ: number, maxZ: number;

    if (originX < targetX) {
      minX = originX; maxX = targetX;
    } else {
      minX = targetX; maxX = originX;
    }

    if (originZ < targetZ) {
      minZ = originZ; maxZ = targetZ;
    } else {
      minZ = targetZ; maxZ = originZ;
    }

    this.getObjects().forEach(x => {
      if (this.#inBounds(x, minX, maxX, minZ, maxZ)) {
        x.select();
      } else {
        x.unselect();
      }
    });

    console.log(origin.getCoordinates(), target.getCoordinates());

  }

  #inBounds(obj: SelectableMesh, minX: number, maxX: number, minZ: number, maxZ: number) {
    const coord = obj.getCoordinates();
    return coord.x >= minX && coord.x <= maxX && coord.z >= minZ && coord.z <= maxZ;
  }

  #onMousemove(e: MouseEvent) {

    const intersections = this.getIntersectedObject(e);

    if (intersections.length > 0) {

      if (intersections[0].object === this.#currentTarget) return;

      if (this.#originOfSelection) {     // if in selection mode
        this.#currentTarget = intersections[0].object;
        this.#updateSelection(this.#originOfSelection, this.#currentTarget);
      } else {
        if (this.#currentTarget) this.#currentTarget.unselect();
        this.#currentTarget = intersections[0].object;
        this.#currentTarget.select();
      }

    } else {

      if (!this.#inSelectionMode) {
        if (this.#currentTarget) this.#currentTarget.unselect();
      }
      this.#currentTarget = null;

    }

  }

  #onMouseenter(e: MouseEvent) {
    
  }

  #onMouseleave(e: MouseEvent) {
    
  }



}

export { MouseSelectRect };