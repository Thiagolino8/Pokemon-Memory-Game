<script lang="ts">
	import { fade } from 'svelte/transition'
	import Card from '../components/Card.svelte'
	import { generateRandomPokemonNumbers } from '../lib/generatePokemons'
	import Victory from '../components/Victory.svelte'
	import { difficulty, screen } from '../lib/store'
	import Menu from '../components/Menu.svelte'
	import { flip } from 'svelte/animate'

	const favicon = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
	$: pokemons = generateRandomPokemonNumbers($difficulty * 10)
	let pokemonList: number[] = []
	let lastGuess: number | null = null
	let lastCard: Card['card']
	let totalGuessed = 0
	let showCards = false
	let cards: { [index: number]: Card } = {}

	const distribute = (_node: HTMLElement) => {
		return {
			delay: 0,
			duration: 1000 * $difficulty,
			tick: (t: number) => {
				pokemonList = pokemons.slice(0, t * pokemons.length)
			},
		}
	}

	$: if (totalGuessed === pokemons.length / 2) resetGame()

	const resetGame = () => {
		lastCard &&
			lastCard.addEventListener(
				'transitionend',
				() =>
					setTimeout(() => {
						lastGuess = null
						totalGuessed = 0
						pokemons = generateRandomPokemonNumbers($difficulty * 10)
						pokemonList = pokemons
						lastCard &&
							lastCard.addEventListener(
								'transitionend',
								() => {
									$screen.game = false
								},
								{ once: true }
							)
					}, 1000),
				{ once: true }
			)
	}

	const guess = (index: number) => {
		if (cards[index].guessed) return
		cards[index].fliped = !cards[index].fliped
		if (lastGuess === null) {
			lastGuess = index
			return
		}
		if (cards[lastGuess].pokemon === cards[index].pokemon && lastGuess !== index) {
			cards[lastGuess].guessed = true
			cards[index].guessed = true
			lastCard = cards[index].card
			totalGuessed++
		} else {
			const lastGuessFliped = lastGuess
			setTimeout(() => {
				cards[index].fliped = !cards[index].fliped
				cards[lastGuessFliped].fliped = !cards[lastGuessFliped].fliped
			}, 1000)
		}
		lastGuess = null
	}
</script>

<svelte:head>
	<title>Memory Game</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-wrap justify-center items-start w-screen overflow-x-hidden h-screen">
	{#if $screen.menu}
		<Menu />
	{/if}
	{#if $screen.game}
		<div
			class="p-3 flex w-screen justify-start items-start gap-4 flex-wrap"
			transition:distribute
			on:introend={() => (showCards = true)}
			on:outroend={() => ($screen.victory = true)}
		>
			{#each pokemonList as pokemon, index (index)}
				<div animate:flip>
					<Card
						--pokemonImage={`url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png)`}
						bind:this={cards[index]}
						{pokemon}
						on:click={() => guess(index)}
					/>
				</div>
			{/each}
		</div>
	{/if}
	{#if $screen.victory}
		<Victory />
	{/if}
</div>
