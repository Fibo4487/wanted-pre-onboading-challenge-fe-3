// import React from "react";
// import { createPath } from "src/utils/createPath";
// import parsePath from "../utils/parsePath";
// import { Router } from "src/router/components";

// export enum Action {
//   Pop = "POP",
//   Push = "PUSH",
//   Replace = "REPLACE",
// }

// export interface Path {
//   pathname: string;
//   search: string;
//   hash: string;
// }

// export interface Location extends Path {
//   state: any;
//   key: string;
// }

// export type To = string | Partial<Path>;

// export interface History {
//   readonly action: Action;
//   readonly location: Location;
//   createHref(to: To): string;
//   push(to: To, state?: any): void;
//   replace(to: To, state?: any): void;
//   go(delta: number): void;
//   listen(listener: Listener): () => void;
// }

// export interface Update {
//   action: Action;
//   location: Location;
// }

// export interface Listener {
//   (update: Update): void;
// }

// interface HistoryState {
//   usr: any;
//   key: string | undefined;
// }
// const PopStateEventType = "popstate";

// interface BrowserRouterProps {
//   basename?: string;
//   children?: React.ReactNode;
//   window: Window;
// }

// // Location 객체
// function createLocation(
//   current: string | Location,
//   to: To,
//   state: any = null,
//   key?: string
// ) {
//   let location: Readonly<Location> = {
//     pathname: typeof current === "string" ? current : current.pathname,
//     search: "",
//     hash: "",
//     ...(typeof to === "string" ? parsePath(to) : to),
//     state,
//     key: key || Math.random().toString(36).substr(2, 6),
//   };

//   return location;
// }

// // history 객체 만들기
// const createBrowserHistory = ({ window }: { window: Window }) => {
//   function createBrowserLocation(
//     window: Window,
//     globalHistory: Window["history"]
//   ) {
//     let { pathname, search, hash } = window.location;
//     return createLocation(
//       "",
//       { pathname, search, hash },
//       // state defaults to `null` because `window.history.state` does
//       (globalHistory.state && globalHistory.state.usr) || null,
//       (globalHistory.state && globalHistory.state.key) || "default"
//     );
//   }

//   function createBrowserHref(window: Window, to: To) {
//     return typeof to === "string" ? to : createPath(to);
//   }

//   return getUrlBasedHistory(
//     createBrowserLocation,
//     createBrowserHref,
//     null,
//     window
//   );
// };

// function getHistoryState(location: Location): HistoryState {
//   return {
//     usr: location.state,
//     key: location.key,
//   };
// }

// export interface UrlHistory extends History {}

// function getUrlBasedHistory(
//   getLocation: (window: Window, globalHistory: Window["history"]) => Location,
//   createHref: (window: Window, to: To) => string,
//   validateLocation: ((location: Location, to: To) => void) | null,
//   window: Window
// ): UrlHistory {
//   let globalHistory = window.history;
//   let action = Action.Pop;
//   let listener: Listener | null = null;

//   function handlePop() {
//     action = Action.Pop;
//     if (listener) {
//       listener({ action, location: history.location });
//     }
//   }

//   function push(to: To, state?: any) {
//     action = Action.Push;
//     let location = createLocation(history.location, to, state);
//     if (validateLocation) validateLocation(location, to);

//     let historyState = getHistoryState(location);
//     let url = history.createHref(location);

//     try {
//       globalHistory.pushState(historyState, "", url);
//     } catch (error) {
//       window.location.assign(url);
//     }
//   }

//   function replace(to: To, state?: any) {
//     action = Action.Replace;
//     let location = createLocation(history.location, to, state);
//     if (validateLocation) validateLocation(location, to);

//     let historyState = getHistoryState(location);
//     let url = history.createHref(location);
//     globalHistory.replaceState(historyState, "", url);
//   }

//   let history: History = {
//     get action() {
//       return action;
//     },
//     get location() {
//       return getLocation(window, globalHistory);
//     },
//     listen(fn: Listener) {
//       if (listener) {
//         throw new Error("A history only accepts one active listener");
//       }
//       window.addEventListener(PopStateEventType, handlePop);
//       listener = fn;

//       return () => {
//         window.removeEventListener(PopStateEventType, handlePop);
//         listener = null;
//       };
//     },
//     createHref(to: To) {
//       return createHref(window, to);
//     },
//     push,
//     replace,
//     go(n) {
//       return globalHistory.go(n);
//     },
//   };

//   return history;
// }

// // BrowserRouter 만들기
// export function BrowserRouter({
//   basename,
//   children,
//   window,
// }: BrowserRouterProps) {
//   let historyRef = React.useRef<History>();

//   if (historyRef.current == null) {
//     historyRef.current = createBrowserHistory({ window });
//   }

//   let history = historyRef.current;
//   let [state, setState] = React.useState({
//     action: history.action,
//     location: history.location,
//   });

//   React.useLayoutEffect(() => {
//     return history.listen(setState);
//   }, [history]);

//   return (
//     <Router
//       basename={basename}
//       children={children}
//       navigationType={state.action}
//       location={state.location}
//       navigator={history}
//     />
//   );
// }
