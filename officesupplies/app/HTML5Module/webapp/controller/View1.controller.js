// @ts-nocheck
// @ts-ignore
sap.ui.define([
        "sap/ui/core/mvc/Controller"
    ],
    
    function (Controller, MessageToast, Log, JSONModel,MessageBox) {
        "use strict";

        
        return Controller.extend("ns.HTML5Module.controller.View1", {   
               
            
            
             onInit: function () {
                 var oModel = new sap.ui.model.json.JSONModel();

    oModel.loadData("https://raw.githubusercontent.com/karthikn1050/Products.json/master/Products.json");

    this.getView().setModel(oModel);
            this.getSplitAppObj().setHomeIcon({
                'phone': 'phone-icon.png',
                'tablet': 'tablet-icon.png',
                'icon': 'desktop.ico'
            });
        },
         onUpload : function(e) {
	
	var fU = this.getView().byId("idfileUploader");
	var domRef = fU.getFocusDomRef();
	var file = domRef.files[0];
	
	
	// Create a File Reader object
	var reader = new FileReader();
	var t = this;
	
	reader.onload = function(e) {
	    var strCSV = e.target.result;
	    var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
	    var noOfCols = 5;

	    // To ignore the first row which is header
	    var hdrRow = arrCSV.splice(0, noOfCols);

	    var data = [];
	    while (arrCSV.length > 0) {
		var obj = {};
		// extract remaining rows one by one
		var row = arrCSV.splice(0, noOfCols)
		for (var i = 0; i < row.length; i++) {
		    obj[hdrRow[i]] = row[i].trim()
		}
		// push row to an array
		data.push(obj)
	    }
	    
	    // Bind the data to the Table
	    var oModel = new sap.ui.model.json.JSONModel();
	    oModel.setData(data);
	    var oTable = t.byId("idTable");
	    oTable.setModel(oModel);
	};
	reader.readAsBinaryString(file);
    },
            handleLinkPress: function () {
            MessageBox.alert("Link was clicked!");
        },

        handleObjectIdentifierPress: function () {
            MessageBox.alert("Object Identifier was clicked!");
        },

        onOrientationChange: function (oEvent) {
            var bLandscapeOrientation = oEvent.getParameter("landscape"),
                sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
            MessageToast.show(sMsg, { duration: 5000 });
        },

        onPressNavToDetail: function () {
            this.getSplitAppObj().to(this.createId("detailDetail"));
        },
        onPressNavToDetail1: function () {
            this.getSplitAppObj().to(this.createId("empty"));
        },
         onPressNavToDetail2: function () {
            this.getSplitAppObj().to(this.createId("detail"));
        },
         onPressNavToDetail3: function () {
            this.getSplitAppObj().to(this.createId("empty1"));
        }, onPressNavToDetail4: function () {
            this.getSplitAppObj().to(this.createId("empty2"));
        },


        

        onPressDetailBack: function () {
            this.getSplitAppObj().backDetail();
        },

        onPressMasterBack: function () {
            this.getSplitAppObj().backMaster();
        },

        onPressGoToMaster: function () {
            this.getSplitAppObj().toMaster(this.createId("detail"));
        },

        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitAppObj().toDetail(this.createId(sToPageId));
        },

        onPressModeBtn: function (oEvent) {
            var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

            this.getSplitAppObj().setMode(sSplitAppMode);
            MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
        },

        getSplitAppObj: function () {
            var result = this.byId("SplitAppDemo");
            if (!result) {
                Log.info("SplitApp object can't be found");
            }
            return result;
        }

    });
});