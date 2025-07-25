import ShoppingItem from "../models/ShoppingItem";

interface Action {
  type: string;
  payload: string | ShoppingItem[];
}

export type { Action };