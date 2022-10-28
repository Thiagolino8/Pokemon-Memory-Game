<script lang="ts">
	import { screen, direction } from '../lib/store'
	import { fly } from 'svelte/transition'
	import { Confetti } from 'svelte-confetti'
  import { SCREEN } from '$lib/gameStatus'

	export let height: number
</script>

<div
	class="w-screen absolute h-screen flex flex-col flex-1 justify-center items-center hero cover gap-3"
			in:fly={{y: height * $direction, duration: 1000}}
			out:fly={{y: -height * $direction, duration: 1000}}
>
	<p class="animate-bounce text-3xl md:text-6xl">You won the game, congratulations!</p>
	<p class="text-2xl md:text-5xl">You can play again if you want.</p>
	<button class="backgroundButton" type="button" on:click={() => ($screen = SCREEN.GAME)}> Play Again </button>
	<button class="btn-primary" type="button" on:click={() => ($screen = SCREEN.MENU)}>Change difficulty</button>

	<div class="fixed left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none top-[-50px]">
		<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration="5000" amount="800" fallDistance="100vh" />
	</div>
</div>
