import { IStrategy } from "./strategy.interface";

export interface IResolver {
    resolve(graph: string): string;

    setStrategy(strategy: IStrategy): void;
}