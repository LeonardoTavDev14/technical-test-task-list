import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes/Index";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </>
  );
};

export default App;
