import React from 'react'
import './Pokemon.css'

export default function PokemonCards ({pokemon}){
  return (
    <li key={pokemon.id} className="card">
    <div >
       <img className="image" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}/>
    </div>

    <h2 className="name">{pokemon.name}</h2>
    <p className="type">{pokemon.types.map((curType)=> curType.type.name) .slice(0,2).join(" , ")}</p>

    <div className="container">
        <p>Height:<br/>{pokemon.height}</p>
        <p>weight:<br/> {pokemon.weight}</p>
        <p>Speed:<br/> {pokemon.stats[5].base_stat}</p>
        <p>Experience:<br/> {pokemon.stats[1].base_stat}</p>
        <p>Attack:<br/> {pokemon.stats[1].base_stat}</p>
        <p>Abilities:<br/>{pokemon.abilities.map((abilityInfo)=> abilityInfo.ability.name).slice(0,1).join(",")}</p>
    </div>
    </li>
    )
    
}
