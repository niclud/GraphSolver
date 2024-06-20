import CardOfPerson from "@/components/cardOfPerson";
import { title } from "@/components/primitives";
import { Person } from "@/types";
import fotoTomas from "../../public/imagesPerson/tomas.jpg";
import fotoNicolas from "../../public/imagesPerson/nicolas.jpeg";
import fotoAugusto from "../../public/imagesPerson/augusto.jpg";
import fotoLucas from "../../public/imagesPerson/lucas.jpg";

export default function AboutPage() {
  const data: Person[] = [
    {
      nombre: "Tomás",
      apellido: "Villarreal",
      foto: fotoTomas,
      ocupacion: "Estudiante de Ingeniería en Sistemas",
      localidad: "📍Villa María",
      linkedin: "https://www.linkedin.com/in/tomas-villarreal/",
      github: "https://github.com/tomivillarreal",
    },
    {
      nombre: "Augusto",
      apellido: "Falco",
      foto: fotoAugusto,
      ocupacion: "Estudiante de Ingeniería en Sistemas",
      localidad: "📍Villa María",
      linkedin: "https://www.linkedin.com/in/augustofalco/",
      github: "https://github.com/augustofalco",
    },
    {
      nombre: "Nicolas",
      apellido: "Ludueña",
      foto: fotoNicolas,
      ocupacion: "Estudiante de Ingeniería en Sistemas",
      localidad: "📍Villa María",
      linkedin: "https://www.linkedin.com/in/nicolasluduena/",
      github: "https://github.com/niclud",
    },
    {
      nombre: "Lucas",
      apellido: "Leone",
      foto: fotoLucas,
      ocupacion: "Estudiante de Ingeniería en Sistemas",
      localidad: "📍Arroyo Cabral",
      linkedin: "https://www.linkedin.com/in/lucas-leone-6133991a2/",
      github: "https://github.com/lucasleone",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className={title()}>¿Quienes Somos?</h1>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 h-full w-full ">
        {data.map((person: Person) => {
          return (
            <CardOfPerson data={person} key={person.nombre}></CardOfPerson>
          );
        })}
      </div>
    </div>
  );
}
