export {};

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';
  
  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: any[]): void;
  }
  
  export class MeshLineMaterial extends Material {
    constructor(parameters?: any);
    color: any;
    map: any;
    useMap: boolean;
    resolution: any;
    lineWidth: number;
    repeat: any;
    depthTest: boolean;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: {
        attach?: string;
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: any;
        repeat?: [number, number];
        lineWidth?: number;
        [key: string]: any;
      };
      group: any;
      mesh: any;
      ambientLight: any;
      meshPhysicalMaterial: any;
    }
  }
}