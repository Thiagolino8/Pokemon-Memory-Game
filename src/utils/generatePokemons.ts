export const generateRandomPokemonNumbers = (size: number) => {
	const numbers = new Set<number>()
	while (numbers.size < size) {
		numbers.add(Math.floor(Math.random() * 898) + 1)
	}
	return shuffle([...numbers, ...numbers])
}

const shuffle = <T>(array: T[]) =>
	array
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
