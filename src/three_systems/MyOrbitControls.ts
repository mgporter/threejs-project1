import { Camera, Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class MyOrbitControls extends OrbitControls {

  constructor(camera: Camera, canvas: HTMLElement, target?: Object3D) {
    super(camera, canvas);
    if (target) this.target = target.position;
  }

}

export { MyOrbitControls };