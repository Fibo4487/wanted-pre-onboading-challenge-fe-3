import React from "react";
import { RouterContext } from "./context";

export function useRouter() {
  const context = React.useContext(RouterContext);

  if (context === undefined) {
    throw new Error("useRouter must be used within a Router");
  }

  const push = (path: string) => {
    context.navigate(path);
  };

  return { context, push };
}
