import { GroundCube } from "./GroundCube";

class GrassCube extends GroundCube {

  constructor(length: number, width: number) {
    super(length, width, 0x00ff00);
  }

}

export { GrassCube };