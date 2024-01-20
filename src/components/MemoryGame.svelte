<script lang="ts">
	import { store } from "../utils/store.svelte";
	import { generateRandomPokemonNumbers } from "../utils/generatePokemons";
	import Card from "./Card.svelte";
	import { SCREEN } from "../utils/gameStatus";

	let pokemons = $state(generateRandomPokemonNumbers(store.difficulty * 10));
	let pokemonList = $state<number[]>([]);
	let previousGuess = $state<number | null>();
	let lastCard: Card["card"];
	let totalGuessed = $state(0);
	let cards: { [index: number]: Card } = {};

	const distribute = (_node: HTMLElement) => ({
		delay: 0,
		duration: 1000 * store.difficulty,
		tick: (t: number) => {
			pokemonList = pokemons.slice(0, ~~(t * pokemons.length));
		},
	});

	$effect(() => {
		if (totalGuessed === pokemons.length / 2) resetGame();
	});

	const resetGame = () => {
		lastCard &&
			lastCard.addEventListener(
				"transitionend",
				() =>
					setTimeout(() => {
						previousGuess = null;
						totalGuessed = 0;
						pokemons = generateRandomPokemonNumbers(store.difficulty * 10);
						pokemonList = pokemons;
						lastCard &&
							lastCard.addEventListener(
								"transitionend",
								() => {
									store.screen = SCREEN.VICTORY;
								},
								{ once: true },
							);
					}, 1000),
				{ once: true },
			);
	};

	const guess = (index: number) => {
		const card = cards[index];
		if (!card) return;
		if (card.guessed) return;
		card.fliped = !card.fliped;
		if (typeof previousGuess !== "number") {
			previousGuess = index;
			return;
		}
		const previousGessCard = cards[previousGuess];
		if (!previousGessCard) return;
		if (previousGessCard.pokemon === card.pokemon && previousGuess !== index) {
			previousGessCard.guessed = true;
			card.guessed = true;
			lastCard = card.card;
			totalGuessed++;
		} else {
			const lastGuessFliped = previousGuess;
			setTimeout(() => {
				card.fliped = !card.fliped;
				const lastCardFliped = cards[lastGuessFliped];
				if (!lastCardFliped) return;
				lastCardFliped.fliped = !lastCardFliped.fliped;
			}, 1000);
		}
		previousGuess = null;
	};
</script>

<div
	class="p-4 min-h-screen h-max absolute place-content-center w-full grid grid-flow-row game gap-4"
	in:distribute|global
	out:distribute|global
>
	{#each { length: pokemons.length } as _, index}
		{@const pokemon = pokemonList[index]}
		<div>
			{#if pokemon}
				<Card bind:this={cards[index]} {pokemon} onclick={() => guess(index)} />
			{/if}
		</div>
	{/each}
</div>

<style>
	:root {
		--card-width: 4rem;
		--card-height: 5rem;
	}

	@media (min-width: 480px) {
		:root {
			--card-width: 7rem;
			--card-height: 9rem;
		}
	}

	.game {
		grid-template-columns: repeat(auto-fit, var(--card-width));
		grid-template-rows: repeat(auto-fit, var(--card-height));
	}
</style>
