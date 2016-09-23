define(["dojox/charting/SimpleTheme", "dojo/_base/Color", "dojox/charting/themes/common"], function(SimpleTheme, Color, themes){
	/*
		A charting theme for Dayforce
	*/
	themes.FeussCharts = new SimpleTheme({
		// The chart container
		chart: {
			stroke: null,
			fill: "transparent"
		},
		// The area within the axis lines
		plotarea: {
			stroke: null,
			fill: "transparent"
		},
		axis: {
			stroke: {width: 1, color: "#adb7bc"},
			majorTick:{
				color:	"#515e63",
				width:	1,
				length: 5
			},
			minorTick: {
				color:	"#adb7bc",
				width:	1,
				length:	2
			},
			font: "normal normal normal 8pt 'Open Sans'",
			fontColor: "#adb7bc"
		},
		series: {
			outline: null,
			stroke: {width: 1, color: "white"},
			font: "normal normal normal 7pt 'Open Sans'",
			fontColor: "#292f32"
		},
		marker: {
			stroke: {width: 1, color: "black"},
			fill: "#292f32",
			font: "normal normal normal 7pt 'Open Sans'",
			fontColor: "black"
		},
		colors:[
			Color.fromHex("#88a4e8"),
			Color.fromHex("#83c7e6"),
			Color.fromHex("#8aeaa3"),
			Color.fromHex("#fde568"),
			Color.fromHex("#fdc766"),
			Color.fromHex("#ed7dab")
		]
	});

	return themes.FeussCharts;
});
