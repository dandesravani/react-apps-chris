import React from 'react';
import './App.css';
import shuffle from 'lodash.shuffle';
// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon]);

export const PokemonCard = ({ pokemon, flipCard, index, isFlipped }) => {
  return (
    <button
      className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => {
        flipCard(index);
      }}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
};

export default function App() {
  const [opened, setOpened] = React.useState([]);
  const [matched, setMatched] = React.useState([]);
  const [moves, setMoves] = React.useState(0);

  React.useEffect(() => {
    if (opened.length < 2) {
      return;
    }
    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];
    if (firstPokemon.name === secondPokemon.name) {
      setMatched((matched) => [...matched, firstPokemon.id]);
    }
    2;
  }, [opened]);

  React.useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => setOpened([]), 800);
    }
  }, [opened]);

  React.useEffect(() => {
    if (matched.length === pokemon.length) alert('you won!');
  }, [matched]);

  const handleCard = (index) => {
    setOpened((opened) => [...opened, index]);
    console.log(opened);
    setMoves((moves) => moves + 1);
  };

  return (
    <div className="app">
      <p>moves:{moves}</p>
      <div className="cards">
        {doublePokemon.map((poke, index) => {
          let isFlipped = false;
          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(poke.id)) isFlipped = true;
          return (
            <PokemonCard
              pokemon={poke}
              key={index}
              index={index}
              flipCard={handleCard}
              isFlipped={isFlipped}
            />
          );
        })}
      </div>
    </div>
  );
}
