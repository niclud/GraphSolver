import { IStrategy } from "./strategy.interface";

export interface IResolver {
    resolve(graph: string, startNode?: number | string): string;

    setStrategy(strategy: IStrategy): void;
}