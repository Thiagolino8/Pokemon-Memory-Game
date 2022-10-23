<script lang="ts">
	import { fade } from 'svelte/transition'

	export let pokemon: number
	let comparativePokemon = pokemon

	export let guessed = false
	export let fliped = true

	$: if (comparativePokemon !== pokemon) {
		guessed = false
		fliped = true
	}

	export let card: HTMLElement | null = null
</script>

<svelte:options accessors/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="w-28 h-36 relative flex"
	class:clickable={!guessed}
	style:--pokemon={pokemon}
	on:click
	transition:fade
	on:outroend
>
	<div bind:this={card} class="frente" class:fliped={fliped} />
	<div class="verso" style:--direction={-1} class:fliped={!fliped}/>
</div>

<style>
	.clickable {
		@apply cursor-pointer;
	}

	.frente,
	.verso {
		@apply w-full h-full absolute flex items-center justify-center rounded-lg backface-hidden preserve-3d shadow-md bg-clip-padding shadow-blue-500 transition-transform duration-500;
	}

	.fliped {
		@apply transform-gpu;
	}

	.frente {
		@apply rotate-y-180;
		background: var(--pokemonImage) center no-repeat, var(--gradient-two);
		animation: gradient 15s ease infinite;
		background-size: contain, 400% 400%;
	}

	.verso {
		@apply -rotate-y-180;
		background: var(--pokeball-image), var(--gradient-one);
		background-size: contain, 400% 400%;
		animation: gradient 15s ease infinite;
	}

</style>
