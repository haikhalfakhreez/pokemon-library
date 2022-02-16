import type { LoaderFunction, MetaFunction } from 'remix'
import { Link, useLoaderData } from 'remix'

import { PokemonClient, Pokemon } from 'pokenode-ts'

import Container from '~/components/container'
import { PokemonDetails } from '~/components/pokemonDetails.tsx'
import { capitalizeFirstLetter } from '~/helpers'

export const meta: MetaFunction = ({ data }: { data: any | undefined }) => {
  if (!data) {
    return {
      title: 'No pokemon',
      description: 'No pokemon found',
    }
  }

  const pokemonName = capitalizeFirstLetter(data.name)

  return {
    title: pokemonName,
    description: `Details about ${pokemonName}`,
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const api = new PokemonClient()
  const id: number = parseInt(params.pokemonId!)
  if (isNaN(id)) throw new Error('Wrong ID')

  const pokemon: Pokemon = await api.getPokemonById(id)
  if (!pokemon) throw new Error('Pokemon not found')

  return pokemon
}

export default function JokeRoute() {
  const pokemon = useLoaderData<Pokemon>()

  return (
    <main>
      <Container>
        <div className="py-20">
          <div className="mb-4">
            <Link to="/">
              <span className="link text-sm text-gray-500">&#8592; Back</span>
            </Link>
          </div>
          <PokemonDetails pokemon={pokemon} />
        </div>
      </Container>
    </main>
  )
}
