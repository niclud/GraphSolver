import { AlgorithmData } from "@/types";

export default function AlgorithmCard({ data }: { data: AlgorithmData }) {
  return (
    <div className="p-5 flex gap-7 flex-col">
      <h2 className="text-5xl text-center font-bold">{data.nombre}</h2>
      <div className="w-full flex justify-center">
        <img className="w-[500px]" src={data.imagen}></img>
      </div>
      <div>
        <p className="text-2xl">
          <strong>Descripción:</strong>
        </p>
        <p>{data.descripcion}</p>
      </div>
      <div>
        <p className="text-2xl">
          <strong>Detalles:</strong>
        </p>
        <ul className="list-disc ml-8">
          {data.detalles.map((detalle: any) => {
            return <li>{detalle}</li>;
          })}
        </ul>
      </div>
      <div>
        <p className="text-2xl">
          <strong>Ejemplo de uso:</strong>
        </p>
        <ul className="list-disc ml-8">
          {data.ejemplos.map((detalle: any) => {
            return <li>{detalle}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
