<script lang="ts">
	import type { Writable } from 'svelte/store'
	import { flip } from 'svelte/animate'
	import Card from './Card.svelte'

	let lastGuess: { guessed: Writable<boolean>; fliped: Writable<boolean>; pokemon: number }[] = []

	const generateRandomPokemonNumbers = (size: number) => {
		const numbers = new Set<number>()
		while (numbers.size < size) {
			numbers.add(Math.floor(Math.random() * 898) + 1)
		}
		return [...numbers, ...numbers].sort(() => Math.random() - 0.5)
	}

	const guess = (guessed: Writable<boolean>, fliped: Writable<boolean>, pokemon: number) => {
		fliped.update((value) => !value)
		if (!lastGuess.length) {
			lastGuess = [{ guessed, fliped, pokemon }]
			return
		}
		if (lastGuess[0].pokemon === pokemon) {
			lastGuess[0].guessed.set(true)
			guessed.set(true)
		} else {
			const lastGuessFliped = lastGuess[0].fliped
			setTimeout(() => {
				fliped.update((value) => !value)
				lastGuessFliped.update((value) => !value)
			}, 1000)
		}
		lastGuess = []
	}

	const pokemons = generateRandomPokemonNumbers(20)
</script>

<svelte:head>
	<title>Memory Game</title>
	<link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" />
</svelte:head>

<div class="wrapper">
	{#each pokemons as pokemon, index (index)}
		<div animate:flip>
			<Card {pokemon} {guess} />
		</div>
	{/each}
</div>

<style global>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		height: 100vh;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		padding: 1rem;
		gap: 1rem;
	}
</style>
