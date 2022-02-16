const colors: any = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

function getTypeColor(color: string): string {
  return colors[color] || '#777'
}

function generateID(id: number): string {
  const str = id.toString()
  const zero = str.length < 4 ? '000' : '0'.repeat(str.length)
  return '#' + (zero + str).substring(str.length)
}

function capitalizeFirstLetter(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ')
}

export { getTypeColor, generateID, capitalizeFirstLetter }
