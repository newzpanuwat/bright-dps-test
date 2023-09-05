import { Pokemon } from "./pokemon";

export interface ApiResponse {
  results: Pokemon[] | PromiseLike<Pokemon[]>;
}
