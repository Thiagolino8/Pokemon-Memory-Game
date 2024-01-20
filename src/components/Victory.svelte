<script lang="ts">
	import { Confetti } from 'svelte-confetti'
	import { fly } from 'svelte/transition'
	import { SCREEN } from '../utils/gameStatus'
	import { store } from '../utils/store.svelte'
</script>

<div
	class="grid place-content-center place-items-center text-center cover gap-3"
	in:fly|global={{ y: `${-100 * store.direction}vh`, duration: 1000 }}
	out:fly|global={{ y: `${-100 * store.direction}vh`, duration: 1000 }}
>
	<p class="animate-bounce text-3xl md:text-6xl">You won the game, congratulations!</p>
	<p class="text-2xl md:text-5xl">You can play again if you want.</p>
	<button class="backgroundButton btn" type="button" onclick={() => (store.screen = SCREEN.GAME)}>Play Again</button>
	<button class="btn-primary btn" type="button" onclick={() => (store.screen = SCREEN.MENU)}>Change difficulty</button>
</div>

<div class="fixed left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none top-[-50px]">
	<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration={5000} amount={800} fallDistance="100vh" />
</div>
