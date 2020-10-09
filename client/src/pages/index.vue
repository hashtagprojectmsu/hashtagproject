<template>
	<div class="container">
		<!-- SECTION 1 -->
		<div v-if="!loading" class="row">
			<!-- #hack, #hacked, #malware -->
			<div class="col-12 mt-3">
				<WrappedLineChart
					:title="'#hack, #hacked, #malware'"
					:labels="allHashtagsLabels"
					:data="allHashtagsValues"
					:height="350"
				/>
			</div>
		</div>

		<!-- SECTION 2 -->
		<div v-if="!loading" class="row mt-3">
			<div class="col-12">
				<div class="card card-body bg-dark">
					<!-- [COMPONENT] ButtonTabs -->
					<ButtonTabs
						:tabs="['Charts', 'Recent Tweets']"
						@tabClicked="switchTab"
						class="mb-3"
					/>
				
					<!-- Charts -->
					<div v-show="currentTab == 'Charts'" class="w-100">
						<div  class="row">
							<!-- #hack -->
							<div class="col-md-4">
								<WrappedLineChart
									:title="'#hack'"
									:labels="hackLabels"
									:data="hackValues"
								/>
							</div>

							<!-- #hacked -->
							<div class="col-md-4">
								<WrappedLineChart
									:title="'#hacked'"
									:labels="hackedLabels"
									:data="hackedValues"
								/>
							</div>
							
							<!-- #malware -->
							<div class="col-md-4">
								<WrappedLineChart
									:title="'#malware'"
									:labels="malwareLabels"
									:data="malwareValues"
								/>
							</div>
						</div>
					</div>

					<!-- Recent Tweets -->
					<div  v-show="currentTab == 'Recent Tweets'" class="w-100">
						<!-- [COMPONENT] Tweet List -->
						<TweetList v-if="!loading" :tweets="recentVerifiedTweets" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import ButtonTabs from '../components/controls/ButtonTabs'
	import WrappedLineChart from '../components/chartjs/WrappedLineChart'
	import TweetList from '../components/tweets/list'
	import PageService from '../services/pageService'

	// [EXPORT] //
	export default {
		components: {
			ButtonTabs,
			WrappedLineChart,
			TweetList,
		},

		data() {
			return {
				currentTab: 'Charts',
				loading: true,
				returned: [],

				// All Hashtags
				allHashtagsLabels: [],
				allHashtagsValues: [],

				// #hack
				hackLabels: [],
				hackValues: [],

				// #hacked
				hackedLabels: [],
				hackedValues: [],

				// #malware
				malwareLabels: [],
				malwareValues: [],

				// Recent Verified Tweets
				recentVerifiedTweets: []
			}
		},

		created: async function() {
			// [RETURN DATA]
			this.returned = await PageService.s_home()
			
			// Map Data allHashtagsChartData //
			this.allHashtagsLabels = this.returned.allHashtagsChartData.map(d => d.time)
			this.allHashtagsValues = this.returned.allHashtagsChartData.map(d => d.count)

			// Map Data hack //
			this.hackLabels = this.returned.hackChartData.map(d => d.time)
			this.hackValues = this.returned.hackChartData.map(d => d.count)

			// Map Data hacked //
			this.hackedLabels = this.returned.hackedChartData.map(d => d.time)
			this.hackedValues = this.returned.hackedChartData.map(d => d.count)

			// Map Data malware //
			this.malwareLabels = this.returned.malwareChartData.map(d => d.time)
			this.malwareValues = this.returned.malwareChartData.map(d => d.count)

			this.recentVerifiedTweets = this.returned.recentVerifiedTweets

			// Disable Loading //
			this.loading = false

			// [LOG] //
			console.log(this.returned)
		},

		methods: {
			switchTab(tab) { this.currentTab = tab }
		}
	}
</script>