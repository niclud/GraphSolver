import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class DijkstraStrategyAlgorithm extends AbstractStrategyAlgorithm implements IStrategy {
    execute(graphs: string, nodeStart: string | number, nodeEnd: string | number): string {
        let g = this.dotToGraph(graphs);
        console.log('Grafo:', g);
        
        const weightFn = (e: graphlib.Edge) => g.edge(e);
        let dijkstra = graphlib.alg.dijkstra(g, String(nodeStart), weightFn);
        console.log('Árbol de Caminos Mínimos (Dijkstra):', dijkstra);

        let path = this.getPath(dijkstra, String(nodeStart), String(nodeEnd));
        console.log('Camino:', path);
        

        console.log('Árbol de Caminos Mínimos (Dijkstra):', dijkstra);
        console.log(JSON.stringify(dijkstra, null, 2));

        return this.djikstraResultToDot(path);
    }

    getPath(dijkstra: any, nodeStart: string, nodeEnd: string): any[] {
        let path = [];
        let currentNode = nodeEnd;

        if (dijkstra[currentNode]?.distance === null) {
            console.log('No hay camino');
            return []; // No hay camino
        }

        console.log(currentNode)
        console.log(dijkstra[currentNode])

        while (currentNode !== nodeStart) {
            if (!dijkstra[currentNode]?.predecessor) {
                console.log('No hay camino');
                return []; // No hay camino
            }
            path.unshift({
                nodo: currentNode, 
                distancia: dijkstra[currentNode]?.distance ?? null, 
                nodoAnterior: dijkstra[currentNode]?.predecessor ?? null
            });

            currentNode = dijkstra[currentNode].predecessor;
        }

        path.unshift(
            {nodo: nodeStart
            , distancia: 0
            , nodoAnterior: null
            });
        return path;
    }

    djikstraResultToDot(dijkstra: any ){
        let dot = 'digraph{rankdir=LR;';

        dijkstra.forEach((element: any, index: number) => {
            if (index === 0) {
                return;
            }
            let distancia = (element?.distancia ?? 0) - (dijkstra[index - 1]?.distancia ?? 0);
            dot  += `${element.nodoAnterior}->${element.nodo}[label=${distancia}];`;
        });

        return dot + '}';
    }
}