define(["dojox/charting/Theme", "dojo/_base/Color", "dojox/charting/themes/common"], function(Theme, Color, themes){
	/*
		A charting theme for Dayforce
	*/
	themes.FeussCharts = new Theme({
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
		// The area within the axis lines
		axis: {
			stroke: {width: 1, color: "#adb7bc"},
			tick: {	// used as a foundation for all ticks
				color:     "#adb7bc",
				position:  "center",
				font:      "normal normal normal .75rem 'Open Sans', Helvetica, Arial, sans-serif",	// labels on axis
				fontColor: "#292f32"	// color of labels
			},
			majorTick:{
				color:	"#adb7bc",
				width:	1,
				length: 5
			},
			minorTick: {
				color:	"#f2f4f4",
				width:	1,
				length:	2
			},
			font: "normal normal normal .75rem 'Open Sans', Helvetica, Arial, sans-serif",
			fontColor: "#adb7bc"
		},
		// The number at the end of the bars
		series: {
			outline: null,
			stroke: {width: 1, color: "white"},
			font: "normal normal normal .75rem 'Open Sans', Helvetica, Arial, sans-serif",
			fontColor: "#515e63"
		},
		marker: {
			stroke: {width: 1, color: "black"},
			fill: "#292f32",
			font: "normal normal normal .875rem 'Open Sans', Helvetica, Arial, sans-serif",
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

	// themes.FeussCharts.next = function(elementType, mixin, doPost){
	// 	var isLine = elementType == "line";
	// 	if(isLine || elementType == "area"){
	// 		// custom processing for lines: substitute colors
	// 		var s = this.seriesThemes[this._current % this.seriesThemes.length];
	// 		s.fill.space = "plot";
	// 		if(isLine){
	// 			s.stroke  = { width: 4, color: s.fill.colors[0].color};
	// 		}
	// 		var theme = Theme.prototype.next.apply(this, arguments);
	// 		// cleanup
	// 		delete s.outline;
	// 		delete s.stroke;
	// 		s.fill.space = "shape";
	// 		return theme;
	// 	}
	// 	return Theme.prototype.next.apply(this, arguments);
	// };

	// themes.FeussCharts.post = function(theme, elementType){
	// 	theme = Theme.prototype.post.apply(this, arguments);
	// 	if((elementType == "slice" || elementType == "circle") && theme.series.fill && theme.series.fill.type == "radial"){
	// 		theme.series.fill = gradutils.reverse(theme.series.fill);
	// 	}
	// 	return theme;
	// };

	return themes.FeussCharts;
});
