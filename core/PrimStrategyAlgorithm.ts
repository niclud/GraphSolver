import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class PrimStrategyAlgorithm
  extends AbstractStrategyAlgorithm
  implements IStrategy
{
  execute(graphs: string): string {
    let g = this.dotToGraph(graphs);
    console.log('Grafo:', g);
    
    let mst = graphlib.alg.prim(g, (e: graphlib.Edge) => 0);
    
    let dot = this.graphToDot(mst, g);

    console.log('Árbol de Expansión Mínima (Prim):', mst);
    console.log(JSON.stringify(mst, null, 2));

    return dot;
  }
}
