sap.ui.define([	"sap/ui/base/Object",
], function(UI5Object) {
	return {
        errorHandler:function(error){
			console.log(error);
		},
        attachAllErrorHandler:function(promises){
			return Promise.all(promises).catch((err) => { this.errorHandler(err);return [];});
		},
		callMultipleRequests:function(promises){
			return this.attachAllErrorHandler(promises);
		}
	}
});