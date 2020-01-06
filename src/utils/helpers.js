import { adjectives, nouns } from "./constants";

export const rando = arr => arr[Math.floor(Math.random() * arr.length)];

export const getFunName = () =>
  `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;

export const formatPrice = cents => {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
