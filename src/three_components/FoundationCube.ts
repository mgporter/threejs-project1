import { GroundCube } from "./GroundCube";

class FoundationCube extends GroundCube {
  
  constructor(length: number, width: number) {
    super(length, width, {
      color: 0x9e670c,
      selectable: false
    });
  }

}

export { FoundationCube };