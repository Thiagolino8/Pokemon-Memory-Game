<script lang="ts">
  import "virtual:windi.css"
</script>

<slot />

<style global>
	:root {
		--gradient-one: linear-gradient(calc(-45deg * var(--pokemon, 1)), #ee7752, #e73c7e, #23a6d5, #23d5ab);
		--gradient-two: linear-gradient(calc(-45deg * var(--pokemon, 1)), #23d5ab, #ee7752, #e73c7e, #23a6d5);
	}

	* {
		@apply box-border m-0 p-0;
	}

	body {
		@apply flex flex-row justify-center items-start h-screen bg-slate-800;
	}

	p {
		@apply m-1 text-white text-6xl font-bold;
	}

	button {
		@apply btn m-1 text-white font-bold border-transparent border-0;
		background: var(--gradient-two);
			animation: gradient 15s ease infinite;
			background-size: 400% 400%;
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
