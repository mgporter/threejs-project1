import { BufferGeometry, Camera, Color, Material, Mesh, MeshStandardMaterial, Object3D, OrthographicCamera, PerspectiveCamera, Raycaster, Vector2 } from "three";

import { MyMesh } from "../three_components/MyMesh";

interface Selectable {
  isSelectable: () => boolean;
}

class MouseEvents {

  #camera;
  #canvas;
  #raycaster;
  #mouse;
  #objects: Object3D[];

  constructor(camera: Camera, canvas: HTMLElement) {
    this.#camera = camera;
    this.#canvas = canvas;
    this.#raycaster = new Raycaster();
    this.#mouse = new Vector2();
    this.#objects = [];

    canvas.addEventListener("mousedown", (e) => {
      this.#handleClick(e);
    });
  }

  #handleClick(e: MouseEvent) {
    e.preventDefault();

    const pointer = this.#getPointerCoordinates(e);

    this.#raycaster.setFromCamera(pointer, this.#camera);

    const intersections = this.#raycaster.intersectObjects(
      this.#objects) as {object: MyMesh<BufferGeometry, MeshStandardMaterial>}[];

    if (intersections.length === 0 ||
      !intersections[0].object.isSelectable()) return;

    intersections[0].object.material.color.set(0x222222);
    
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

  setObjectsArray(objects: Object3D[]) {
    this.#objects = objects;
  }

}

export { MouseEvents };