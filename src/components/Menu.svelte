<script lang="ts">
  import { fade } from "svelte/transition"

  import { difficulty, screen } from '../lib/store'

  import { DIFFICULTY } from "../lib/gameStatus"
  import Pokeballs from "./Pokeballs.svelte"

</script>

		<div
			class="flex flex-col justify-center items-center w-screen h-screen cover"
			transition:fade
			on:outroend={() => ($screen.game = true)}
		>
			<p class="text-3xl md:text-6xl">Pokemon Memory Game</p>
			<p class="text-2xl md:text-5xl">Choose difficulty</p>
			<div class="flex items-center justify-center my-3 btn-group">
				<button
					type="button"
					on:click={() => ($difficulty = DIFFICULTY.EASY)}
					class={`btn ${$difficulty === DIFFICULTY.EASY ? 'btn-active' : ''}`}>Easy</button
				>
				<button
					type="button"
					on:click={() => ($difficulty = DIFFICULTY.MEDIUM)}
					class={`btn ${$difficulty === DIFFICULTY.MEDIUM ? 'btn-active' : ''}`}>Normal</button
				>
				<button
					type="button"
					on:click={() => ($difficulty = DIFFICULTY.HARD)}
					class={`btn ${$difficulty === DIFFICULTY.HARD ? 'btn-active' : ''}`}>Hard</button
				>
			</div>
			<button class="backgroundButton" on:click={() => ($screen.menu = false)}> Start </button>
			<Pokeballs />
		</div>