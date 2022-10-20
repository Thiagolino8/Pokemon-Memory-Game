<script lang="ts">
	import { writable, type Writable } from 'svelte/store'
	import { fly } from 'svelte/transition'

	export let pokemon: number
	export let index: number
	export let guess: (guessed: Writable<boolean>, fliped: Writable<boolean>, pokemon: number, card: HTMLElement, index:number) => void
	let comparativePokemon = pokemon

	const guessed = writable(false)
	const fliped = writable(true)

	$: if (comparativePokemon !== pokemon) {
		$guessed = false
		$fliped = true
	}

	let card: HTMLElement
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="w-28 h-36 relative flex"
	class:clickable={!$guessed}
	style:--pokemon={pokemon}
	on:click={() => $guessed || guess(guessed, fliped, pokemon, card, index)}
	transition:fly={{ x: -500 }}
	on:outroend
>
	<div bind:this={card} class="frente" class:fliped={$fliped} />
	<div class="verso" style:--direction={-1} class:fliped={!$fliped}/>
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
		background: var(--pokemonImage) center no-repeat, linear-gradient(calc(-45deg * var(--pokemon, 1)), #23d5ab, #ee7752, #e73c7e, #23a6d5);
		animation: gradient 15s ease infinite;
		background-size: contain, 400% 400%;
	}

	.verso {
		background: url("https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg") center no-repeat, linear-gradient(calc(-45deg * var(--pokemon, 1)), #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: contain, 400% 400%;
		animation: gradient 15s ease infinite;
	}

	.fliped {
		transform: rotateY(calc(180deg * var(--direction, 1)));
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
