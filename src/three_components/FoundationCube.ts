import { Vector3 } from "three";
import { GroundCube } from "./GroundCube";

class FoundationCube extends GroundCube {
  
  constructor(length: number, width: number, coordinates: Vector3) {
    super(length, width, coordinates, {
      color: 0x9e670c,
      selectable: false
    });
  }

}

export { FoundationCube };