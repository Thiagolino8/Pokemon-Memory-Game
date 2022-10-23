<div class="positioner">
	<div class="positioner-inner">
			<div class="pokeball" />
	</div>
</div>

<style>
	.positioner {
		--pokeball-size: calc(200px * var(--scale));

		animation: position var(--speed) linear infinite forwards;

		animation-delay: var(--delay);

		position: fixed;
		z-index: var(--zindex, 99);

		bottom: calc(var(--pokeball-size) * -2);
		left: var(--offset);
	}

	.positioner-inner {
		animation: wobble 2s ease-in-out alternate infinite;
		animation-delay: inherit;
	}

	.pokeball {
		width: var(--pokeball-size);
		height: var(--pokeball-size);
		background: var(--pokeball-image)
	}

	@media (prefers-reduced-motion: reduce) {
		.positioner {
			animation: none;
		}
	}

	@keyframes position {
		from {
      transform: translate3d(0, calc((-2.5 * var(--pokeball-size)) - 100vh), 0);
		}
    
		to {
      transform: translate3d(0, 0, 0);
		}
	}

	@keyframes wobble {
		from {
			transform: translate3d(0, 0, 0);
		}

		to {
			transform: translate3d(42px, 0, 0);
		}
	}
</style>