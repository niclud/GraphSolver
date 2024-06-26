"use client";
import { Form } from "@/components/form";
import { GraphvizComponent } from "@/components/graphviz";
import React, { useCallback } from "react";
import { Resolver } from "@/core/Resolver";
import { Button } from "@nextui-org/button";
import { PrimStrategyAlgorithm } from "@/core/PrimStrategyAlgorithm";
import { KruskalStrategyAlgorithm } from "@/core/KruskalStrategyAlgorithm";
import { DijkstraStrategyAlgorithm } from "@/core/DijkstraStrategyAlgorithm";
import { MaxFlowStrategyAlgorithm } from "@/core/MaxFlowStrategyAlgorithm";
import { useDisclosure } from "@nextui-org/modal";
import { ModalSelectInitAndEnd, StartAndEndNodes } from "@/components/modalSelectInitAndEnd";
import TableDots from "@/components/tableDots";
import { ModalShowMaxFlow } from "@/components/modalShowMaxFlow";

export type SelectOption = {
  label: string;
  key: string;
};

const options: SelectOption[] = [
  { label: "Grafo sin dirección", key: "graph" },
  { label: "Grafo dirigido", key: "digraph" },
];

const initialGraph = `graph{rankdir=LR;}`;

export default function Home() {
  // Estado
  const [dot, setDot] = React.useState<string>(initialGraph);
  const [dotResolver, setDotResolver] = React.useState<string>(initialGraph);
  const [graphType, setGraphType] = React.useState<string>("graph");
  const [algorithmSelected, setAlgorithmSelected] = React.useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isModalMaxFlowOpen, onOpen: onOpenMaxFlow, onOpenChange: onOpenChangeMaxFlow } = useDisclosure();
  const [maxFlow, setMaxFlow] = React.useState<string>('');

  // Funciones de Manejo de Grafo
  const onClickAddedGraph = useCallback((values: any) => {
    let newDot = `${dot.replace("}", "")}${constructNewDot(values, dot)}}`;
    setDot(newDot);
    console.log(dot);
    console.log(getNodesFromDot(dot));
  }, [dot]);

  const handleGraphType = (value: string) => {
    if (value !== graphType && value !== "") {
      setGraphType(value);
      setDot(updateGraphType(dot, value));
    }
  };

  const constructNewDot = (value: any, dot: string) => {
    const { origen, destino, peso } = value;
    return `${origen}${dot.includes("digraph") ? "->" : "--"}${destino}[label=${peso}];`;
  };

  const updateGraphType = (dot: string, graphType: string) => {
    let newDot = dot.includes("digraph") ? dot.replace(/digraph/g, graphType) : dot.replace(/graph/g, graphType);

    if (graphType === "digraph") {
      newDot = newDot.replace(/--/g, "->");
    } else if (graphType === "graph") {
      newDot = newDot.replace(/->/g, "--");
    }

    return newDot;
  };

  const handleSelectedAlgorithm = () => {
    if (algorithmSelected === 'dijkstra') {
      return handleClickDijkstraButtonModal;
    }
    if (algorithmSelected === 'maxFlow') {
      return handleClickMaxFlowButtonModal;
    }
    return null;
  };

  const handleClickDijkstraButtonModal = (startAndEndNode: StartAndEndNodes) => {
    let resolver: Resolver = new Resolver();
    let dijkstraAlgorithm: DijkstraStrategyAlgorithm = new DijkstraStrategyAlgorithm();
    resolver.setStrategy(dijkstraAlgorithm);
    let dotResolverByDijkstra = resolver.resolve(dot, startAndEndNode.start, startAndEndNode.end);
    console.log(dotResolverByDijkstra);
    setDotResolver(dotResolverByDijkstra);
  };

  const handleClickMaxFlowButtonModal = (startAndEndNode: StartAndEndNodes) => {
    let resolver: Resolver = new Resolver();
    let maxFlowAlgorithm: MaxFlowStrategyAlgorithm = new MaxFlowStrategyAlgorithm();
    resolver.setStrategy(maxFlowAlgorithm);
    let dotResolverByMaxFlow = resolver.resolve(dot, startAndEndNode.start, startAndEndNode.end);
    console.log(dotResolverByMaxFlow);
    setMaxFlow(dotResolverByMaxFlow);
    onOpenMaxFlow();
  };

  const getNodesFromDot = (dot: string) => {
    let directed = dot.includes("->");
    let lines = dot.split(";");
    let nodes: string[] = [];
    lines.forEach((line) => {
      let parts = directed ? line.split("->") : line.split("--");
      if (parts.length == 2) {
        let from = parts[0].trim();
        let to = parts[1].split("[")[0].trim();
        if (!nodes.includes(from)) nodes.push(from);
        if (!nodes.includes(to)) nodes.push(to);
      }
    });
    return nodes;
  };

  const deleteDot = (dotDelet: string) => {
    setDot(dot.replace(dotDelet, ""));
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-3 md:py-7">
      <div className="mb-10">
        <h1 className="text-5xl font-medium">GraphSolver</h1>
      </div>
      <div className="w-full h-max flex flex-col sm:flex-row items-center justify-center">
        <Form handleSubmit={onClickAddedGraph} handleGraphType={handleGraphType} options={options} />
      </div>
      <div className="w-full h-full border items-center justify-center grid place-content-center rounded-lg bg-white object-contain">
        <GraphvizComponent dot={dot} />
      </div>
      <div className="grid grid-flow-col max-w-lg text-center justify-center gap-5">
        {graphType === "graph" ? (
          <>
            <Button className="btn btn-primary" onClick={() => resolveGraph(PrimStrategyAlgorithm)}>
              Resolver por Prim
            </Button>
            <Button className="btn btn-primary" onClick={() => resolveGraph(KruskalStrategyAlgorithm)}>
              Resolver por Kruskal
            </Button>
          </>
        ) : (
          <>
            <Button className="btn btn-primary" onPress={() => setAlgorithmSelected('dijkstra')} onClick={onOpen}>
              Resolver por Dijkstra
            </Button>
            <Button className="btn btn-primary" onPress={() => setAlgorithmSelected('maxFlow')} onClick={onOpen}>
              Resolver por Flujo Máximo
            </Button>
          </>
        )}
      </div>
      <div className="w-full h-full border items-center justify-center grid place-content-center rounded-lg bg-white object-contain">
        <GraphvizComponent dot={dotResolver} />
      </div>
      <TableDots dots={dot} deleteDot={deleteDot} />
      <ModalSelectInitAndEnd
        handleClickResolver={handleSelectedAlgorithm()}
        nodes={getNodesFromDot(dot)}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
      <ModalShowMaxFlow isOpen={isModalMaxFlowOpen} onOpenChange={onOpenChangeMaxFlow} maxFlow={maxFlow} />
    </section>
  );

  function resolveGraph(Algorithm: any) {
    let resolver: Resolver = new Resolver();
    let algorithm = new Algorithm();
    resolver.setStrategy(algorithm);
    let dotResolverByAlgorithm = resolver.resolve(dot);
    setDotResolver(dotResolverByAlgorithm);
  }
}