<script>
	// [IMPORT] //
	import { Line } from 'vue-chartjs'

	// [EXPORT] //
	export default {
		mixins: [Line],

		props: {
			chartData: {
				type: Array,
				required: true,
			},
			change: {
				type: Number 
			}
		},

		data: function() {
			return {
				labels: [],
				value: [],
			}
		},

		mounted: function() {
			// Map Data //
			this.labels = this.chartData.map(cd => cd.label)
			this.values = this.chartData.map(cd => cd.value)

			// Render the Chart //
			this.renderChart(
				{
					labels: this.labels,
					datasets: [{
						data: this.values,
						backgroundColor: '#58c6c2',
						borderColor: 'black',
					}]
				},
				{
					elements: { line: { tension: 0 } },
					legend: { display: false, },
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						yAxes: [{
							ticks: {
								fontColor: "black",
								//fontSize: 18,
								//stepSize: 1,
								beginAtZero: false
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: "#58c6c2",
								//fontSize: 14,
								//stepSize: 1,
								beginAtZero: false
							}
						}]
					}
				},
			)
		},		
	}
</script>