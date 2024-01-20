<script lang="ts">
	import { fly } from "svelte/transition";
	import { store } from "../utils/store.svelte";
	import { DIFFICULTY, SCREEN } from "../utils/gameStatus";
</script>

<div
	class="grid absolute top-0 left-0 h-full w-full place-content-center place-items-center cover"
	in:fly|global={{ y: `${100 * store.direction}vh`, duration: 1000 }}
	out:fly|global={{ y: `${100 * store.direction}vh`, duration: 1000 }}
>
	<p class="text-3xl font-bold md:text-6xl">Pokemon Memory Game</p>
	<p class="text-2xl font-bold md:text-5xl">Choose difficulty</p>
	<div
		class="grid grid-flow-col gap-1 items-center justify-center my-3 btn-group"
	>
		<button
			onclick={() => (store.difficulty = DIFFICULTY.EASY)}
			class="btn btn-primary"
			class:btn-active={store.difficulty === DIFFICULTY.EASY}
		>
			Easy
		</button>
		<button
			onclick={() => (store.difficulty = DIFFICULTY.MEDIUM)}
			class="btn btn-primary"
			class:btn-active={store.difficulty === DIFFICULTY.MEDIUM}
		>
			Normal
		</button>
		<button
			onclick={() => (store.difficulty = DIFFICULTY.HARD)}
			class="btn btn-primary"
			class:btn-active={store.difficulty === DIFFICULTY.HARD}
		>
			Hard
		</button>
	</div>
	<button
		class="backgroundButton btn"
		onclick={() => (store.screen = SCREEN.GAME)}
	>
		Start
	</button>
</div>
