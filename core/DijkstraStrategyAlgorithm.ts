import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class DijkstraStrategyAlgorithm extends AbstractStrategyAlgorithm implements IStrategy {
    execute(graphs: string, nodeStart: string | number): string {
        let g = this.dotToGraph(graphs);
        console.log('Grafo:', g);
        
        const weightFn = (e: graphlib.Edge) => g.edge(e);
        let dijkstra = graphlib.alg.dijkstra(g, String(nodeStart), weightFn);

        console.log('Árbol de Caminos Mínimos (Dijkstra):', dijkstra);
        console.log(JSON.stringify(dijkstra, null, 2));

        return JSON.stringify(dijkstra, null, 2);
    }
}