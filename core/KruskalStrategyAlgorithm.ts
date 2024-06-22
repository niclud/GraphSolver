import { AbstractStrategyAlgorithm } from "./AbstractStrategyAlgorithm";
import { IStrategy } from "./interfaces/strategy.interface";
import * as graphlib from "@dagrejs/graphlib";

export class KruskalStrategyAlgorithm
  extends AbstractStrategyAlgorithm
  implements IStrategy
{
  execute(graphs: string): string {
    let g = this.dotToGraph(graphs);
    const weightFn = (e: graphlib.Edge): number => {
      return g.edge(e);
    };

    const edges: graphlib.Edge[] = g
      .edges()
      .sort((a, b) => weightFn(a) - weightFn(b));

    const nodes = g.nodes() as string[];
    const uf = new UnionFind(nodes);

    const mst = new graphlib.Graph();

    edges.forEach((edge) => {
      const u = edge.v;
      const v = edge.w;
      if (uf.find(u) !== uf.find(v)) {
        mst.setEdge(u, v, weightFn(edge));
        uf.union(u, v);
      }
    });

    console.log(mst.edges()); 
    return this.graphToDot(mst, g);
  }
}

class UnionFind {
  private parent: Record<string, string>;
  private rank: Record<string, number>;

  constructor(elements: string[]) {
    this.parent = {};
    this.rank = {};
    elements.forEach((e) => {
      this.parent[e] = e;
      this.rank[e] = 0;
    });
  }

  find(e: string): string {
    if (this.parent[e] !== e) {
      this.parent[e] = this.find(this.parent[e]);
    }
    return this.parent[e];
  }

  union(e1: string, e2: string): void {
    const root1 = this.find(e1);
    const root2 = this.find(e2);

    if (root1 !== root2) {
      if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else {
        this.parent[root2] = root1;
        this.rank[root1]++;
      }
    }
  }
}
