import React, { useEffect } from 'react'
import './Pokemon.css'
import { useState } from 'react'
import PokemonCards from './PokemonCards.jsx';

export default function PokemonApi() {

    const [pokemonData, setPokemonData] = React.useState([]);
    const [searchPokemon, setSearchPokemon] = useState("");
    const [loading, setLoading] = useState(true);
    const [error,setError]= useState(null);
  
  const API="https://pokeapi.co/api/v2/pokemon?limit=200";

  const fetchPokemon = async()=>{
   try {
    const res = await fetch(API);
    const data = await res.json();

    const detailedPokemonData = data.results.map(async(curPokemon)=>{
        const res = await fetch(curPokemon.url); 
        const data = await res.json();
        return data;
    })

    const detailedResponse = await Promise.all(detailedPokemonData);
    setPokemonData(detailedResponse);
    console.log("Pokemon Data : ",pokemonData);
    setLoading(false);
   } 
   catch (error) {
    console.log("Error while fetching the data" + error);
     setLoading(false);
     setError(error);
   }
  }

  useEffect(()=>{
    fetchPokemon();
  },[searchPokemon])

   if(loading){
    return (
        <h1>Loading...</h1>
    )
   }

   if(error){
     return (
        <h1>{error.message}</h1>
    )
   }


  const searchData = pokemonData.filter((curPokemon)=>{
    return curPokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
  })

  

  return (
    <>
    <h1 className="heading">Let's Catch Pokemon</h1>
    <input className="inputbox" type="text" placeholder="Enter Pokemon Name" id="pokemonInput" value={searchPokemon} onChange={(e)=> setSearchPokemon(e.target.value)}></input>
    <ul className="list">
        {searchData.map((curPokemon)=>{
            console.log("cur Pokemon : ",curPokemon);
            return <PokemonCards key={curPokemon.id} pokemon={curPokemon} />
        })}
    </ul>
    </>
  )
}
