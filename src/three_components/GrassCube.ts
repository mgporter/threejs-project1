import { Vector3 } from "three";
import { GroundCube } from "./GroundCube";

class GrassCube extends GroundCube {

  constructor(length: number, width: number, coordinates: Vector3) {
    super(length, width, coordinates, {color: 0x2fcc00});
  }

}

export { GrassCube };