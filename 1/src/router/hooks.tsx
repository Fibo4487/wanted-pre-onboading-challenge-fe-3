// import React from "react";
// import parsePath from "src/utils/parsePath";
// import {
//   AgnosticRouteMatch,
//   AgnosticRouteObject,
//   LocationContext,
//   RouteContext,
//   RouteContextObject,
//   RouteMatch,
//   RouteObject,
//   Router,
// } from "./context";
// import { Action as NavigationType, Location } from "./BrowserRouter";
// import joinPaths from "src/utils/joinPaths";
// import stripBasename from "src/utils/stripBasename";

// /**
//  * Returns the element of the route that matched the current location, prepared
//  * with the correct context to render the remainder of the route tree. Route
//  * elements in the tree must render an <Outlet> to render their child route's
//  * element.
//  *
//  * @see https://reactrouter.com/docs/en/v6/hooks/use-routes
//  */
// // export function useRoutes(
// //   routes: RouteObject[],
// //   locationArg?: Partial<Location> | string
// // ): React.ReactElement | null {
// //   // invariant(
// //   //   useInRouterContext(),
// //   //   // TODO: This error is probably because they somehow have 2 versions of the
// //   //   // router loaded. We can help them understand how to avoid that.
// //   //   `useRoutes() may be used only in the context of a <Router> component.`
// //   // );

// //   // let dataRouterStateContext = React.useContext(DataRouterStateContext);
// //   let { matches: parentMatches } = React.useContext(RouteContext);
// //   let routeMatch = parentMatches[parentMatches.length - 1];
// //   let parentParams = routeMatch ? routeMatch.params : {};
// //   let parentPathname = routeMatch ? routeMatch.pathname : "/";
// //   let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
// //   let parentRoute = routeMatch && routeMatch.route;

// //   // if (__DEV__) {
// //   //   // You won't get a warning about 2 different <Routes> under a <Route>
// //   //   // without a trailing *, but this is a best-effort warning anyway since we
// //   //   // cannot even give the warning unless they land at the parent route.
// //   //   //
// //   //   // Example:
// //   //   //
// //   //   // <Routes>
// //   //   //   {/* This route path MUST end with /* because otherwise
// //   //   //       it will never match /blog/post/123 */}
// //   //   //   <Route path="blog" element={<Blog />} />
// //   //   //   <Route path="blog/feed" element={<BlogFeed />} />
// //   //   // </Routes>
// //   //   //
// //   //   // function Blog() {
// //   //   //   return (
// //   //   //     <Routes>
// //   //   //       <Route path="post/:id" element={<Post />} />
// //   //   //     </Routes>
// //   //   //   );
// //   //   // }
// //   //   let parentPath = (parentRoute && parentRoute.path) || "";
// //   //   warningOnce(
// //   //     parentPathname,
// //   //     !parentRoute || parentPath.endsWith("*"),
// //   //     `You rendered descendant <Routes> (or called \`useRoutes()\`) at ` +
// //   //       `"${parentPathname}" (under <Route path="${parentPath}">) but the ` +
// //   //       `parent route path has no trailing "*". This means if you navigate ` +
// //   //       `deeper, the parent won't match anymore and therefore the child ` +
// //   //       `routes will never render.\n\n` +
// //   //       `Please change the parent <Route path="${parentPath}"> to <Route ` +
// //   //       `path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
// //   //   );
// //   // }

// //   let locationFromContext = useLocation();

// //   let location;
// //   if (locationArg) {
// //     let parsedLocationArg =
// //       typeof locationArg === "string" ? parsePath(locationArg) : locationArg;

// //     // invariant(
// //     //   parentPathnameBase === "/" ||
// //     //     parsedLocationArg.pathname?.startsWith(parentPathnameBase),
// //     //   `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, ` +
// //     //     `the location pathname must begin with the portion of the URL pathname that was ` +
// //     //     `matched by all parent routes. The current pathname base is "${parentPathnameBase}" ` +
// //     //     `but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
// //     // );

// //     location = parsedLocationArg;
// //   } else {
// //     location = locationFromContext;
// //   }

// //   let pathname = location.pathname || "/";
// //   let remainingPathname =
// //     parentPathnameBase === "/"
// //       ? pathname
// //       : pathname.slice(parentPathnameBase.length) || "/";

// //   let matches = matchRoutes(routes, { pathname: remainingPathname });

// //   // if (__DEV__) {
// //   //   warning(
// //   //     parentRoute || matches != null,
// //   //     `No routes matched location "${location.pathname}${location.search}${location.hash}" `
// //   //   );

// //   //   warning(
// //   //     matches == null ||
// //   //       matches[matches.length - 1].route.element !== undefined,
// //   //     `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element. ` +
// //   //       `This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
// //   //   );
// //   // }

// //   let renderedMatches = _renderMatches(
// //     // matches &&
// //     //   matches.map(
// //     //     (match: { params: any; pathname: any; pathnameBase: string }) =>
// //     //       Object.assign({}, match, {
// //     //         params: Object.assign({}, parentParams, match.params),
// //     //         pathname: joinPaths([parentPathnameBase, match.pathname]),
// //     //         pathnameBase:
// //     //           match.pathnameBase === "/"
// //     //             ? parentPathnameBase
// //     //             : joinPaths([parentPathnameBase, match.pathnameBase]),
// //     //       })
// //     //   ),
// //     // parentMatches
// //     // dataRouterStateContext || undefined
// //     matches
// //   );

// //   // When a user passes in a `locationArg`, the associated routes need to
// //   // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
// //   // to use the scoped location instead of the global location.
// //   if (locationArg) {
// //     return (
// //       <LocationContext.Provider
// //         value={{
// //           location: {
// //             pathname: "/",
// //             search: "",
// //             hash: "",
// //             state: null,
// //             key: "default",
// //             ...location,
// //           },
// //           navigationType: NavigationType.Pop,
// //         }}
// //       >
// //         {renderedMatches}
// //       </LocationContext.Provider>
// //     );
// //   }

// //   return renderedMatches;
// // }

// // interface RenderedRouteProps {
// //   routeContext: RouteContextObject;
// //   match: RouteMatch<string, RouteObject>;
// //   children: React.ReactNode | null;
// // }

// // export function _renderMatches(
// //   matches: RouteMatch[] | null,
// //   parentMatches: RouteMatch[] = [],
// //   dataRouterState?: Router["state"]
// // ): React.ReactElement | null {
// //   // if (matches == null) {
// //   //   if (dataRouterState?.errors) {
// //   //     // Don't bail if we have data router errors so we can render them in the
// //   //     // boundary.  Use the pre-matched (or shimmed) matches
// //   //     matches = dataRouterState.matches as DataRouteMatch[];
// //   //   } else {
// //   //     return null;
// //   //   }
// //   // }

// //   if (matches == null) {
// //     return null;
// //   }

// //   let renderedMatches = matches;

// //   // If we have data errors, trim matches to the highest error boundary
// //   let errors = dataRouterState?.errors;
// //   // if (errors != null) {
// //   //   let errorIndex = renderedMatches.findIndex(
// //   //     (m) => m.route.id && errors?.[m.route.id]
// //   //   );
// //   //   invariant(
// //   //     errorIndex >= 0,
// //   //     `Could not find a matching route for the current errors: ${errors}`
// //   //   );
// //   //   renderedMatches = renderedMatches.slice(
// //   //     0,
// //   //     Math.min(renderedMatches.length, errorIndex + 1)
// //   //   );
// //   // }

// //   function RenderedRoute({
// //     routeContext,
// //     match,
// //     children,
// //   }: RenderedRouteProps) {
// //     // let dataStaticRouterContext = React.useContext(DataStaticRouterContext);

// //     // // Track how deep we got in our render pass to emulate SSR componentDidCatch
// //     // // in a DataStaticRouter
// //     // if (dataStaticRouterContext && match.route.errorElement) {
// //     //   dataStaticRouterContext._deepestRenderedBoundaryId = match.route.id;
// //     // }

// //     return (
// //       <RouteContext.Provider value={routeContext}>
// //         {children}
// //       </RouteContext.Provider>
// //     );
// //   }

// //   return renderedMatches.reduceRight((outlet, match, index) => {
// //     // let error = match.route.id ? errors?.[match.route.id] : null;
// //     // Only data routers handle errors
// //     // let errorElement = dataRouterState
// //     //   ? match.route.errorElement || <DefaultErrorElement />
// //     //   : null;
// //     let getChildren = () => (
// //       <RenderedRoute
// //         match={match}
// //         routeContext={{
// //           outlet,
// //           matches: parentMatches.concat(renderedMatches.slice(0, index + 1)),
// //         }}
// //       >
// //         {/* {error
// //           ? errorElement : */}
// //         {match.route.element !== undefined ? match.route.element : outlet}
// //       </RenderedRoute>
// //     );
// //     // Only wrap in an error boundary within data router usages when we have an
// //     // errorElement on this route.  Otherwise let it bubble up to an ancestor
// //     // errorElement
// //     // return dataRouterState && (match.route.errorElement || index === 0) ? (
// //     //   <RenderErrorBoundary
// //     //     location={dataRouterState.location}
// //     //     component={errorElement}
// //     //     error={error}
// //     //     children={getChildren()}
// //     //   />
// //     // ) : (
// //     return getChildren();
// //     // );
// //   }, null as React.ReactElement | null);
// // }

// function useLocation(): Location {
//   return React.useContext(LocationContext).location;
// }

// export function useRoutes(routes: RouteObject[], locationArg: Partial<Location>): React.ReactElement | null {
//   let location = useLocation();
//   let router = useRouter();
//   let matches = router.matchRoutes(routes, locationArg || location);
//   return _renderMatches(matches, [], router.state);
// }

// export function useRouter(): Router {
//   return React.useContext(RouterContext);
// }

// export function
