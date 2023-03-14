import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import BillDashboard from "./components/BillDashboard";

function App() {
  return (
    <Provider store={store}>
      <BillDashboard />
    </Provider>
  );
}

export default App;
