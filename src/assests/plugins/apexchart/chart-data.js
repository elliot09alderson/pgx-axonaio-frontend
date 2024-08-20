'use strict';

$(document).ready(function() {

	// Column chart
	if($('#transaction_chart').length > 0) {
		var pieCtx = document.getElementById("transaction_chart"),
		pieConfig = {
			colors: ['#E0000E', '#008F64'],
			series: [25, 75],
			chart: {
				fontFamily: 'Poppins, sans-serif',
				height: 280,
				type: 'donut',
			},
			labels: ['Failure ', 'Success'],
			legend: {show: false},
			responsive: [{
				breakpoint: 480,
				options: {
					chart: {
						//width: 250
						height: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}]
		};
		var pieChart = new ApexCharts(pieCtx, pieConfig);
		pieChart.render();
	}

	//Pie Chart
	if($('#invoice_chart').length > 0) {
	var pieCtx = document.getElementById("invoice_chart"),
	pieConfig = {
		colors: ['#F0142F', '#FDA600', '#303030', '#0EBBB1', '#4B00D4'],
		series: [35.5, 11.3, 11.3, 13.3, 45],
		chart: {
			fontFamily: 'Poppins, sans-serif',
			height: 280,
			type: 'donut',
		},
		labels: ['Debit Card ', 'Credit Card ', 'UPI', 'Netbanking', 'Wallet'],
		legend: {show: false},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					//width: 250
					height: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}]
	};
	var pieChart = new ApexCharts(pieCtx, pieConfig);
	pieChart.render();
	}
	

	if($('#chart').length > 0) {
	var options = {
			series: [{
				name: "Payments",
				data: [0, 20, 25, 20, 30, 25, 35, 25, 40, 30]
			},
		],
		colors: ['#4B00D4'],
          chart: {
          height: 300,
          type: 'area',
		  toolbar: {
				show: false
			},
          zoom: {
            enabled: false
          }
        },
		markers: {
			size: 3,
		},
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
		  width: 3,
        },
		legend: {
			position: 'top',
			horizontalAlign: 'right',
		 },
        grid: {
          show: false,
        },
		yaxis: {
			axisBorder: {
				show: true,
			},
		},
        xaxis: {
          categories: ['', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022'],
			}
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
	}
  
});