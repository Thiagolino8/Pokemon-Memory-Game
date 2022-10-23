<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { Confetti } from 'svelte-confetti'
	import { fade, fly } from 'svelte/transition'
	import Card from '../components/Card.svelte'
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ pokemons } = data)

	const favicon = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'

	let confetti = false
	let showMenu = true
	let started = false
	let lastGuess: number | null = null
	let lastCard: HTMLElement | null = null
	let totalGuessed = 0
	let direction = 1
	let endGame = false
	let cards: { [index: number]: Card } = {}

	$: if (totalGuessed === pokemons.length / 2) resetGame()

	const resetGame = () => {
		lastCard &&
			lastCard.addEventListener(
				'transitionend',
				() =>
					setTimeout(() => {
						lastGuess = null
						totalGuessed = 0
						invalidateAll()
						confetti = true
						lastCard &&
							lastCard.addEventListener(
								'transitionend',
								() => {
									started = false
								},
								{ once: true }
							)
					}, 1000),
				{ once: true }
			)
	}

	const guess = (index: number) => {
		cards[index].fliped = !cards[index].fliped
		if (lastGuess === null) {
			lastGuess = index
			return
		}
		if (cards[lastGuess].pokemon === cards[index].pokemon && lastGuess !== index) {
			cards[lastGuess].guessed = true
			cards[index].guessed = true
			lastCard = cards[index].card!
			console.log(cards[index].card, lastCard)
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

<div class="flex flex-wrap justify-center items-center w-screen overflow-hidden h-screen gap-4">
	{#if showMenu}
		<div
			class="flex flex-col justify-center items-center w-screen h-screen cover"
			transition:fade
			on:outroend={() => (started = true)}
		>
			<p>Pokemon Memory Game</p>
			<button on:click={() => (showMenu = false)}> Start </button>
		</div>
	{/if}
	{#if started}
		{#each pokemons as pokemon, index (index)}
			<div
				class="flex justify-start items-start"
				on:introend={() => {
					direction = -1
				}}
				in:fly={{ y: 500 * direction }}
				out:fly={{ y: 500 * direction }}
			>
				<Card
					--pokemonImage={`url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
						pokemon + 1
					}.png)`}
					bind:this={cards[index]}
					on:outroend={() => (endGame = true)}
					{pokemon}
					on:click={() => guess(index)}
				/>
			</div>
		{/each}
	{/if}
	{#if endGame}
		<div
			class="w-screen h-screen flex flex-col flex-1 justify-center items-center hero cover"
			transition:fade
			on:outroend={() => (started = true)}
		>
			<p class="animate-bounce">You won the game, congratulations!</p>
			<p />
			<p>You can play again if you want.</p>
			<button
				on:click={() => {
					endGame = false
					confetti = false
				}}
			>
				Play Again
			</button>
		</div>
	{/if}
</div>

{#if confetti}
	<div class="fixed left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none top-[-50px]">
		<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration="5000" amount="200" fallDistance="100vh" />
		<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration="5000" amount="200" fallDistance="100vh" />
		<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration="5000" amount="200" fallDistance="100vh" />
	</div>
{/if}

<style>
	.cover {
		background: var(--gradient-one);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
	}
</style>
