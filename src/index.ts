import "./index.css";
import { ThreeWorld } from "./ThreeWorld";

function main() {

  const canvasContainer = document.getElementById("canvas-container");
  if (canvasContainer == null) {
    console.error("Cannot find canvas container!");
    return;
  }
  const world = new ThreeWorld(canvasContainer);
  // world.render();
  world.start();

}

main();