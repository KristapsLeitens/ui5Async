sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"utils/oDataRequests",
	"utils/ajaxRequests",
	"utils/comonRequests"
], function(Controller, ODataModel,oDataRequests,ajaxRequests,comonRequests) {
	"use strict";
	return Controller.extend("simple-app.controller.View1", {
		oDataRequests:oDataRequests,
		ajaxRequests:ajaxRequests,
		comonRequests:comonRequests,
		onInit:function(){
			this.oDataModel=new ODataModel("https://services.odata.org/V2/Northwind/Northwind.svc/", true)
			this.callService();
		},
		callService:async function () {
			var data = await this.callFirstService();
			console.log(data);
			//avoid error check for multiple requests at once
			var requestArr=[
				this.callFirstService(true),
				this.callSecondService(true),
				this.callODataService()
			];
			var allpromises= await this.comonRequests.callMultipleRequests(requestArr);
			console.log(allpromises);
			var data= await this.callODataService();
			console.log(data);
		},
		callFirstService:function(avoidErrorCheck){
			var attributes={url:"https://reqres.in/api/users"};
			return this.ajaxRequests.callAjaxRequest(this.ajaxRequests.callAjaxPromise,attributes,avoidErrorCheck,{});
		},
		callSecondService:function(avoidErrorCheck){
			var attributes={url:"https://reqres.in/api/users/2"};
			return this.ajaxRequests.callAjaxRequest(this.ajaxRequests.callAjaxPromise,attributes,avoidErrorCheck,[]);
		},
		callODataService:function(avoidErrorCheck){
			var attributes={url:"/Products"};
			return this.oDataRequests.callODataRequest(this.oDataModel,this.oDataRequests.callODataPromise,attributes,avoidErrorCheck,[]);
		}

	});
});