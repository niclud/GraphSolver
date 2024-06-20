import { StaticImageData } from "next/image";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Person = {
  nombre: string;
  apellido: string;
  foto: StaticImageData;
  ocupacion: string;
  localidad: string;
  linkedin: string;
  github: string;
};
