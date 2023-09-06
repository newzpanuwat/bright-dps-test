import { Pokemon } from "./pokemon";

export interface ApiResponse {
  count: number;
  results: Pokemon[] | PromiseLike<Pokemon[]>;
}
