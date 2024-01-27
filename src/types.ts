import { LineBasicMaterial, 
  LineDashedMaterial, 
  MeshBasicMaterial, 
  MeshLambertMaterial, 
  MeshMatcapMaterial, 
  MeshPhongMaterial, 
  MeshPhysicalMaterial, 
  MeshStandardMaterial, 
  MeshToonMaterial, 
  Object3D, 
  PointsMaterial, 
  ShadowMaterial, 
  SpriteMaterial } from "three";

export type ColoredMaterial = 
  MeshLambertMaterial | 
  MeshPhongMaterial | 
  MeshStandardMaterial |
  LineBasicMaterial |
  LineDashedMaterial |
  MeshBasicMaterial |
  MeshMatcapMaterial |
  MeshPhysicalMaterial |
  MeshToonMaterial |
  PointsMaterial |
  ShadowMaterial |
  SpriteMaterial;

export interface Selectable {
  isSelectable: () => boolean;
  setSelectable: (val: boolean) => void;
  currentlySelected: () => boolean;
  select: () => void;
  unselect: () => void;
  toggleSelect: () => void;
};

export type SelectableObject3D = Object3D & Selectable;