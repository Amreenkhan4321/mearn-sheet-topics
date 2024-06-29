import "./App.css";

import Routers from "./router/Routers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routers />

      <ToastContainer />
    </div>
  );
}

export default App;
