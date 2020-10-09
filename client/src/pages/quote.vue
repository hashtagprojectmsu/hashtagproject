<template>
	<div class="mt-3 container">
		<h2 class="text-center text-primary">#{{ hashtag }}</h2>
		<div v-if="error" class="w-100 alert alert-danger">{{ error }}</div>

		<div
			v-for="tweet in tweets"
			:key="tweet.id_str"
			class="m-auto text-light"
			style="max-width: 600px;"
		>
			<div class="mt-3 card card-body border-primary bg-dark">
				<div class="row">
					<!-- Image -->
					<div class="col-2">
						<img
							:src="tweet.user.profile_image_url_https"
							class="w-100 rounded-circle"
						>
					</div>

					<!-- User and Timestamp -->
					<div class="col-7">
						<h5 class="text-primary">{{ tweet.user.screen_name }}</h5>
						<h5 class="small text-secondary">{{ tweet.created_at }}</h5>
					</div>

					<!-- Url Link -->
					<div class="col-3">
						<a
							:href="`https://twitter.com/i/web/status/${tweet.id_str}`"
							target="_blank"
						>
							<button class="w-100 btn btn-outline-primary">
								View Tweet
							</button>
						</a>
					</div>
				</div>

				<div class="col-12 mt-3">
					<p>{{ tweet.text }}</p>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import pageService from '../services/pageService'

	export default {
		data: function() {
			return {
				hashtag: this.$route.params.hashtag,
				returned: {},
				tweets: [],
				error: '',
			}
		},

		created: async function() {
			try {
				this.returned = await pageService.s_quote(this.hashtag)
				this.tweets = this.returned.tweets.statuses
			}
			catch (err) { this.error = err }			
		}
	}
</script>