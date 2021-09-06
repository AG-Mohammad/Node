import React from "react";
import RecipeList from "./RecipeList";
import '../css/app.css'

function App() {

  return (
    <>
    <RecipeList recipes={sampleRecipe}/>
    </>
  )

}

const sampleRecipe = [
  {
    id: 1,
    name: "Dish 1",
    serving: "11",
    cookTime: "12",
    instruction : "#1 Stuffs \n#2 other stuffs",
    ingredients:[
      {
      id: 1,
      name: "Things",
      amount: "1tbs"
    },
    {
      id: 2,
      name: "OTher Things",
      amount: "12tbs"
    }]
  },
  {
    id: 2,
    name: "Dish 11",
    serving: "111",
    cookTime: "1212",
    instruction : "#1 (123)\n#2 (456)",
    ingredients:[
      {
      id: 1,
      name: "Things",
      amount: "1tbs"
    },
    {
      id: 2,
      name: "OTher Things",
      amount: "12tbs"
    }]
  },

]
export default App;
