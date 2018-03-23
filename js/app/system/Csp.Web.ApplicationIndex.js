webApplicationIndex = function(){
	return {
		init: function(){
			alert("OK");
		}
	};
}();
Ext.EventManager.onDocumentReady(webApplicationIndex.init, webApplicationIndex, true);