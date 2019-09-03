sap.ui.define([	"sap/ui/base/Object",
], function(UI5Object) {
	return {
        callAjaxPromise:function(attributes){
			return new Promise((resolve, reject) => {
				jQuery.ajax({
						async: true,
						url: attributes.url,
						method: "GET",
						cache: false,
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
						}
					})
					.done((oData) => {
						resolve(oData);
					}).fail((oEvent, sStatus, sError) => {
						reject({event:oEvent,attributes:attributes});
					});
			});
		},
		errorHandler:function(error){
			console.log(error);
		},
		attachErrorHandler:function(promise,attributes,errReturnVal){
			return promise(attributes).catch((err) => { this.errorHandler(err);return errReturnVal;});	
		},
		callAjaxRequest:function(promise,attributes,avoidErrorCheck,returnVal){
			return !avoidErrorCheck?this.attachErrorHandler(promise,attributes,returnVal):promise(attributes);
		}
	}
});