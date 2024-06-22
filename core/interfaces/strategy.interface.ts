export interface IStrategy {
    execute(graph: string): string;
}