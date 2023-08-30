"use client"//becoz we are using useState hook here
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios';
import PokemonCard from '@/components/PokemonCard';

export default function Home() {

  const [pokemon, setPokemon] = useState(null);
  //currentPokemon will store the pokemon which will be shown on screen
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [score, setScore] = useState(0);//to store the score of user
  const [guess, setGuess] = useState('');
  // this will decide whether to show the black image or coloured image
  const [isCorrect, setIsCorrect] = useState(false);

  const getPokemon = async () => {
    setLoading(true);

    try{
      const data = await axios.get("/api/pokemon")
      console.log(data);
      setPokemon(data.data);
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setIsError(true);
      setLoading(false);
    }
  }

  // we want this func to run in background whenever the page loads
  useEffect(() => {
    getPokemon()
  }, []);

  useEffect(() => {
    if(pokemon && !isError && !loading && pokemon.results){
      // get random index from results array
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!guess)
      return;
    if(guess.toLowerCase() == currentPokemon.name)
    {
      setScore(score+1);
      setGuess("");
      setIsCorrect(true);

      //for 2 sec it will show coloured image of pokemon
      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();//call next pokemon
      }, 2000);
    }
    else
    {
      setGuess("");
    }
  }

  if(loading)
  {
    const statusMessage = loading ? "Loading..." : "Error!";
    return (
      <main className="flex min-h-screen flex-col items-center justify-center 
        py-2 h-screen">
        <h1 className="text-6xl font-bold">{statusMessage}</h1>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {isError && (
        <div className="border bg-red-100 border-red-400 text-red-700
          px-4 py-3 rounded relative"
          role='alert'
        >
          <strong className="font-bold">Error!</strong>
          <spam className="block sm:inline">
            Something went wrong. Please try again.
          </spam>
        </div>
      )}

      <h1 className='text-4xl font-bold'>Who's that Pokemon?</h1>
      <h2 className='text-3xl font-bold'>Score: {score}</h2>
      <PokemonCard pokemon={currentPokemon} isCorrect={isCorrect} />
      
      <form className='w-full max-w-sm' onSubmit={handleSubmit}
      style={{marginTop:"2rem"}}>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input type="text" placeholder='Which Pokemon is this?'
            className='py-1 px-2 mr-3 appearance-none bg-transparent border-none
            w-full text-gray-700 leading-tight focus:outline-none'
            aria-label='Full name' onChange={(e) => setGuess(e.target.value)}
            value={guess}
          />
          <button className='border-4 flex-shrink-0 bg-teal-600 hover:bg-teal-700
            border-teal-600 hover:border-teal-700 text-sm text-white py-1 
            px-2 rounded'
            type='submit'
          >
            Submit
          </button>
          <button className='border-4 flex-shrink-0 border-transparent text-teal-500
            hover:text-teal-800 text-sm py-1 px-2 rounded'
            type='button'
            onClick={() => {
              setGuess("");
              getPokemon();//call another pokemon
            }}
          >
            Skip
          </button>
        </div>
      </form>

    </main>
  )
}
