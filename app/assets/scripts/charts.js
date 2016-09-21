define(["dojox/charting/SimpleTheme", "dojo/_base/Color", "dojox/charting/themes/common"], function(SimpleTheme, Color, themes){
	/*
		A charting theme based on the principles championed by
		Edward Wacky.  By Alex Russell, Dojo Project Lead.
	*/
	themes.FeussCharts = new SimpleTheme({
		chart: {
			stroke: null,
			fill: "inherit"
		},
		plotarea: {
			// stroke: { width: 0.2, color: "#666666" },
			stroke: null,
			fill: "transparent"
		},
		axis: {
			stroke: {width: 1, color: "#ccc"},
			majorTick:{
				color:	"black",
				width:	1,
				length: 5
			},
			minorTick: {
				color:	"#666",
				width:	1,
				length:	2
			},
			font: "normal normal normal 8pt Tahoma",
			fontColor: "#999"
		},
		series: {
			outline:   null,
			stroke:	   {width: 1, color: "black"},
			// fill:   "#3b444b",
			fill:      new Color([0x3b, 0x44, 0x4b, 0.85]),
			font: "normal normal normal 7pt Tahoma",
			fontColor: "#717171"
		},
		marker: {
			stroke:    {width: 1, color: "black"},
			fill:      "#333",
			font: "normal normal normal 7pt Tahoma",
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
