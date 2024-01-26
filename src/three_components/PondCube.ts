import { GroundCube } from "./GroundCube";

class PondCube extends GroundCube {
  
  constructor(length: number, width: number) {
    super(length, width, {
      color: 0x00d3ff,
      transparency: 0.7,
      selectable: false,
    });
  }

}

export { PondCube };