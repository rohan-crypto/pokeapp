import axios from "axios";
import { NextResponse } from "next/server";

const getRandomPokemon = async () => {
    try{
        //get data of 100 pokemon
        const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        return data;
    }
    catch(error){
        return error;
    }
}

export async function GET() {
    try{
        const pokemon = await getRandomPokemon();
        return NextResponse.json(pokemon.data);
    }
    catch(error){
        //if 500 code comes then error at our end i.e. client-side error
        return NextResponse.json(500,error);
    }
}