export interface IStrategy {
    execute(graph: string, nodeStart?: number | string): string;
}