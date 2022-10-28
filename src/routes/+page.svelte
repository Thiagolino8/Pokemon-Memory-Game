<script lang="ts">
	import Card from '../components/Card.svelte'
	import { generateRandomPokemonNumbers } from '../lib/generatePokemons'
	import Victory from '../components/Victory.svelte'
	import { difficulty, screen, direction } from '../lib/store'
	import Menu from '../components/Menu.svelte'
	import { flip } from 'svelte/animate'
	import { SCREEN } from '$lib/gameStatus'

	const favicon = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
	$: pokemons = generateRandomPokemonNumbers($difficulty * 10)
	let pokemonList: number[] = []
	let lastGuess: number | null = null
	let lastCard: Card['card']
	let totalGuessed = 0
	let width: number
	let height: number
	let cards: { [index: number]: Card } = {}

	const distribute = (_node: HTMLElement, { event }: { event: number }) => {
		return {
			delay: 0,
			duration: 1000 * $difficulty,
			tick: (t: number) => {
				pokemonList = pokemons.slice(0, ~~(t * pokemons.length))
			},
			css: (t: number) => `transform: translate3d(0, ${(height / 2) * event * (1 - t * $direction)}px, 0)`,
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
									$screen = SCREEN.VICTORY
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
	$: cardWidth = width > 770 ? 128 : 60
	$: cardHeight = (cardWidth / 7) * 9
	$: padding = width > 770 ? 16 : 8
	$: totalInLine = ~~((width - padding * 2) / cardWidth)
	$: gapSize = width > 770 ? 16 : 8
	$: rows = pokemons.length % totalInLine === 0 ? pokemons.length / totalInLine : ~~(pokemons.length / totalInLine) + 1
	$: columns = pokemons.length % rows === 0 ? pokemons.length / rows : ~~(pokemons.length / rows) + 1
</script>

<svelte:head>
	<title>Memory Game</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="flex relative flex-wrap justify-center items-start w-screen overflow-x-hidden h-screen">
	{#if $screen === SCREEN.MENU}
		<Menu {height} />
	{:else if $screen === SCREEN.GAME}
		<div
			class="p-2 md:p-4 absolute min-h-screen place-content-center grid game gap-2 md:gap-4 flex-wrap place-contents-center place-items-center"
			style:--grid-cols={columns}
			style:--grid-rows={rows}
			style:--card-width={`${cardWidth - gapSize}px`}
			style:--card-height={`${cardHeight - gapSize}px`}
			in:distribute={{ event: 1 }}
			out:distribute={{ event: -1 }}
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
	{:else if $screen === SCREEN.VICTORY}
		<Victory {height} />
	{/if}
</div>

<style>
	.game {
		grid-template-columns: repeat(var(--grid-cols), var(--card-width));
		grid-template-rows: repeat(var(--grid-rows), var(--card-height));
	}
</style>
