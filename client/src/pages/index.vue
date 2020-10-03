<template>
	<div class="container">
		<!-- Button Tabs -->
		<div class="row">
			<div class="col-12 my-3">
				<ButtonTabs
					:tabs="['Charts', 'Recent Tweets']"
					@tabClicked="switchTab"
				/>
			</div>
		</div>

		<!-- Charts -->
		<div v-show="currentTab == 'Charts'" class="row">
			<div class="col">
				<div class="w-100 card card-body">
					<!-- Title -->
					<h4 class="text-center">
						Charts of Hashtags
					</h4>

					<div class="row">
						<!-- #hack -->
						<div class="col-md-4">
							<div class="card card-body">
								<h4 class="text-primary">#hack</h4>
								<Line-chart
									v-if="!loading"
									:labels="hackLabels"
									:data="hackValues"
									class="w-100"
									style="height: 300px;"
								/>
							</div>
						</div>

						<!-- #hacked -->
						<div class="col-md-4">
							<div class="card card-body">
								<h4 class="text-primary">#hacked</h4>
								<Line-chart
									v-if="!loading"
									:labels="hackedLabels"
									:data="hackedValues"
									class="w-100"
									style="height: 300px;"
								/>
							</div>
						</div>
						
						<!-- #malware -->
						<div class="col-md-4">
							<div class="card card-body">
								<h4 class="text-primary">#malware</h4>
								<Line-chart
									v-if="!loading"
									:labels="malwareLabels"
									:data="malwareValues"
									class="w-100"
									style="height: 300px;"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent Tweets -->
		<div v-show="currentTab == 'Recent Tweets'" class="row">
			<div class="col-md-12">
				<div class="card card-body">
					<!-- Title -->
					<h4 class="text-center">
						Recent Tweets from Verified Users
					</h4>

					<!-- [COMPONENT] Tweet List -->
					<TweetList v-if="!loading" :tweets="recentVerifiedTweets" />
				</div>
			</div>
		</div>

		<!-- All Hashtags Chart Row -->
		<div class="row">
			<div class="col-12 mt-3">
				<div class="w-100 card card-body">
					<h4 class="text-primary">#hack, #hacked, #malware</h4>
					<Line-chart
						v-if="!loading"
						:labels="allHashtagsLabels"
						:data="allHashtagsValues"
						class="w-100"
						style="height: 350px;"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import ButtonTabs from '../components/controls/ButtonTabs'
	import LineChart from '../components/chartjs/LineChart'
	import TweetList from '../components/tweets/list'
	import PageService from '../services/pageService'

	// [EXPORT] //
	export default {
		components: {
			ButtonTabs,
			LineChart,
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