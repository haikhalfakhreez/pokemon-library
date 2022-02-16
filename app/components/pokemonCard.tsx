import { Link } from 'remix'
import React from 'react'

import type { PokemonData } from '~/helpers/getPokemons'
import { getTypeColor, generateID, capitalizeFirstLetter } from '~/helpers'

export function PokemonCard({ pokemon }: { pokemon: PokemonData }) {
  return (
    <div className="border-1 rounded-md border-slate-100 bg-white p-4 shadow-md transition-transform hover:translate-y-[-3px]">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          height={130}
          width={130}
          className="aspect-square h-full w-full object-contain"
          loading="lazy"
        />
        <div>
          <div className="text-center">
            <span className="relative before:absolute before:inset-1 before:block before:translate-y-1 before:bg-yellow-200 before:[clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]">
              <span className="relative px-3 text-xs font-medium text-gray-500">{generateID(pokemon.id)}</span>
            </span>
          </div>
          <h3 className="text-md mt-2 font-semibold">{capitalizeFirstLetter(pokemon.name)}</h3>
          <div className="mt-3">
            <ul className="flex gap-1.5">
              {pokemon.type.map((type, index) => (
                <React.Fragment key={type}>
                  {index ? (
                    <span role="separator" className="leading-none text-gray-600">
                      &#183;
                    </span>
                  ) : null}
                  <PokemonType type={type} />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  )
}

function PokemonType({ type }: { type: string }) {
  return (
    <li className="text-xs" style={{ color: getTypeColor(type) }}>
      {capitalizeFirstLetter(type)}
    </li>
  )
}
