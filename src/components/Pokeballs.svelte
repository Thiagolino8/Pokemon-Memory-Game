<script lang="ts">
	import Pokeball from './Pokeball.svelte'

	const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
</script>

{#each Array(30) as _, i}
	<Pokeball
		--scale={random(2, 3.5) / 10}
		--offset="{i * random(8, 10)}%"
		--delay="{random(1000, 5000)}ms"
		--speed="{random(2, 4)}s"
	/>
{/each}
