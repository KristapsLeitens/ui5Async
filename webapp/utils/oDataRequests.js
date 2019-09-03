sap.ui.define([	"sap/ui/base/Object",
], function(UI5Object) {
	return {
		callODataPromise: function(attributes,oDataModel) {
			return new Promise((resolve, reject) => {
				oDataModel.read(attributes.url, {
					success: (oData)=>resolve(oData),
					error: (oEvent)=>{
						reject({event:oEvent,attributes:attributes});
					}
				});
			});
        },
        errorHandler:function(error){
			console.log(error);
		},
		attachErrorHandler:function(oDataModel,promise,attributes,errReturnVal){
			return promise(attributes,oDataModel).catch((err) => { this.errorHandler(err);return errReturnVal;});	
		},
		callODataRequest:function(oDataModel,promise,attributes,avoidErrorCheck,returnVal){
			return !avoidErrorCheck?this.attachErrorHandler(oDataModel,promise,attributes,returnVal):promise(attributes,oDataModel);
        }
	}
});