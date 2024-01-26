import { GroundCube } from "./GroundCube";

class FoundationCube extends GroundCube {
  
  constructor(length: number, width: number) {
    super(length, width, 0x00d3ff, 0.7);
  }

}

export { FoundationCube };