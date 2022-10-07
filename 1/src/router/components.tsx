// import React from "react";
// import { Action, Location } from "./BrowserRouter";
// import parsePath from "../utils/parsePath";
// import stripBasename from "../utils/stripBasename";
// import {
//   Navigator,
//   NavigationContext,
//   LocationContext,
//   RouteObject,
// } from "./context";
// import { useRoutes } from "./hooks";

// interface RouterProps {
//   basename?: string;
//   children?: React.ReactNode;
//   location: Partial<Location> | string;
//   navigationType?: Action;
//   navigator: Navigator;
//   static?: boolean;
// }

// export function Router({
//   basename: basenameProp = "/",
//   children = null,
//   location: locationProp,
//   navigationType = Action.Pop,
//   navigator,
//   static: staticProp = false,
// }: RouterProps): React.ReactElement | null {
//   let basename = basenameProp.replace(/^\/*/, "/");
//   let navigationContext = React.useMemo(
//     () => ({ basename, navigator, static: staticProp }),
//     [basename, navigator, staticProp]
//   );

//   if (typeof locationProp === "string") {
//     locationProp = parsePath(locationProp);
//   }

//   let {
//     pathname = "/",
//     search = "",
//     hash = "",
//     state = null,
//     key = "default",
//   } = locationProp;

//   let location = React.useMemo(() => {
//     let trailingPathname = stripBasename(pathname, basename);

//     if (trailingPathname == null) {
//       return null;
//     }

//     return {
//       pathname: trailingPathname,
//       search,
//       hash,
//       state,
//       key,
//     };
//   }, [basename, pathname, search, hash, state, key]);

//   if (location == null) {
//     return null;
//   }

//   return (
//     <NavigationContext.Provider value={navigationContext}>
//       <LocationContext.Provider
//         children={children}
//         value={{ location, navigationType }}
//       />
//     </NavigationContext.Provider>
//   );
// }

// export interface RoutesProps {
//   children?: React.ReactNode;
//   location?: Partial<Location> | string;
// }

// /**
//  * A container for a nested tree of <Route> elements that renders the branch
//  * that best matches the current location.
//  *
//  * @see https://reactrouter.com/docs/en/v6/components/routes
//  */
// export function Routes({
//   children,
//   location,
// }: RoutesProps): React.ReactElement | null {
//   // If we have children, then we're in a descendant tree and we
//   // need to use child routes.
//   let routes = createRoutesFromChildren(children);
//   return useRoutes(routes, location);
// }

// export function createRoutesFromChildren(
//   children: React.ReactNode,
//   parentPath: number[] = []
// ): RouteObject[] {
//   let routes: RouteObject[] = [];

//   React.Children.forEach(children, (element, index) => {
//     if (!React.isValidElement(element)) {
//       // Ignore non-elements. This allows people to more easily inline
//       // conditionals in their route config.
//       return;
//     }

//     if (element.type === React.Fragment) {
//       // Transparently support React.Fragment and its children.
//       routes.push.apply(
//         routes,
//         createRoutesFromChildren(element.props.children, parentPath)
//       );
//       return;
//     }

//     let treePath = [...parentPath, index];
//     let route: RouteObject = {
//       id: element.props.id || treePath.join("-"),
//       caseSensitive: element.props.caseSensitive,
//       element: element.props.element,
//       index: element.props.index,
//       path: element.props.path,
//       loader: element.props.loader,
//       action: element.props.action,
//       errorElement: element.props.errorElement,
//       hasErrorBoundary: element.props.errorElement != null,
//       // shouldRevalidate: element.props.shouldRevalidate,
//       handle: element.props.handle,
//     };

//     if (element.props.children) {
//       route.children = createRoutesFromChildren(
//         element.props.children,
//         treePath
//       );
//     }

//     routes.push(route);
//   });

//   return routes;
// }

// export interface RouteProps {
//   children?: React.ReactNode;
//   element?: React.ReactNode;
//   errorElement?: React.ReactNode;
//   handle?: (error: Error) => void;
//   id?: string;
//   index?: boolean;
//   path?: string;
//   loader?: () => Promise<any>;
//   action?: (params: any) => void;
//   // shouldRevalidate?: (params: any) => boolean;
// }
