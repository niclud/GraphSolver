
import { Person } from "@/types";
import { Card } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./icons";




export default function CardOfPerson({ data }: { data: Person }) {




    return (


        <Card className="w-full h-full p-5 justify-center items-center flex flex-col gap-4">
            <div className="aspect-square h-[250px] w-[250px]">
                <Image src={data.foto} width={250} height={250} alt="Imagen" className="object-cover aspect-square"></Image>
            </div>
            <div className="gap-1 flex flex-col">
                <h1 className="text-2xl font-semibold">{data.nombre} {data.apellido}</h1>
                <h2 className="text-lg">{data.ocupacion}</h2>
                <h2 className="text-lg">{data.localidad}</h2>
                <div className="flex flex-row gap-7 justify-center">
                <Link href={data.linkedin} className="text-blue-600"><div className="flex flex-row gap-1"> <LinkedinIcon/>Linkedin</div></Link>
                    <Link href={data.github} className="text-blue-600"><div className="flex flex-row gap-1"> <GithubIcon/>GitHub</div></Link>
                </div>
            </div>
        </Card>


    )
}