<script>
	import { appear } from '../lib/actions.js';
</script>

<h1
	use:appear={{
		from: {
			opacity: '0',
			transform: 'translateY(40px)',
			transitionTimingFunction: 'ease-out'
		},
		to: {
			opacity: '1',
			transform: 'translateY(0)'
		},
		duration: 500,
		bothWays: true
	}}
>
	Svelte Appear Transition
</h1>
