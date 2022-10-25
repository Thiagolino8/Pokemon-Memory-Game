<script lang="ts">
	import { screen } from '../lib/store'
	import { fade } from 'svelte/transition'
	import { Confetti } from 'svelte-confetti'

	let nextScreen: keyof typeof $screen
	let confetti = false
	$: if (nextScreen) {
		$screen.victory = false
	}
</script>

<div
	class="w-screen h-screen flex flex-col flex-1 justify-center items-center hero cover gap-3"
	transition:fade
	on:introstart={() => (confetti = true)}
	on:outrostart={() => (confetti = false)}
	on:outroend={() => ($screen[nextScreen] = true)}
>
	<p class="animate-bounce text-3xl md:text-6xl">You won the game, congratulations!</p>
	<p class="text-2xl md:text-5xl">You can play again if you want.</p>
	<button class="backgroundButton" type="button" on:click={() => (nextScreen = 'game')}> Play Again </button>
	<button class="btn-primary" type="button" on:click={() => (nextScreen = 'menu')}>Change difficulty</button>

	{#if confetti}
		<div class="fixed left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none top-[-50px]">
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[500, 2000]}
				infinite
				duration="5000"
				amount="800"
				fallDistance="100vh"
			/>
		</div>
	{/if}
</div>
