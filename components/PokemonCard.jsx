"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PokemonCard({pokemon, isCorrect}) {
    const [data, setData] = useState({});

    useEffect(() => {
        try{
            console.log(pokemon);
            const fetchData = async () => {
                if(!pokemon)//till the time pokemon is loading return nothing
                    return;
                const result = await axios.get(pokemon?.url);
                setData(result.data);
            };
            fetchData();
        }
        catch(error){
            console.log(error);
        }
    }, [pokemon]);
    
    return (
        <div className="card">
            <img src={data?.sprites?.front_default} alt='' 
                className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
                style={{marginTop:"50px"}}
            />
        </div>
    );
}