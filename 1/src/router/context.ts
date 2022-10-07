// import React from "react";
// import { History, To, Location } from "./BrowserRouter";
// import type { Action as NavigationType } from "./BrowserRouter";

// export interface Router {
//   history: History;
//   location: Location;
//   match: {
//     params: Record<string, string>;
//     isExact: boolean;
//     path: string;
//     url: string;
//   };
//   navigationType: NavigationType;
//   navigate: (to: To, options?: { replace?: boolean }) => void;
//   state: Record<string, unknown>;
// }

// export type Params<Key extends string = string> = {
//   readonly [key in Key]: string | undefined;
// };

// /**
//  * @private
//  * Arguments passed to route loader/action functions.  Same for now but we keep
//  * this as a private implementation detail in case they diverge in the future.
//  */
// interface DataFunctionArgs {
//   request: Request;
//   params: Params;
// }

// /**
//  * Arguments passed to loader functions
//  */
// export interface LoaderFunctionArgs extends DataFunctionArgs {}

// /**
//  * Arguments passed to action functions
//  */
// export interface ActionFunctionArgs extends DataFunctionArgs {}

// /**
//  * Route loader function signature
//  */
// export interface LoaderFunction {
//   (args: LoaderFunctionArgs): Promise<Response> | Response | Promise<any> | any;
// }

// /**
//  * Route action function signature
//  */
// export interface ActionFunction {
//   (args: ActionFunctionArgs): Promise<Response> | Response | Promise<any> | any;
// }

// type AgnosticBaseRouteObject = {
//   caseSensitive?: boolean;
//   path?: string;
//   id?: string;
//   loader?: LoaderFunction;
//   action?: ActionFunction;
//   hasErrorBoundary?: boolean;
//   // shouldRevalidate?: ShouldRevalidateFunction;
//   handle?: any;
// };

// /**
//  * A RouteMatch contains info about how a route matched a URL.
//  */
// export interface AgnosticRouteMatch<
//   ParamKey extends string = string,
//   RouteObjectType extends AgnosticRouteObject = AgnosticRouteObject
// > {
//   /**
//    * The names and values of dynamic parameters in the URL.
//    */
//   params: Params<ParamKey>;
//   /**
//    * The portion of the URL pathname that was matched.
//    */
//   pathname: string;
//   /**
//    * The portion of the URL pathname that was matched before child routes.
//    */
//   pathnameBase: string;
//   /**
//    * The route object that was used to match.
//    */
//   route: RouteObjectType;
// }

// /**
//  * Index routes must not have children
//  */
// export type AgnosticIndexRouteObject = AgnosticBaseRouteObject & {
//   children?: undefined;
//   index: true;
// };

// export type AgnosticRouteObject =
//   | AgnosticIndexRouteObject
//   | AgnosticNonIndexRouteObject;

// /**
//  * Non-index routes may have children, but cannot have index
//  */
// export type AgnosticNonIndexRouteObject = AgnosticBaseRouteObject & {
//   children?: AgnosticRouteObject[];
//   index?: false;
// };

// // Create react-specific types from the agnostic types in @remix-run/router to
// // export from react-router
// export interface IndexRouteObject {
//   caseSensitive?: AgnosticIndexRouteObject["caseSensitive"];
//   path?: AgnosticIndexRouteObject["path"];
//   id?: AgnosticIndexRouteObject["id"];
//   loader?: AgnosticIndexRouteObject["loader"];
//   action?: AgnosticIndexRouteObject["action"];
//   hasErrorBoundary?: AgnosticIndexRouteObject["hasErrorBoundary"];
//   // shouldRevalidate?: AgnosticIndexRouteObject["shouldRevalidate"];
//   handle?: AgnosticIndexRouteObject["handle"];
//   index: true;
//   children?: undefined;
//   element?: React.ReactNode | null;
//   errorElement?: React.ReactNode | null;
// }

// export interface NonIndexRouteObject {
//   caseSensitive?: AgnosticNonIndexRouteObject["caseSensitive"];
//   path?: AgnosticNonIndexRouteObject["path"];
//   id?: AgnosticNonIndexRouteObject["id"];
//   loader?: AgnosticNonIndexRouteObject["loader"];
//   action?: AgnosticNonIndexRouteObject["action"];
//   hasErrorBoundary?: AgnosticNonIndexRouteObject["hasErrorBoundary"];
//   // shouldRevalidate?: AgnosticNonIndexRouteObject["shouldRevalidate"];
//   handle?: AgnosticNonIndexRouteObject["handle"];
//   index?: false;
//   children?: RouteObject[];
//   element?: React.ReactNode | null;
//   errorElement?: React.ReactNode | null;
// }

// export type RouteObject = IndexRouteObject | NonIndexRouteObject;

// export type DataRouteObject = RouteObject & {
//   children?: DataRouteObject[];
//   id: string;
// };

// export interface RouteMatch<
//   ParamKey extends string = string,
//   RouteObjectType extends RouteObject = RouteObject
// > extends AgnosticRouteMatch<ParamKey, RouteObjectType> {}

// export interface DataRouteMatch extends RouteMatch<string, DataRouteObject> {}

// export type RelativeRoutingType = "route" | "path";

// export interface NavigateOptions {
//   replace?: boolean;
//   state?: any;
//   preventScrollReset?: boolean;
//   relative?: RelativeRoutingType;
// }

// export interface Navigator {
//   createHref: History["createHref"];
//   go: History["go"];
//   push(to: To, state?: any, opts?: NavigateOptions): void;
//   replace(to: To, state?: any, opts?: NavigateOptions): void;
// }

// interface NavigationContextObject {
//   basename: string;
//   navigator: Navigator;
//   static: boolean;
// }

// export const NavigationContext = React.createContext<NavigationContextObject>(
//   null!
// );

// interface LocationContextObject {
//   location: Location;
//   navigationType: NavigationType;
// }

// export const LocationContext = React.createContext<LocationContextObject>(
//   null!
// );

// export interface DataRouterContextObject extends NavigationContextObject {
//   router: Router;
// }

// export const DataRouterStateContext = React.createContext<
//   Router["state"] | null
// >(null);

// export const DataRouterContext =
//   React.createContext<DataRouterContextObject | null>(null);

// export interface RouteContextObject {
//   outlet: React.ReactElement | null;
//   matches: RouteMatch[];
// }

// export const RouteContext = React.createContext<RouteContextObject>({
//   outlet: null,
//   matches: [],
// });
