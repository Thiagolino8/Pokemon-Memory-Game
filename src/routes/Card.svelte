<script lang="ts">
	import { writable, type Writable } from 'svelte/store'

	export let pokemon: number
	export let guess: (guessed: Writable<boolean>, fliped: Writable<boolean>, pokemon: number) => void

	const guessed = writable(false)
	const fliped = writable(true)
	const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
		pokemon + 1
	}.png`
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card"
	class:clickable={!$guessed}
	style={`--pokemon: ${pokemon}`}
	on:click={() => $guessed || guess(guessed, fliped, pokemon)}
>
	<div class="frente" class:fliped={$fliped}>
		<img src={pokemonImage} alt={`pokemon-${pokemon + 1}`} />
	</div>
	<div class="verso" style="--direction: -1" class:fliped={!$fliped}>
		<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="pokeball" />
	</div>
</div>

<style>
	.clickable {
		cursor: pointer;
	}

	.card {
		width: 7rem;
		height: 9rem;
		position: relative;
		display: flex;
	}

	img {
		width: 95%;
		object-fit: cover;
	}

	.frente,
	.verso {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		transition: transform 0.5s;
		transform-style: preserve-3d;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
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
