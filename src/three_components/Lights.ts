import { DirectionalLight, AmbientLight, Vector3 } from "three";

class Lights {

  static createDirectionalLight() {
    const light = new DirectionalLight('white', 8);
    light.position.set(10,10,10);
    return light;
  }

  static createAmbientLight() {
    const light = new AmbientLight('white', 2);
    light.position.set(10,10,10);
    return light;
  }

}

export { Lights };