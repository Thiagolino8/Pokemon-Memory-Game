<script lang="ts">
	import 'virtual:windi.css'
</script>

<slot />

<style global>
	:root {
		--gradient-one: linear-gradient(calc(-45deg * var(--pokemon, 1)), #ee7752, #e73c7e, #23a6d5, #23d5ab);
		--gradient-two: linear-gradient(calc(-45deg * var(--pokemon, 1)), #23d5ab, #ee7752, #e73c7e, #23a6d5);
		--pokeball-image: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg') center
			no-repeat;
	}

	* {
		@apply box-border m-0 p-0;
	}

	body {
		@apply flex flex-row justify-center items-start h-screen bg-slate-800;
	}

	p {
		@apply p-1 text-white font-bold;
	}

	button {
		@apply btn text-white font-bold border-transparent border-0;
	}

	.backgroundButton {
		background: var(--gradient-two);
		animation: gradient 15s ease infinite;
		background-size: 400% 400%;
	}

	.cover {
		background: var(--gradient-one);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
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
