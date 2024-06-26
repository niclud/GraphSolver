import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class MaxFlowStrategyAlgorithm extends AbstractStrategyAlgorithm implements IStrategy {
    execute(graphs: string, nodeStart: string | number, nodeEnd: string | number): string {
        let g = this.dotToGraph(graphs);

        let maxFlow = this.fordFulkerson(g, String(nodeStart), String(nodeEnd));
        
        return `${maxFlow}`;
    }

    fordFulkerson(graph: graphlib.Graph, source: string, sink: string): number {
        let residualGraph = new graphlib.Graph({ directed: true });

        graph.edges().forEach(edge => {
            residualGraph.setEdge(edge.v, edge.w, graph.edge(edge));
            if (!residualGraph.hasEdge(edge.w, edge.v)) {
                residualGraph.setEdge(edge.w, edge.v, 0);
            }
        });

        let maxFlow = 0;
        let parent: Record<string, string | null> = {};

        while (this.bfs(residualGraph, source, sink, parent)) {
            let pathFlow = Infinity;
            for (let v = sink; v !== source; v = parent[v]!) {
                let u = parent[v]!;
                pathFlow = Math.min(pathFlow, residualGraph.edge(u, v));
            }

            for (let v = sink; v !== source; v = parent[v]!) {
                let u = parent[v]!;
                residualGraph.setEdge(u, v, residualGraph.edge(u, v) - pathFlow);
                residualGraph.setEdge(v, u, residualGraph.edge(v, u) + pathFlow);
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    }

    bfs(graph: graphlib.Graph, source: string, sink: string, parent: Record<string, string | null>): boolean {
        let visited: Record<string, boolean> = {};
        let queue: string[] = [];

        queue.push(source);
        visited[source] = true;
        parent[source] = null;

        while (queue.length > 0) {
            let u = queue.shift()!;
            
            for (let edge of graph.outEdges(u)!) {
                let v = edge.w;
                if (!visited[v] && graph.edge(u, v) > 0) {
                    queue.push(v);
                    visited[v] = true;
                    parent[v] = u;

                    if (v === sink) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}