"use client";
import { Form } from "@/components/form";
import { GraphvizComponent } from "@/components/graphviz";
import React, { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Resolver } from "@/core/Resolver";
import { PrimStrategyAlgorithm } from "@/core/PrimStrategyAlgorithm";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DijkstraStrategyAlgorithm } from "@/core/DijkstraStrategyAlgorithm";
import { KruskalStrategyAlgorithm } from "@/core/KruskalStrategyAlgorithm";

export type SelectOption = {
  label: string;
  key: string;
};

const options: SelectOption[] = [
  { label: "Grafo sin dirección", key: "graph" },
  { label: "Grafo dirigido", key: "digraph" },
];

export default function Home() {
  const [dot, setDot] = React.useState<string>("graph{rankdir=LR;}");
  const [dotResolver, setDotResolver] =
    React.useState<string>("graph{rankdir=LR;}");
  const [graphType, setGraphType] = React.useState<string>("graph");

  const onClickAddedGraph = useCallback(
    (values: any) => {
      let newDot = `${dot.replace("}", "")}${contructNewDot(values, dot)}}`;
      setDot(newDot);
    },
    [dot]
  );

  const handleGraphType = (value: string) => {
    console.log(value);
    console.log(graphType);
    if (value !== graphType && value !== "") {
      setGraphType(value);

      // Reemplaza "graph" con "digraph" o viceversa
      let newDot = dot.includes("digraph")
        ? dot.replace(/digraph/g, value)
        : dot.replace(/graph/g, value);

      // Reemplaza todas las apariciones de "--" con "->" si cambiamos a "digraph"
      if (value === "digraph") {
        newDot = newDot.replace(/--/g, "->");
      }
      // Reemplaza todas las apariciones de "->" con "--" si cambiamos a "graph"
      else if (value === "graph") {
        newDot = newDot.replace(/->/g, "--");
      }

      setDot(newDot);
    }
  };

  const contructNewDot = (value: any, dot: string) => {
    const { origen, destino, peso } = value;
    return `${origen}${dot.includes("digraph") ? "->" : "--"}${destino}[label=${peso}];`;
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center w-full">
        <Select
          label="Seleccionar tipo de grafo"
          placeholder="Select an option"
          className="w-full"
          value={graphType}
          onChange={(e) => {
            handleGraphType(e.target.value);
            console.log(e.target.value);
          }}
        >
          {options.map((op) => (
            <SelectItem key={op.key}>{op.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="inline-block max-w-lg text-center justify-center">
        <Form handleSubmit={onClickAddedGraph} />
      </div>

      <div className="w-full h-full border items-center justify-center grid place-content-center rounded-lg bg-white object-contain">
        <GraphvizComponent dot={dot}></GraphvizComponent>
      </div>

      <div className="grid grid-flow-col max-w-lg text-center justify-center gap-5">
        {graphType === "graph" ? (
          <>
            <Button
              className="btn btn-primary"
              onClick={() => {
                let resolver: Resolver = new Resolver();
                let primAlgorithm: PrimStrategyAlgorithm =
                  new PrimStrategyAlgorithm();
                resolver.setStrategy(primAlgorithm);
                let dotResolverByPrim = resolver.resolve(dot);
                setDotResolver(dotResolverByPrim);
              }}
            >
              Resolver por Prim
            </Button>
            <Button
              className="btn btn-primary"
              onClick={() => {
                let resolver: Resolver = new Resolver();
                let kruskalStrategyAlgorithm: KruskalStrategyAlgorithm = new KruskalStrategyAlgorithm();
                resolver.setStrategy(kruskalStrategyAlgorithm);
                let dotResolverByPrim = resolver.resolve(dot);
                setDotResolver(dotResolverByPrim);
              }}
            >
              Resolver por Kruskal
            </Button>
          </>
        ) : (
          <Button
            className="btn btn-primary"
            disabled={true}
            onClick={() => {
              let resolver: Resolver = new Resolver();
              let djikstraAlgorithm: DijkstraStrategyAlgorithm =
                new DijkstraStrategyAlgorithm();
              resolver.setStrategy(djikstraAlgorithm);
              let dotResolverByDijkstra = resolver.resolve(dot, 1);
              setDotResolver(dotResolverByDijkstra);
            }}
          >
            Resolver por Dijkstra
          </Button>
        )}
      </div>
      <div className="w-full h-full border items-center justify-center grid place-content-center rounded-lg bg-white object-contain">
        <GraphvizComponent dot={dotResolver}></GraphvizComponent>
      </div>
    </section>
  );
}
