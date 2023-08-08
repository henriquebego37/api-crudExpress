import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card/card";
import { apiGames } from "./services/api";

function App() {
  const [listGames, setListGames] = useState([]);
  useEffect(() => {
    apiGames.get("/getGames").then((response) => {
      setListGames(response.data);
    });
  }, []);

  const [idGames, setIdGames] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit() {
    apiGames
      .post("/register", {
        idGames: idGames,
        name: name,
        cost: cost,
        category: category,
      })
      .then((response) => {
        console.log(response.data);
      });
    console.log("idGames:", idGames);
    console.log("name:", name);
    console.log("preço:", cost);
    console.log("categoria:", category);
  }

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="cost"
          placeholder="Preço"
          className="register-input"
          onChange={(e) => setCost(e.target.value)}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          className="register-input"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          className="register-button"
          type="submit"
          onClick={handleSubmit}
        >
          Cadastrar
        </button>
      </div>

      {listGames.map((e) => {
        return (
          <Card
            key={e.idgames}
            listCard={listGames}
            setListCard={setListGames}
            idgames={e.idgames}
            name={e.name}
            cost={e.cost}
            category={e.category}
          />
        );
      })}
    </div>
  );
}

export default App;
