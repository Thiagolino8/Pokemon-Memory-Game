import type { PageLoad } from './$types'

const generateRandomPokemonNumbers = (size: number) => {
	const numbers = new Set<number>()
	while (numbers.size < size) {
		numbers.add(Math.floor(Math.random() * 898) + 1)
	}
	return [...numbers, ...numbers].sort(() => Math.random() - 0.5)
}

export const load: PageLoad = async () => {
	const pokemons = generateRandomPokemonNumbers(20)
	return {pokemons}
}
