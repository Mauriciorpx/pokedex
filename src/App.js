import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Config from "./components/Config";
import Pokedex from "./components/Pokedex";
import Pokemons from "./components/Pokemons";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserInput from "./components/UserInput";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserInput />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<Pokemons />} />
            <Route path="/config" element={<Config />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
