<script>
	// [IMPORT] //
	import { Line } from 'vue-chartjs'

	// [EXPORT] //
	export default {
		mixins: [Line],

		props: {
			labels: {
				type: Array,
				required: true,
			},

			data: {
				type: Array,
				required: true
			},
		},

		mounted: function() {
			// Render the Chart //
			this.renderChart(
				{
					labels: this.labels,
					datasets: [{
						data: this.data,
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