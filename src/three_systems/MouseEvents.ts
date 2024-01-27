import {
  Camera, 
  Raycaster, 
  Vector2 } from "three";

import { SelectableMesh } from "../three_components/SelectableMesh";
import { SelectableObject3D } from "../types";

class MouseEvents {

  #camera;
  #canvas;
  #raycaster;
  #mouse;
  #objects: SelectableMesh[];
  
  constructor(camera: Camera, canvas: HTMLElement) {
    this.#camera = camera;
    this.#canvas = canvas;
    this.#raycaster = new Raycaster();
    this.#mouse = new Vector2();
    this.#objects = [];
  }

  getCamera() {
    return this.#camera;
  }

  getCanvas() {
    return this.#canvas;
  }

  getObjects() {
    return this.#objects;
  }

  // #handleMouseover(e: MouseEvent) {
  //   e.preventDefault();
  //   console.log("test")

  //   const target = this.#getIntersectedObject(e);
  //   if (target == null) return;

  //   if (!target.currentlySelected()) target.select();
  // }

  // #handleClick(e: MouseEvent) {
  //   e.preventDefault();

  //   const target = this.#getIntersectedObject(e);
  //   if (target == null) return;

  //   console.log(target.getCoordinates());

  //   target.toggleSelect();
  // }

  getIntersectedObject(e: MouseEvent) {
    this.#raycaster.setFromCamera(this.#getPointerCoordinates(e), this.#camera);
    return this.#raycaster.intersectObjects(this.#objects, false) as {object: SelectableMesh}[];
    // if (intersections.length === 0) return null;
    // else return intersections[0].object;
  }

  #getPointerCoordinates(e: MouseEvent) {
    /* Use the commented-out code if we are going to
    change the size of the canvas so that it is not full-screen */
    // const rect = this.#canvas.getBoundingClientRect();
    // this.#mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    // this.#mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.#mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.#mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    return this.#mouse;
  }

  setObjectsArray(objects: SelectableMesh[]) {
    this.#objects = objects;
  }

  removeEventListeners() {}

}

export { MouseEvents };