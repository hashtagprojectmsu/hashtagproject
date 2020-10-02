<template>
	<div class="row">
		<div
			v-for="tweet in tweets"
			:key="tweet.id_str"
			class="col-md-6"
		>
			<tweet :id="tweet.id_str" />
		</div>
	</div>
</template>

<script>
	// [IMPORT] //
	import { Tweet } from 'vue-tweet-embed'

	// [EXPORT] //
	export default {
		components: {
			Tweet,
		},

		props: {
			tweets: {
				type: Array,
				required: true
			}
		},
	}
</script>