import { useLoaderData } from 'remix'
import type { MetaFunction, LoaderFunction } from 'remix'
import { useState, useRef, useCallback } from 'react'

import Container from '~/components/container'
import Loading from '~/components/loading'
import { PokemonCard } from '~/components/pokemonCard'
import type { PokemonData, GetNewPokemonsData } from '~/helpers/getPokemons'
import { usePokemonList, getNewPokemons, INITIAL_OFFSET, PAGINATION_LIMIT } from '~/helpers/getPokemons'
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from '~/root'

export const meta: MetaFunction = () => ({
  title: WEBSITE_TITLE,
  description: WEBSITE_DESCRIPTION,
})

export const loader: LoaderFunction = async () => {
  const { count, data }: GetNewPokemonsData = await getNewPokemons(INITIAL_OFFSET, PAGINATION_LIMIT)
  return data
}

export default function Index() {
  const data = useLoaderData<PokemonData[]>()

  // Offset and limit for the next page
  const [offset, setOffset] = useState<number>(INITIAL_OFFSET)

  const { loading, error, pokemons, hasMore } = usePokemonList(offset)

  const observer = useRef<IntersectionObserver>()
  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + PAGINATION_LIMIT)
        }
      })
      if (node) observer?.current?.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <main>
      <Container>
        <div className="pb-10">
          <IndexHeader />

          <div className="bg-grid rounded-md border border-slate-200 p-6 shadow-inner" id="container">
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {pokemons.map((pokemon, index) => {
                if (pokemons.length === index + 1) {
                  return (
                    <li key={pokemon.name + index} className="pokemon" ref={lastPokemonRef}>
                      <PokemonCard pokemon={pokemon} />
                    </li>
                  )
                } else {
                  return (
                    <li key={pokemon.name + index} className="pokemon">
                      <PokemonCard pokemon={pokemon} />
                    </li>
                  )
                }
              })}
            </ul>
          </div>

          {!hasMore && <div className="py-10 text-center text-sm font-medium">- End of Result -</div>}
        </div>
      </Container>

      <Loading loading={loading} />
    </main>
  )
}

function IndexHeader() {
  return (
    <div className="py-10">
      <h1 className="mb-6 text-5xl font-bold">Pokémon Library</h1>

      <div>
        <p className="text-sm text-gray-500">
          Inspired by contributors around the world. Pokémon and Pokémon character names are trademarks of Nintendo.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          <a className="link font-semibold" href="https://remix.run/" target="_blank" rel="noopener noreferrer">
            Build with Remix 💿
          </a>{' '}
          with ❤️ by{' '}
          <a
            className="link font-semibold"
            href="https://haikhalfakhreez.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Haikhal Fakhreez
          </a>
        </p>
      </div>

      <div className="mt-2 h-6 w-6">
        <a href="https://github.com/haikhalfakhreez/pokemon-library" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/github.svg"
            alt="GitHub"
            height={20}
            width={20}
            className="aspect-square h-full w-full object-contain opacity-50 hover:opacity-100"
          />
        </a>
      </div>
    </div>
  )
}
