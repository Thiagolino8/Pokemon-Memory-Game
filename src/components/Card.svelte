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
		@apply w-full h-full absolute flex items-center justify-center rounded-lg;
		backface-visibility: hidden;
		transition: transform 0.5s;
		transform-style: preserve-3d;
		background-clip: padding-box;
		box-shadow: #23a6d5 0 0.5rem 1rem -0.5rem;
	}

	.frente {
		background: var(--pokemonImage) center no-repeat, var(--gradient-two);
		animation: gradient 15s ease infinite;
		background-size: contain, 400% 400%;
	}

	.verso {
		background: url("https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg") center no-repeat, var(--gradient-one);
		background-size: contain, 400% 400%;
		animation: gradient 15s ease infinite;
	}

	.fliped {
		transform: rotateY(calc(180deg * var(--direction, 1)));
	}
</style>
