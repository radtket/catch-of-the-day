import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import StorePicker from "./pages/StorePicker";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route component={StorePicker} exact path="/" />
          <Route component={Store} path="/store/:storeId" />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
