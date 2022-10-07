import React from "react";

export interface RouteObject {
  path: string;
  component: React.ReactElement;
  key: string;
}

export interface RouterContext {
  location: {
    pathname: string;
  };
  navigate: (to: string) => void;
}

const initialState: RouterContext = {
  location: {
    pathname: "",
  },
  navigate: () => {},
};

export const RouterContext = React.createContext<RouterContext>(initialState);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname
  );

  const onPopState = (event: PopStateEvent) => {
    setCurrentPath(window.location.pathname);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        location: {
          pathname: currentPath,
        },
        navigate: (path: string) => {
          setCurrentPath(path);
          window.history.pushState({}, "", path);
          const popStateEvent = new PopStateEvent("popstate", { state: path });
          dispatchEvent(popStateEvent);
        },
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}
