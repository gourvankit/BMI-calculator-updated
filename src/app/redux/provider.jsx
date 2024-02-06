"use client";
import { store } from "./store";
import { Provider } from "react-redux";
export function ReduxProvier({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
