export const generateRandomPokemonNumbers = (size: number) => {
	const numbers = new Set<number>()
	while (numbers.size < size) {
		numbers.add(Math.floor(Math.random() * 898) + 1)
	}
	return shuffle([...numbers, ...numbers])
}

const shuffle = (array: number[]) => {
	array.forEach((_, i) => {
		const j = Math.floor(Math.random() * array.length)
		;[array[i], array[j]] = [array[j], array[i]]
	})

	return array
}
