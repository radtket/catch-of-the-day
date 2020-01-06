import { adjectives, nouns } from "./constants";

export const rando = arr => arr[Math.floor(Math.random() * arr.length)];

export const getFunName = () =>
  `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
