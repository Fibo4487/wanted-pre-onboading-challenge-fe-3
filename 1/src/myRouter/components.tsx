import React from "react";
import { useRouter } from "../myRouter/hooks";
import { RouteObject } from "./context";

interface RouterProps {
  children: React.ReactNode;
}

function setId(index: number) {
  return `route-${index}`;
}

export function Router({ children }: RouterProps) {
  const { context } = useRouter();
  const { location } = context;
  const childrenArray = React.Children.toArray(children);
  const routes: RouteObject[] = childrenArray.map((child, index) => {
    if (!React.isValidElement(child)) {
      return {
        key: setId(index),
        component: null,
        path: "",
      };
    }
    const { path, component } = child.props;
    return {
      path,
      component: component,
      key: setId(index),
    };
  });

  const route = routes.find((route) => route.path === location.pathname);

  return route ? React.cloneElement(route.component, { key: route.key }) : null;
}

interface RouteProps {
  path: string;
  component: React.ReactNode;
  children?: React.ReactNode;
}

export function Route({ path, component, children }: RouteProps) {
  return <>{component}</>;
}
