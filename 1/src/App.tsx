import React from "react";
import About from "./components/About";
import Root from "./components/Root";
import { Router, Route } from "./myRouter/components";

function App() {
  return (
    <Router>
      <Route path="/" component={<Root />} />
      <Route path="/about" component={<About />} />
    </Router>
  );
}

export default App;
