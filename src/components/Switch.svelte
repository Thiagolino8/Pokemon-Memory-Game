<script lang="ts">
	import MemoryGame from "./MemoryGame.svelte";
	import Menu from "./Menu.svelte";
	import { store } from "../utils/store.svelte";
	import { SCREEN } from "../utils/gameStatus";
	import Victory from "./Victory.svelte";
	import Pokeballs from "./Pokeballs.svelte";
</script>

{#if store.screen === SCREEN.MENU}
	<Menu />
	<Pokeballs />
{:else if store.screen === SCREEN.GAME}
	<MemoryGame />
{:else if store.screen === SCREEN.VICTORY}
	<Victory />
{/if}
