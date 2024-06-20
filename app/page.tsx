'use client';
import { Form, InputValue } from "@/components/form";
import { GraphvizComponent } from "@/components/graphviz";
import React, { useCallback } from "react";

export default function Home() {
  const [dot, setDot] = React.useState<string>('graph{}');
 

  const onClickAddedGraph = useCallback((values: any
  ) => {
    console.log(values);
    let newDot = contructNewDot(values); 
    console.log(newDot);
    setDot(dot + newDot);
    
  }, [])


  const contructNewDot = (value: any) => {
    const { origen, destino, peso } = value;
    return `${origen}--${destino}[label=${peso}];`;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
      <Form handleSubmit={onClickAddedGraph}/>
        
      </div>   

      <div className="w-full h-full border items-center justify-center grid place-content-center rounded-e-lg bg-white">
        <GraphvizComponent dot={dot}></GraphvizComponent>
        
      </div>
    </section>
  );
}
