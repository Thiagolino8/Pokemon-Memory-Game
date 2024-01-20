<script lang="ts">
	import { scale } from "svelte/transition";

	const random = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1) + min);
</script>

{#each { length: 20 } as _}
	<span
		transition:scale|global
		style:--scale={random(3, 4) / 10}
		style:--offset="{random(0, 100)}vw"
		style:--delay="{random(1000, 5000)}ms"
		style:--speed="{random(2000, 6000)}ms"
	/>
{/each}

<style>
	span {
		--pokeball-size: calc(10rem * var(--scale));
		width: var(--pokeball-size);
		aspect-ratio: 1/1;
		background: var(--pokeball-image);
		animation: position var(--speed) linear infinite forwards;
		animation-delay: var(--delay);
		position: fixed;
		z-index: var(--zindex, 99);
		bottom: calc(var(--pokeball-size) * -1);
		left: 0;
		translate: calc(var(--offset));
	}

	@media (prefers-reduced-motion: reduce) {
		span {
			animation: none;
		}
	}

	@keyframes position {
		from {
			transform: translate3d(0, -150vh, 0);
		}
	}
</style>
