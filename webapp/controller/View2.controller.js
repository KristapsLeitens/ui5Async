sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"utils/oDataRequests",
	"utils/ajaxRequests",
	"utils/comonRequests",
	'sap/ui/model/json/JSONModel'
], function(Controller, ODataModel,oDataRequests,ajaxRequests,comonRequests,JSONModel) {
	"use strict";
	return Controller.extend("simple-app.controller.View2", {
		oDataRequests:oDataRequests,
		ajaxRequests:ajaxRequests,
		comonRequests:comonRequests,
		onInit:function(){
      this._router=this.getOwnerComponent().getRouter();
			this.oDataModel=new ODataModel("https://services.odata.org/V2/Northwind/Northwind.svc/", true)
// 			this.callService();
      var oModel = new JSONModel({
        "fixedNavigation":[
          {
            "title":"Create wall",
            "icon":"sap-icon://add",
            "press":"onDialogPress"
          }
        ],
        "navigation":[
          {
            "title":"Media Wall",
            "icon":"sap-icon://media-play"
          },
          {
            "title":"Social Wall",
            "icon":"sap-icon://employee"
          }
        ],
        "TileCollection2":[
          {
            "type" : "Create",
            "title" : "Create new Collections",
            "info" : "28 Days Left",
            "infoState" : "Success"
          }
        ],
        "TileCollection" : [          
          {
            "icon" : "sap-icon://hint",
            "type" : "Monitor",
            "title" : "Tiles: a modern UI design pattern for overview & navigation."
          },
          {
            "icon" : "sap-icon://inbox",
            "number" : "89",
            "title" : "Approve Leave Requests",
            "info" : "Overdue",
            "infoState" : "Error"
          },
          {
            "icon" : "sap-icon://travel-expense-report",
            "number" : "281",
            "numberUnit" : "euro",
            "title" : "Travel Reimbursement",
            "info" : "1 day ago"
          },
          {
            "icon" : "sap-icon://loan",
            "number" : "2380",
            "numberUnit" : "euro",
            "title" : "My Salary",
            "info" : "8 days ago"
          },
          {
            "icon" : "sap-icon://lab",
            "number" : "1",
            "numberUnit" : "Invention",
            "title" : "Test Lab Reports",
            "info" : "8 Days Ago"
          },
          {
            "icon" : "sap-icon://inbox",
            "type" : "Monitor",
            "title" : "Leave Request History"
          },
          {
            "icon" : "sap-icon://stethoscope",
            "number" : "3",
            "title" : "Yearly Health Check",
            "info" : "3 year overdue",
            "infoState" : "Error"
          },
          {
            "icon" : "sap-icon://meal",
            "type" : "Monitor",
            "title" : "Meal Schedule"
          },
          {
            "icon" : "sap-icon://cart",
            "number" : "787",
            "numberUnit" : "euro",
            "title" : "My Shopping Carts",
            "info" : "Waiting for Approval",
            "infoState" : "Warning"
          },
          {
            "icon" : "sap-icon://factory",
            "number" : "2",
            "numberUnit" : "Outages",
            "title" : "Factory Power Management",
            "info" : "Production On Hold",
            "infoState" : "Error"
          },
          {
            "icon" : "sap-icon://calendar",
            "title" : "Team Calendar"
          },
          {
            "icon" : "sap-icon://pie-chart",
            "number" : "5",
            "title" : "Financial Reports",
            "info" : "4 day ago",
            "infoState" : "Warning"
          }
        ]
      });
			this.getView().setModel(oModel);
		},
    toMain:function(){
      this._router.navTo("View1", {
						colId: "1"
					}, true);
    },
    onDialogPress: function () {
			if (!this.pressDialog) {
				this.pressDialog = new Dialog({
					title: 'Walls',
					content: new List({
						items: {
							path: '/TileCollection',
							template: new StandardListItem({
								title: "{title}"
							})
						}
					}),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: 'OK',
						press: function () {
							this.pressDialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: 'Close',
						press: function () {
							this.pressDialog.close();
						}.bind(this)
					})
				});

				//to get access to the global model
				this.getView().addDependent(this.pressDialog);
			}

			this.pressDialog.open();
		}

	});
});