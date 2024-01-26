import { 
  BoxGeometry, 
  Color, 
  ExtrudeGeometry, 
  Group, 
  MathUtils, 
  MeshLambertMaterial, 
  MeshStandardMaterial, 
  Shape } from "three";

import { MyMesh } from "./MyMesh";

class GroundCube extends Group {

  #radiansPerSecond = MathUtils.degToRad(30);
  #length;
  #width;
  #color;
  #transparency;
  #isSelectable;
  #outsideMesh;

  constructor(
    length: number, 
    width: number, 
    options: {
      color?: number,
      transparency?: number,
      selectable?: boolean
    }) {
    super();
    this.#length = length;
    this.#width = width;
    this.#color = options.color ? options.color : 0x000000;
    this.#transparency = options.transparency ? options.transparency : 1;
    this.#isSelectable = options.selectable == undefined ? true : options.selectable;
    this.#outsideMesh = this.#createOuterCube(),

    this.add(
      this.#createInnerCub(),
      this.#outsideMesh
      );
    
    const factor = 0.92;
    this.scale.set(factor, factor, factor);
  }

  #createInnerCub() {
    const geometry = new BoxGeometry(this.#length * 1, this.#width * 1);
    const material = new MeshLambertMaterial({
      transparent: this.#transparency === 1 ? false : true,
      opacity: 1 * this.#transparency,
      color: new Color(this.#color),
      emissive: new Color(0x000000),
      wireframe: false,
      vertexColors: false,
      fog: false,
    });

    const mesh = new MyMesh(geometry, material, {selectable: false});
    mesh.scale.set(1.06, 1, 1.06);
    return mesh;
  }

  #createOuterCube(): MyMesh {
    // length controls the Y axis (height)
    // width controls the Z axis (depth)
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, this.#length);
    shape.lineTo(this.#width, this.#length);
    shape.lineTo(this.#width, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 3
    }

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);

    const material = new MeshStandardMaterial({
      transparent: true,
      opacity: 0.5 * this.#transparency,
      color: new Color(this.#color),
      emissive: new Color(0x000000),
      roughness: 0,
      metalness: 0.7,
      flatShading: true,
      wireframe: false,
      fog: false,
    });

    this.#outsideMesh = new MyMesh(geometry, material, {selectable: this.#isSelectable});

    this.#outsideMesh.rotation.order = "ZYX";
    this.#outsideMesh.rotation.set(0,Math.PI/2,Math.PI/2);
    this.#outsideMesh.position.set(this.#length/2,-this.#width/2,this.#width/2);

    // Must be set higher than the outside or else the inside
    // will disappear when transparency is set.
    this.#outsideMesh.renderOrder = 1;

    return this.#outsideMesh;

  }

  tick(delta: number) {
    this.rotation.z += this.#radiansPerSecond * delta;
    this.rotation.x += this.#radiansPerSecond * delta;
    this.rotation.y += this.#radiansPerSecond * delta;
  }

  isSelectable() {
    return this.#outsideMesh.isSelectable();
  }

  setSelectable(val: boolean) {
    this.#outsideMesh.setSelectable(val);
  }  

}

export { GroundCube };