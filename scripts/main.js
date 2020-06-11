async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
	yearsPromise = loadJSON('./data/year_counts.json');
	yearsPromise.then(function (year) {
		plotYearSales(year);
	});

	nutrientPromise = loadJSON('./data/nutrition.json')
	nutrientPromise.then(function (nutrient) {
		nutritionData = nutrient;
	});

	plotBar()
};

let states = [
				['us-ak', 18.0],
				['us-al', 245.0],
				['us-ar', 173.0],
				['us-az', 289.0],
				['us-ca', 1288.0],
				['us-co', 211.0],
				['us-ct', 147.0],
				['us-dc', 28.0],
				['us-de', 37.0],
				['us-fl', 907.0],
				['us-ga', 454.0],
				['us-hi', 53.0],
				['us-ia', 147.0],
				['us-id', 62.0],
				['us-il', 663.0],
				['us-in', 349.0],
				['us-ks', 148.0],
				['us-ky', 251.0],
				['us-la', 240.0],
				['us-ma', 242.0],
				['us-md', 288.0],
				['us-me', 62.0],
				['us-mi', 545.0],
				['us-mn', 226.0],
				['us-mo', 315.0],
				['us-ms', 144.0],
				['us-mt', 48.0],
				['us-nc', 489.0],
				['us-nd', 25.0],
				['us-ne', 78.0],
				['us-nh', 54.0],
				['us-nj', 264.0],
				['us-nm', 104.0],
				['us-nv', 144.0],
				['us-ny', 617.0],
				['us-oh', 615.0],
				['us-ok', 204.0],
				['us-or', 164.0],
				['us-pa', 494.0],
				['us-ri', 32.0],
				['us-sc', 230.0],
				['us-sd', 30.0],
				['us-tn', 331.0],
				['us-tx', 1191.0],
				['us-ut', 116.0],
				['us-va', 401.0],
				['us-vt', 26.0],
				['us-wa', 263.0],
				['us-wi', 299.0],
				['us-wv', 104.0],
				['us-wy', 29.0]
			]

function plotMap(states) {
	
	Highcharts.mapChart("statesCounts", {
		chart: {
			map: 'countries/us/us-all',
		},
		title: {
			text: "Number of U.S. McDonald's Locations by State",
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/kerneler/starter-mcdonald-s-locations-2678722e-c">kaggle.com</a>',
			style: {
				fontFamily: "Montserrat",
				fontSize: "15px",
				color: "black"
			}
		},
		colorAxis: {
            min: 1,
            type: 'linear',
            minColor: '#ffcf40',
            maxColor: '#a67c00',
            stops: [
                [0, '#ffcf40'],
                [0.5, '#ffbf00'],
				[0.75, '#bf9b30'],
				[1, '#a67c00']
            ]
		},
		
		exporting: {
			enabled: false
		},

		legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 50
		},
		
		credits: {
			enabled: false
		},
		series: [{
			data: states,
			color: '#fcc201',
			name: 'Number of Locations',
			states: {
                hover: {
					color: '#ff0000',
					
                }
			},
			tooltip: {
				pointFormat: '{point.value}'

			},
			dataLabels: {
                enabled: true,
                format: '{point.value}',
				color: 'black',
				style: {
					textOutline: 0
				}
            }
		}]

	})

}
plotMap(states)

function plotYearSales(yearSales) {

	// Borrowed code from zingcharts code (main.js)
    let years = [];
    let totals = [];
    let totalByYear = [];
	for (datum of yearSales) {
        years.push(datum['Year']);
        totals.push(Number(datum['Total'].toFixed(2)));
        totalByYear.push([datum['Year'], Number(datum['Total'].toFixed(2))])
    }

	Highcharts.chart("lineChart", {
		chart: {
			type: "line",
			marginRight: 45,
			marginLeft: 65,
			marginBottom: 75
		},
		title: {
			text: 'Yearly Growth from 1994-2018',
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		subtitle: {
			text: 'Source: <a href="https://expandedramblings.com/index.php/mcdonalds-statistics/">expandedramblings.com</a>',
			style: {
				fontFamily: "Montserrat",
				fontSize: "15px",
				color: "black"
			}
		},
		xAxis: {
			labels: {
				style: {
					fontSize: "12px",
					fontFamily: "Montserrat",
					color: "black"
				},
			},
			tickInterval: 1,
			title: {
				text: "Year",
				style: {
					fontFamily: "Montserrat",
					fontWeight: "bold"
				}
			},
			tooltip: {
				enabled: true,
			},
			min: years[0],
			lineColor: "#a9a9a9",
			lineWidth: 1,
			tickColor: "#a9a9a9",
			tickLength: 5,
			tickWidth: 1,
			crosshair: {
				width: 1,
				color: "#808080",
				label: {
					enabled: true, 
					overflow: 'justify'
				}
			}
		},
		yAxis: {
			min: 0,
			max: 40000,
			title: {
				text: 'Total Number of Locations',
				align: 'middle',
				style: {
					fontFamily: "Montserrat",
					fontWeight: "bold",
					color: "black"
				}
			},
			lineColor: "#a9a9a9",
			lineWidth: 1,
			tickColor: "#a9a9a9",
			tickLength: 5,
			tickWidth: 1,
			labels: {
				overflow: 'justify',
				style: {
					fontSize: "12px"
				}
			},
			crosshair: {
				width: 1,
				color: "#808080"
			},
			tickInterval: 5000,
			gridLineDashStyle: "ShortDash",
			gridLineColor: "#dcdcdc"
		},
		plotOptions: {
			areaspline: {
				color: "#00bfff",
				fillOpacity: "0.3"
			}
		},
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		series: [{
			data: totalByYear,
			name: "Total Stores",
			color: "#a67c00",
			showInLegend: false,
			tooltip: {
				pointFormat: '{point.y}',
				headerFormat: '{null}'
			},
			states: {
				hover: {
					enabled: false
				}
			}
		}],
	});
}

function plotPieChart(item) {

	var currItem = nutritionData[item]
	
	Highcharts.chart("pieChart1", {
		chart: {
			type: "pie",
			animation: false
		},
		title: {
			text: "Calories",
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		exporting: {
			enabled: false
		},
		legend: {
			enabled: true,
			layout: "vertical",
			borderWidth: 1,
			verticalAlign: "top",
			symbolRadius: 0,
			squareSymbol: true
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				startAngle: 0,
				showInLegend: true,
				size: "90%"
			},
		},
		tooltip: {
			enabled: false
		},
		series: [{
			colorByPoint: true,
			data: [{
				// Calories: 2000 calories recommended
				name: "Percent of alloted calories per serving",
				y: (currItem[0]["Value"] / 2000)*100,
				color: "#ff0000",
				dataLabels: {
					enabled: true,
					distance: -50,
					format: "{point.y:.1f} %",
					style: {
						textOutline: 0,
						fontSize: "15px"
					},
				},
			},
			{
				name: "Remainder of alloted calories",
				y: 100 - ((currItem[0]["Value"] / 2000)*100),
				color: "#fcc201",
				dataLabels: {
					enabled: false
				},
			}],
			animation: false
		}]
	})

	Highcharts.chart("pieChart2", {
		chart: {
			type: "pie",
			animation: false
		},
		title: {
			text: "Total Fat",
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		exporting: {
			enabled: false
		},
		legend: {
			enabled: true,
			layout: "vertical",
			borderWidth: 1,
			verticalAlign: "top",
			symbolRadius: 0,
			squareSymbol: true
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				startAngle: 0,
				showInLegend: true,
				size: "90%"
			},
		},
		tooltip: {
			enabled: false
		},
		series: [{
			colorByPoint: true,
			data: [{
				// Total Fat: Recommend 44 - 77g, average is about 60g
				name: "Percent of alloted fat per serving",
				y: (currItem[1]["Value"] / 60)*100,
				color: "#ff0000",
				dataLabels: {
					enabled: true,
					distance: -50,
					format: "{point.y:.1f} %",
					style: {
						textOutline: 0,
						fontSize: "15px"
					},
				},
			},
			{
				name: "Remainder of alloted fat",
				y: 100 - ((currItem[1]["Value"] / 60)*100),
				color: "#fcc201",
				dataLabels: {
					enabled: false,
				},
			}],
			animation: false
		}]
	})

	Highcharts.chart("pieChart3", {
		chart: {
			type: "pie",
			animation: false
		},
		title: {
			text: "Sodium",
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		exporting: {
			enabled: false
		},
		legend: {
			enabled: true,
			layout: "vertical",
			borderWidth: 1,
			verticalAlign: "top",
			symbolRadius: 0,
			squareSymbol: true
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				startAngle: 0,
				showInLegend: true,
				size: "90%"
			},
		},
		tooltip: {
			enabled: false
		},
		series: [{
			colorByPoint: true,
			data: [{
				// Sodium: Daily recommend 2300 mg
				name: "Percent of alloted sodium per serving",
				y: (currItem[2]["Value"] / 2300)*100,
				color: "#ff0000",
				dataLabels: {
					enabled: true,
					distance: -50,
					format: "{point.y:.1f} %",
					style: {
						textOutline: 0,
						fontSize: "15px"
					},
				},
			},
			{
				name: "Remainder of alloted sodium",
				y: 100 - ((currItem[2]["Value"] / 2300)*100),
				color: "#fcc201",
				dataLabels: {
					enabled: false,
				},
			}],
			animation: false
		}]
	})
}

function plotBar() {

	Highcharts.chart("barChart", {
		chart: {
			type: "column",
			animation: false
		},
		title: {
			text: "McDonald's Menu Categories",
			style: {
				fontFamily: "Montserrat",
				fontWeight: "bolder",
				color: "black"
			}
		},
		subtitle: {
			text: 'Source: <a href="https://www.kaggle.com/mcdonalds/nutrition-facts">kaggle.com</a>',
			style: {
				fontFamily: "Montserrat",
				fontSize: "15px",
				color: "black"
			}
		},
		xAxis: {
			title: {
				text: "McDonald's Item Categories",
				style: {
					fontFamily: "Montserrat",
					fontWeight: "bolder",
					color: "black"
				}
			},
			categories: [
				'Salads', 
				'Desserts', 
				'Snacks & Sides', 
				'Beef & Pork', 
				'Beverages',
				'Chicken & Fish', 
				'Smoothies & Shakes', 
				'Breakfast', 
				'Coffee & Tea'
			],
			crosshair: true
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Number of Items',
				style: {
					fontFamily: "Montserrat",
					fontWeight: "bolder",
					color: "black"
				}
			}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		legend: {
			enabled: true,
			align: "center",
			borderWidth: 0,
			verticalAlign: "top",
			symbolRadius: 0,
			squareSymbol: true
		},
		series: [{
			name: 'Number of items in category',
			data: [6, 7, 13, 15, 27, 27, 28, 42, 95],
			color:  "#fcc201"
		}]
	})
}

document.addEventListener('DOMContentLoaded', init, false);