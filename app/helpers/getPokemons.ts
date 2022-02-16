import { useEffect, useState } from 'react'
import { PokemonClient, NamedAPIResourceList, Pokemon } from 'pokenode-ts'

export const INITIAL_OFFSET = 0
export const PAGINATION_LIMIT = 20

export type PokemonData = {
  id: number
  name: string
  url: string
  image: string
  type: string[]
}

export type GetNewPokemonsData = {
  data: PokemonData[]
  count: number
}

export function usePokemonList(offset: number) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [pokemons, setPokemons] = useState<PokemonData[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    ;(async () => {
      try {
        const { count, data }: GetNewPokemonsData = await getNewPokemons(offset, PAGINATION_LIMIT)

        setPokemons((prevPokemons) => {
          return [...new Set([...prevPokemons, ...data])]
        })

        setHasMore(offset + data.length < count)
        setLoading(false)
      } catch {
        setError(true)
      }
    })()
  }, [offset])

  return { loading, error, pokemons, hasMore }
}

export async function getNewPokemons(offset: number = 0, limit: number = 20) {
  const api = new PokemonClient()
  const listPokemons: NamedAPIResourceList = await api.listPokemons(offset, limit)
  const count: number = listPokemons.count
  const data: PokemonData[] = []
  await Promise.all(
    listPokemons.results.map(async ({ name, url }) => {
      const pokemon: Pokemon = await api.getPokemonByName(name)
      data.push({
        id: pokemon.id,
        name,
        url,
        image: pokemon.sprites.other['official-artwork'].front_default ?? '/images/missing.png',
        type: pokemon.types.map(({ type }) => type.name),
      })
    })
  )

  // Sort based on id
  data.sort((a, b) => a.id - b.id)

  return {
    count,
    data,
  }
}
