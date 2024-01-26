import { GroundCube } from "./GroundCube";

class GrassCube extends GroundCube {

  constructor(length: number, width: number) {
    super(length, width, {color: 0x2fcc00});
  }

}

export { GrassCube };