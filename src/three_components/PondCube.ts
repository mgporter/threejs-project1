import { GroundCube } from "./GroundCube";

class PondCube extends GroundCube {
  
  constructor(length: number, width: number) {
    super(length, width, 0x00d3ff, 0.7);
  }

}

export { PondCube };