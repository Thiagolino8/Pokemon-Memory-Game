<svelte:options accessors />

<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";
	import { fly } from "svelte/transition";

	let {
		pokemon,
		onclick,
		card,
		fliped = true,
		guessed = false,
	} = $props<{
		pokemon: number;
		onclick: MouseEventHandler<HTMLButtonElement>;
		card?: HTMLDivElement;
		fliped?: boolean;
		guessed?: boolean;
	}>();
	let comparativePokemon = pokemon;

	$effect(() => {
		if (comparativePokemon !== pokemon) {
			guessed = false;
			fliped = true;
		}
	});
</script>

<button
	class="relative grid h-[--card-height] w-[--card-width]"
	disabled={guessed}
	style:--pokemonImage="url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pokemon}.png)"
	{onclick}
	transition:fly|global={{ x: -200 }}
>
	<div bind:this={card} class="frente" class:fliped />
	<div class="verso" class:fliped={!fliped} />
</button>

<style>
	div {
		@apply absolute h-full w-full rounded-lg bg-clip-padding shadow-md shadow-blue-500 transition-transform duration-500;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.fliped {
		transform: rotate3d(0, 1, 0, var(--rotate, 180deg));
	}

	.frente {
		background:
			var(--pokemonImage) center no-repeat,
			var(--gradient-two);
		animation: gradient 15s ease infinite;
		background-size:
			contain,
			400% 400%;
	}

	.verso {
		--rotate: -180deg;
		background: var(--pokeball-image), var(--gradient-one);
		background-size:
			contain,
			400% 400%;
		animation: gradient 15s ease infinite;
	}
</style>
