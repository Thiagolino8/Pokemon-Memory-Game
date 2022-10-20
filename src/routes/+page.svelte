<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import type { Writable } from 'svelte/store'
	import { fly } from 'svelte/transition'
	import Card from '../components/Card.svelte'
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ pokemons } = data)

	const favicon = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'

	let showMenu = true
	let started = false
	let lastGuess: { guessed: Writable<boolean>; fliped: Writable<boolean>; pokemon: number }[] = []
	let lastCard: HTMLElement
	let totalGuessed = 0

	$: if (totalGuessed === pokemons.length / 2) resetGame()

	const resetGame = () => {
		lastCard.addEventListener(
			'transitionend',
			() =>
				setTimeout(() => {
					lastGuess = []
					totalGuessed = 0
					invalidateAll()
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

	const guess = (guessed: Writable<boolean>, fliped: Writable<boolean>, pokemon: number, card: HTMLElement) => {
		fliped.update((value) => !value)
		if (!lastGuess.length) {
			lastGuess = [{ guessed, fliped, pokemon }]
			return
		}
		if (lastGuess[0].pokemon === pokemon) {
			lastGuess[0].guessed.set(true)
			guessed.set(true)
			lastCard = card
			totalGuessed++
		} else {
			const lastGuessFliped = lastGuess[0].fliped
			setTimeout(() => {
				fliped.update((value) => !value)
				lastGuessFliped.update((value) => !value)
			}, 1000)
		}
		lastGuess = []
	}
</script>

<svelte:head>
	<title>Memory Game</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-row flex-wrap justify-center items-start w-screen overflow-hidden h-screen p-4 gap-4">
	{#if showMenu}
		<button
			on:outroend={() => (started = true)}
			on:click={() => (showMenu = false)}
			transition:fly={{ x: 500 }}
			class="self-center justify-self-center btn btn-primary"
		>
			Start
		</button>
	{/if}
	{#if started}
		{#each pokemons as pokemon, index (index)}
			<Card on:outroend={() => (showMenu = true)} {pokemon} {guess} />
		{/each}
	{/if}
</div>
