(function(classGrid, $, undefined) {
  classGrid.list = function() {
	  gridKeyConfig 	  = classGrid.moduleArray.list.gridKey;
	  var listGridDetails = baseFunctions.getGridValue(gridKeyConfig);
	  if(listGridDetails){
		  basePanel.createFilter(listGridDetails);
		  basePanel.createGrid(listGridDetails);
	  }
  }
})(window.classGrid = window.classGrid || {}, jQuery);