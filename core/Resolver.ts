import { IResolver } from "./interfaces/resolver.interface";
import { IStrategy } from "./interfaces/strategy.interface";

export class Resolver implements IResolver {
    public strategy!: IStrategy;

    resolve(graph: string, startNode?: number | string): string {
        if (!this.strategy) {
            throw new Error("Strategy not found");
        }
        return this.strategy.execute(graph, startNode);
    }

    setStrategy(strategy: IStrategy) {
        this.strategy = strategy;
    }
}