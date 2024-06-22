import * as graphlib from "@dagrejs/graphlib";

export abstract class AbstractStrategyAlgorithm {
  dotToGraph(dot: string) {
    let directed = dot.includes("->");
    console.log(directed);
    const graph = new graphlib.Graph({ directed: directed });

    let lines = dot.split(";");
    lines.forEach((line, index) => {
      console.log(line);
      let parts = line.split("--");
      if (directed) {
        parts = line.split("->");
      }

      if (parts.length == 2) {
        let from = parts[0].trim();
        let to = parts[1].split("[")[0].trim();
        let weight = parseFloat(parts[1].split("label=")[1].split("]")[0]);
        console.log(from, to, weight);
        graph.setEdge(from, to, weight);
      }
    });
    return graph;
  }

  abstract execute(graphs: string): string;

  graphToDot(graph: graphlib.Graph, graphOriginal: graphlib.Graph): string {
    console.log(graph);
    let dot = "graph{rankdir=LR;";
    graph.edges().forEach((edge) => {
      let value = graphOriginal.edge(edge);
      console.log(edge, value);
      dot += `${edge.v} -- ${edge.w} [label=${value}];\n`;
    });
    dot += "}";
    return dot;
  }
}
