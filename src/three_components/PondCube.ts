import { Vector3 } from "three";
import { GroundCube } from "./GroundCube";

class PondCube extends GroundCube {
  
  constructor(length: number, width: number, coordinates: Vector3) {
    super(length, width, coordinates, {
      color: 0x00d3ff,
      transparency: 0.8,
      selectable: false,
    });
  }

}

export { PondCube };