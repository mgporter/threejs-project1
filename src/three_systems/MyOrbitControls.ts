import { Camera, Object3D } from "three";
import { OrbitControls } from "./OrbitControlsFixed";
import { MOUSE } from "three";

class MyOrbitControls extends OrbitControls {

  constructor(camera: Camera, canvas: HTMLElement, target?: Object3D) {
    super(camera, canvas);
    if (target) this.target = target.position;

    this.screenSpacePanning = false;

    this.listenToKeyEvents();
    this.panSpeed = 8;


  }

}

export { MyOrbitControls };