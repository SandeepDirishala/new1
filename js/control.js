// uhc_sr.js - Application Specific Javascript 

// BEGIN AngularJS 


//// BEGIN Control Page Controller 

app.controller('controlPageCtrl',['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){

	$scope.controlPage = function(showThis){
		$("div#controlPage1").css("display", "none");	
		$("div#controlPage2").css("display", "none");	
		$("div#controlPage3").css("display", "none");	
		$("div#controlPage4").css("display", "none");	
		$("div#controlPage5").css("display", "none");	
		$("div#controlPage6").css("display", "none");	
		$("div#controlPage7").css("display", "none");	
		$("div#controlPage8").css("display", "none");	
		$("div#controlPage9").css("display", "none");	

		$("div#"+showThis).css("display", "inherit"); 
	}
	// page 1

	$scope.verifyPage1Fields = function() {

		// business logic goes here to verify data entered is correct

		$scope.controlPage('controlPage2')
	}

	// page 2
	$scope.controlPage2CheckboxChanged = function() {

		if ($("#controlPage2Checkbox1.md-checked").length) {
			/* checkbox was checked */
			$("#controlPage2Next").removeClass("controlButtonActive");
			$("#controlPage2Next").addClass("controlButtonDisabled");
		} else {
			/* checkbox was unchecked */
			$("#controlPage2Next").removeClass("controlButtonDisabled");
			$("#controlPage2Next").addClass("controlButtonActive");
		}
	};

	$scope.controlPage2NextClicked = function() {

		if ($("#controlPage2Checkbox1.md-checked").length) {
			$scope.controlPage('controlPage3');
		}
	};

	// page 3
	$scope.selectRadioPaymentModel; 		
	$scope.showPayment = function(state) {
		if (state == "on") {
			$("div#echeckFields").css("display", "inherit");
		} else {
			$("div#echeckFields").css("display", "none");
		}
	}

	$scope.controlPage3CheckboxChanged = function() {

		if ($("#controlPage3Checkbox.md-checked").length) {
			/* checkbox was checked */
			$("#controlPage3Next").removeClass("uhcLightBlue");
			$("#controlPage3Next").addClass("uhcDisabledLightBlue");
		} else {
			/* checkbox was unchecked */
			$("#controlPage3Next").removeClass("uhcDisabledLightBlue");
			$("#controlPage3Next").addClass("uhcLightBlue");
			$("#controlPage3Checkbox").removeClass("uhcFontBold");
		}
	};

	$scope.controlPage3NextClicked = function() {

		if ($("#controlPage3Checkbox.md-checked").length) {
			$scope.controlPage('controlPage4');
		} else {
			$("#controlPage3Checkbox").addClass("uhcFontBold");
		}
	};

	// page TBD
	$scope.controlPagetbdNextClicked = function() {

		if ($("#controlPageTBDCheckbox.md-checked").length) {
			$scope.controlPage('controlPageTBD');
		} else {
			$("#controlPageTBDCheckbox").addClass("uhcFontBold");
		}
	};

}]);

//// END Control Page Controller 

// END AngularJS

// BEGIN Generic Javascript 
// The following code does not need to be inside a specific Angular Controller

// NONE

// END Generic Javascript