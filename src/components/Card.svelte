<script lang="ts">
	import { writable, type Writable } from 'svelte/store'
	import { fly } from 'svelte/transition'

	export let pokemon: number
	export let guess: (guessed: Writable<boolean>, fliped: Writable<boolean>, pokemon: number, card: HTMLElement) => void
	let comparativePokemon = pokemon

	const guessed = writable(false)
	const fliped = writable(true)
	$: pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
		pokemon + 1
	}.png`

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
	on:click={() => $guessed || guess(guessed, fliped, pokemon, card)}
	transition:fly={{ x: -500 }}
	on:outroend
>
	<div bind:this={card} class="frente" class:fliped={$fliped}>
		<img src={pokemonImage} alt={`pokemon-${pokemon + 1}`} />
	</div>
	<div class="verso" style:--direction={-1} class:fliped={!$fliped}>
		<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="pokeball" />
	</div>
</div>

<style>
	.clickable {
		@apply cursor-pointer;
	}

	img {
		@apply w-11/12 object-cover;
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
		background: linear-gradient(calc(-45deg * var(--pokemon, 1)), #23d5ab, #ee7752, #e73c7e, #23a6d5);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
	}

	.verso {
		background: linear-gradient(calc(-45deg * var(--pokemon, 1)), #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
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
