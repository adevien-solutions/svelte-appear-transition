<script>
	// @ts-ignore
	import { appear } from '$lib/actions';
</script>

<h1
	use:appear={{
		to: {
			opacity: '1',
			transform: 'translateY(0)'
		}
	}}
>
	Svelte Appear Transition
</h1>
<div class="wrapper">
	<div class="two-column">
		<div
			class="box"
			use:appear={{
				from: {
					opacity: '0',
					transform: 'translateX(-40px)',
					transitionTimingFunction: 'ease-out'
				},
				to: {
					opacity: '1',
					transform: 'translateX(0)'
				},
				duration: 800,
				threshold: 0.75
			}}
		></div>
		<div
			class="box"
			use:appear={{
				from: {
					opacity: '0',
					transform: 'translateX(40px)',
					transitionTimingFunction: 'ease-out'
				},
				to: {
					opacity: '1',
					transform: 'translateX(0)'
				},
				duration: 800,
				threshold: 0.75
			}}
		></div>
	</div>
	<div
		class="box wide"
		use:appear={{
			from: {
				opacity: '0',
				transform: 'translateY(-40px)',
				transitionTimingFunction: 'ease-out'
			},
			to: {
				opacity: '1',
				transform: 'translateY(0)'
			},
			duration: 500,
			threshold: 0.5
		}}
	></div>
</div>

<style>
	h1 {
		font-family: ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari,
			'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif;
		margin: 2rem 2rem 0 2rem;

		/* Styling that will be overwritten by the transition */
		opacity: 0;
		transform: translateY(40px);
		transition:
			opacity 0.5s ease-out,
			transform 0.5s ease-out;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 2rem;
	}

	.two-column {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		width: 100%;
	}

	.box {
		border-radius: 1rem;
		background-color: #ff3e00;
		height: 80vh;
		min-height: 500px;
		flex-grow: 1;
	}

	.wide {
		width: 100%;
	}
</style>
