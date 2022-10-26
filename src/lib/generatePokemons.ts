export const generateRandomPokemonNumbers = (size: number) => {
	const numbers = new Set<number>()
	while (numbers.size < size) {
		numbers.add(Math.floor(Math.random() * 898) + 1)
	}
	return shuffle([...numbers, ...numbers])
}

const shuffle = (array: number[]) => {
	return array.reduce((acc, _curr, index, array) => {
		const randomPosition = Math.floor((array.length - index) * Math.random())
		acc.push(array.at(randomPosition)!)
		array.splice(randomPosition, 1)
		return acc
	}, [] as number[])
}