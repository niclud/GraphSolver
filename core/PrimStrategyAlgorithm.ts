import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class PrimStrategyAlgorithm
  extends AbstractStrategyAlgorithm
  implements IStrategy
{
  execute(graphs: string): string {
    let g = this.dotToGraph(graphs);
   
    const weightFn = (e: graphlib.Edge) => g.edge(e);
    let mst = graphlib.alg.prim(g, weightFn);

    console.log(mst.edges()); 
    
    let dot = this.graphToDot(mst, g);

    return dot;
  }
}
