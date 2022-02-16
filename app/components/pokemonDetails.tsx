import React, { useState, useEffect } from 'react'
import { Pokemon } from 'pokenode-ts'
import { getTypeColor, generateID, capitalizeFirstLetter } from '~/helpers'
import Json from '~/components/json.client'

export function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-x-4">
        <div className="h-16 w-16 sm:h-20 sm:w-20">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default ?? '/images/missing.png'}
            alt={pokemon.name}
            height={130}
            width={130}
            className="aspect-square h-full w-full object-contain"
          />
        </div>
        <div>
          <span className="text-sm font-medium italic text-gray-500">{generateID(pokemon.id)}</span>
          <h1 className="text-3xl font-bold sm:text-5xl">{capitalizeFirstLetter(pokemon.name)}</h1>
        </div>
      </div>

      <div>
        <div className="my-3">
          <ul className="flex gap-1.5">
            {pokemon.types.map((slot, index) => (
              <React.Fragment key={slot.type.name}>
                {index ? (
                  <span role="separator" className="leading-none text-gray-600">
                    &#183;
                  </span>
                ) : null}
                <PokemonType type={slot.type.name} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto py-4">
        <JsonViewer json={pokemon} />
      </div>
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

export default function JsonViewer({ json }: { json: any }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return <div>{mounted ? <Json json={json} /> : null}</div>
}
