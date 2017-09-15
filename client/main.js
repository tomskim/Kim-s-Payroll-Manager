import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import './main.html';


/* City lists in each respective province */

var cityAB = ["Airdrie", "Brooks", "Calgary", "Camrose", "Chestermere", "Cold Lake",
    		"Edmonton", "Fort Saskatchewan", "Grande Prairie", "Lacombe", "Leduc", "Lethbridge",
    		"Lloydminster", "Medicine Hat", "Red Deer", "Spruce Grove", "St. Albert", "Wetaskiwin"];

var cityBC = ["Abbotsford", "Armstrong", "Burnaby", "Campbell River", "Castlegar", "Chilliwack",
			"Colwood", "Coquitlam", "Courtenay", "Cranbrook", "Dawson Creek", "Duncan", "Enderby",
			"Fernie", "Fort St. John", "Grand Forks", "Greenwood", "Kamloops", "Kelowna", "Kimberley",
			"Langford", "Langley", "Maple Ridge", "Merritt", "Nanaimo", "Nelson", "New Wetminster",
			"North Vancouver", "Parksville", "Penticton", "Pitt Meadows", "Port Alberni", "Port Coquitlam",
			"Port Moody", "Powell River", "Prince George", "Prince Rupert", "Quesnel", "Revelstoke",
			"Richmond", "Rossland", "Salmon Arm", "Surrey", "Terrace", "Trail", "Vancouver", "Vernon",
			"Victoria", "West Kelowna", "White Rock", "William Lake"];

var cityON = ["Barrie", "Belleville", "Brampton", "Brant", "Brantford", "Brockville", "Burlington",
			"Cambridge", "Clarence-Rockland", "Cornwall", "Dryden", "Elliot Lake", "Greater Sudbury",
			"Guelph", "Haldimand County", "Hamilton", "Kawartha Lakes", "Kenora", "Kingston", "Kitchener",
			"London", "Markham", "Mississauga", "Niagara Falls", "Norfolk County", "North Bay", "Orillia",
			"Oshawa", "Ottawa", "Owen Sound", "Pembroke", "Peterborough", "Pickering", "Port Colborne",
			"Prince Edward County", "Quine West", "Sarnia", "Sault Ste. Marie", "St. Catharines", "St. Thomas",
			"Stratford", "Temiskaming Shores", "Thorold", "Thunder Bay", "Timmins", "Toronto", "Vaughan",
			"Waterloo", "Welland", "Windsor", "Woodstock"];

var citySK = ["Estevan", "Flin Flon", "Humboldt", "Lloydminster", "Martensville", "Meadow Lake",
    		"Melfort", "Melville", "Moose Jaw", "North Battleford", "Prince Albert", "Regina", "Saskatoon",
    		"Swift Current", "Warman", "Weyburn", "Yorkton"];

function employeeInformation(intID){
	return {
		"employeeNumber": intID,
		"name": "Not specified",
		"sinnumber": "Not specified",
		"address": "Not specified",
		"province": "Not specified",
		"city": "Not specified",
		"postalcode": "Not specified",
		"startdate": "Not specified",
		"enddate": "Not specified",	
		"payday": "Not specified",	
		"workhour": "Not specified",	
		"workrate": "Not specified",	
		"eideduction": "Not specified",	
		"vpr": "Not specified",
		"editEmployee": "editEmployee" + intID,
		"editMoreEmployee": "editMoreEmployee" + intID,
		"saveEmployee": "saveEmployee" + intID,
		"saveMoreEmployee": "saveMoreEmployee" + intID,
		"employeeNameID": "eName" + intID,
		"sinNumberID": "eSIN" + intID,
		"employeeAddressID": "eAddr" + intID,
		"employeeProvinceID":"eProv" + intID,
		"employeeCityID": "eCity" + intID,
		"employeePostalCodeID": "ePC" + intID,
		"employeeStartDateID": "eSD" + intID,
		"employeeEndDateID": "eED" + intID,
		"employeePayDayID": "ePD" + intID,
		"employeeWorkHourID": "eWH" + intID,
		"employeeWorkRateID": "eWR" + intID,
		"employeeEIID": "eEI" + intID,
		"employeeVPRID": "eVPR" + intID
	}
}
/* Set default values */
if (Meteor.isClient) {
    reCAPTCHA.config({
        publickey: //<Public key>
    });

	Session.set("currentPage", "indexPage");
	var defaultBasicInfoData = { 
		"name": "Not specified", 
		"businessnumber": "Not specified",
		"freq": "Not specified",
		"address": "Not specified",
		"province": "Not specified",
		"city": "Not specified",
		"postalcode": "Not specified"
	};
	Session.set("basicInfo", "basicInfo");
	Session.set("basicInfoData", defaultBasicInfoData);
	var employeeData = [];
	employeeData.push({
		"template": "eachEmployee",
		"currentData": employeeInformation(1)	
	});
	Session.set("employeeInfoData", employeeData);
}

/* Showing pages from Parent page (main) */

Template.main.helpers({
	page: function(){
		return Session.get("currentPage");
	}
})

Template.main.events({
	'click #homepage': function(event){
		Session.set("currentPage", "indexPage");
	}
})

/* "Try" events */
Template.home.events({
	'click #tryitnow': function(event, template){
		Session.set("currentPage", "personalInfoGUEST");
	}
})

Template.login.events({
	'click #tryasguest': function(event, template){
		Session.set("currentPage", "personalInfoGUEST");
	}
})

/* Basic info Display <-> Edit Option */

Template.personalInfoGUEST.helpers({
	basicInfo: function(){
		return Session.get("basicInfo");
	},
	basicInfoData: function(){
		return Session.get("basicInfoData");
	}
})

Template.basicInfo.events({
	'click #editBasicInfo': function(event, template){
		var companyName = $('#cName').html();
		companyName = (companyName == "Not specified") ? "" : companyName;
		var businessNumber = $('#bNumber').html();
		businessNumber = (businessNumber == "Not specified") ? "" : businessNumber;
		var frequency = $('#pFreq').html();
		var monthlySelected = biweeklySelected = semimonthlySelected = '';
		switch(frequency){
			case "Monthly (12 times a year)":
				monthlySelected = 'selected';
				break;
			case "Biweekly (26 times a year)":
				biweeklySelected = 'selected';
				break;
			case "Semi-Monthly (24 times a year)":
				semimonthlySelected = 'selected';
				break;
			default:
				break;
		}
		var address = $('#cAddress').html();
		address = (address == "Not specified") ? "" : address;
		var province = $('#cProvince').html();
		var provinceSelected = province + "Selected";
		var city = $('#cCity').html();
		Session.set("selectedCityBasicInfo", city);
		var postalCode = $('#cPostalcode').html();
		postalCode = (postalCode == "Not specified") ? "" : postalCode;
		var basicInfoEditData = {
			"name": companyName,
			"businessnumber": businessNumber,
			"monthlySelected": monthlySelected,
			"biweeklySelected": biweeklySelected,
			"semimonthlySelected": semimonthlySelected,
			"address": address,
			"province": province,
			"city": city,
			"postalcode": postalCode
		}
		basicInfoEditData[provinceSelected] = 'selected';
		Session.set("basicInfo", "basicInfoEdit");
		Session.set("basicInfoData", basicInfoEditData);
	}
});

Template.basicInfoEdit.events({
	'click #saveBasicInfo': function(event, template){
		var companyName = $('#companyName').val();
		companyName = (companyName == "") ? "Not specified" : companyName;
		var businessNumber = $('#businessNumber').val();
		businessNumber = (businessNumber == "") ? "Not specified" : businessNumber;
		var frequency = $('#freq').find(":selected").text();

		var address = $('#address1').val();
		address = (address == "") ? "Not specified" : address;
		var province = $('#provincelist').find(":selected").text();
		province = (province == "") ? "Not specified" : province;
		var city = $('#citylist').find(":selected").text();
		city = (city == "") ? "Not specified" : city;
		var postalCode = $('#postalCode').val();
		postalCode = (postalCode == "") ? "Not specified" : postalCode;

		var basicInfoData = {
			"name": companyName, 
			"businessnumber": businessNumber,
			"freq": frequency,
			"address": address,
			"province": province,
			"city": city,
			"postalcode": postalCode
		}
		Session.set("basicInfo", "basicInfo");
		Session.set("basicInfoData", basicInfoData);
	}
});


/* Employee info Display <-> Edit Option */

Template.personalInfoGUEST.helpers({
	employeeInfo: function(){
		return "employeeInfo";
	},
	employeeInfoData: function(){
		return Session.get("employeeInfoData");
	}
});

Template.employeeInfo.helpers({
	employeeInfoData: function(){
		return Session.get("employeeInfoData");
	}
});

Template.eachEmployee.events({
	'click .editEmployee': function(event, template){
		var employeeNumber = event.target.id;
		employeeNumber = employeeNumber.replace("editEmployee", "");
		employeeNumber = employeeNumber.replace("\/", "");

		var employeeName = $('#eName' + employeeNumber).html();
		employeeName = (employeeName == "Not specified") ? "" : employeeName;
		var employeeSIN = $('#eSIN' + employeeNumber).html();
		employeeSIN = (employeeSIN == "Not specified") ? "" : employeeSIN;
		var address = $('#eAddr' + employeeNumber).html();
		address = (address == "Not specified") ? "" : address;
		var province = $('#eProv' + employeeNumber).html();
		var provinceSelected = province + "Selected";
		var city = $('#eCity' + employeeNumber).html();
		Session.set("selectedCityEmployee" + employeeNumber, city);
		var postalCode = $('#ePC' + employeeNumber).html();
		postalCode = (postalCode == "Not specified") ? "" : postalCode;

		/* Update Accordingly */
		var currData = Session.get("employeeInfoData");
		currData[employeeNumber-1]["currentData"].employeeNumber = employeeNumber;
		currData[employeeNumber-1]["currentData"].name = employeeName;
		currData[employeeNumber-1]["currentData"].sinnumber = employeeSIN;
		currData[employeeNumber-1]["currentData"].address = address;
		currData[employeeNumber-1]["currentData"].postalcode = postalCode;
		currData[employeeNumber-1]["currentData"].city = city;
		currData[employeeNumber-1]["currentData"].saveEmployee = "saveEmployee" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeNameID = "employeeName" + employeeNumber;
		currData[employeeNumber-1]["currentData"].sinNumberID = "sinNumber" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeAddressID = "employeeAddress" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeProvinceID = "employeeProvince" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeCityID = "employeeCity" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeePostalCodeID = "employeePostalCode" + employeeNumber;
		currData[employeeNumber-1]["currentData"][provinceSelected] = "selected";
		currData[employeeNumber-1]["template"] = "eachEmployeeEdit";
		Session.set("employeeInfoData", currData);
	}
});

Template.eachEmployeeEdit.events({
	'click .saveEmployee': function(event, template){
		var employeeNumber = event.target.id;
		employeeNumber = employeeNumber.replace("saveEmployee", "");
		employeeNumber = employeeNumber.replace("\/", "");

		var employeeName = $('#employeeName' + employeeNumber).val();
		employeeName = (employeeName == "") ? "Not specified" : employeeName;
		var employeeSIN = $('#sinNumber' + employeeNumber).val();
		employeeSIN = (employeeSIN == "") ? "Not specified" : employeeSIN;
		var address = $('#employeeAddress' + employeeNumber).val();
		address = (address == "") ? "Not specified" : address;
		var province = $('#employeeProvince' + employeeNumber).find(":selected").text();
		province = (province == "") ? "Not specified" : province;
		var city = $('#employeeCity' + employeeNumber).find(":selected").text();
		city = (city == "") ? "Not specified" : city;
		var postalCode = $('#employeePostalCode' + employeeNumber).val();
		postalCode = (postalCode == "") ? "Not specified" : postalCode;

		/* Update Accordingly */
		var currData = Session.get("employeeInfoData");
		currData[employeeNumber-1]["currentData"].employeeNumber = employeeNumber;
		currData[employeeNumber-1]["currentData"].name = employeeName;
		currData[employeeNumber-1]["currentData"].sinnumber = employeeSIN;
		currData[employeeNumber-1]["currentData"].address = address;
		currData[employeeNumber-1]["currentData"].postalcode = postalCode;
		currData[employeeNumber-1]["currentData"].province = province;
		currData[employeeNumber-1]["currentData"].city = city;
		currData[employeeNumber-1]["currentData"].editEmployee = "editEmployee" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeNameID = "eName" + employeeNumber;
		currData[employeeNumber-1]["currentData"].sinNumberID = "eSIN" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeAddressID = "eAddr" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeProvinceID = "eProv" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeCityID = "eCity" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeePostalCodeID = "ePC" + employeeNumber;
		currData[employeeNumber-1]["template"] = "eachEmployee";
		Session.set("employeeInfoData", currData);
	}
});

Template.moreEachEmployee.events({
	'click .editMoreEmployee': function(event, template){
		var employeeNumber = event.target.id;
		employeeNumber = employeeNumber.replace("editMoreEmployee", "");
		employeeNumber = employeeNumber.replace("\/", "");
		var startDate = $('#eSD' + employeeNumber).html();
		startDate = (startDate == "Not specified") ? "" : startDate;
		var endDate = $('#eED' + employeeNumber).html();
		endDate = (endDate== "Not specified") ? "" : endDate;
		var payDay = $('#ePD' + employeeNumber).html();
		payDay = (payDay == "Not specified") ? "" : payDay;
		var workHour = $('#eWH' + employeeNumber).html();
		workHour = (workHour == "Not specified") ? "" : workHour;
		var workRate = $('#eWR' + employeeNumber).html();
		workRate = (workRate == "Not specified") ? "" : workRate;
		var ei = $('#eEI' + employeeNumber).html();
		var eiSelected = ei + "Selected";
		var vpr = $('#eVPR' + employeeNumber).html();
		vpr = vpr.replace("%", "");
		var vprSelected = "Selected" + vpr;

		/* Update Accordingly */
		var currData = Session.get("employeeInfoData");
		currData[employeeNumber-1]["currentData"].startdate = startDate;
		currData[employeeNumber-1]["currentData"].enddate = endDate;
		currData[employeeNumber-1]["currentData"].payday = payDay;
		currData[employeeNumber-1]["currentData"].workhour = workHour;
		currData[employeeNumber-1]["currentData"].workrate = workRate;
		currData[employeeNumber-1]["currentData"].eideduction = ei;
		currData[employeeNumber-1]["currentData"].vpr = vpr;
		currData[employeeNumber-1]["currentData"].saveMoreEmployee = "saveMoreEmployee" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeStartDateID = "employeeStartDate" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeEndDateID = "employeeEndDate" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeePayDayID = "employeePayDay" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeWorkHourID = "employeeWorkHour" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeWorkRateID = "employeeWorkRate" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeEIID = "employeeEI" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeVPRID = "employeeVPR" + employeeNumber;
		currData[employeeNumber-1]["currentData"][eiSelected] = "selected";
		currData[employeeNumber-1]["currentData"][vprSelected] = "selected";
		currData[employeeNumber-1]["template"] = "moreEachEmployeeEdit";
		Session.set("employeeInfoData", currData);
	}
});

Template.moreEachEmployeeEdit.events({
	'click .saveMoreEmployee': function(event, template){
		var employeeNumber = event.target.id;
		employeeNumber = employeeNumber.replace("saveMoreEmployee", "");
		employeeNumber = employeeNumber.replace("\/", "");
		var startDate = $('#employeeStartDate' + employeeNumber).val();
		startDate = (startDate == "") ? "Not specified" : startDate;
		var endDate = $('#employeeEndDate' + employeeNumber).val();
		endDate = (endDate == "") ? "Not specified" : endDate;
		var payDay = $('#employeePayDay' + employeeNumber).val();
		payDay = (payDay == "") ? "Not specified" : payDay;
		var workHour = $('#employeeWorkHour' + employeeNumber).val();
		workHour = (workHour == "") ? "Not specified" : workHour;
		var workRate = $('#employeeWorkRate' + employeeNumber).val();
		workRate = (workRate == "") ? "Not specified" : workRate;
		var ei = $('#employeeEI' + employeeNumber).find(":selected").text();
		var vpr = $('#employeeVPR' + employeeNumber).find(":selected").text();

		/* Update Accordingly */
		var currData = Session.get("employeeInfoData");
		currData[employeeNumber-1]["currentData"].startdate = startDate;
		currData[employeeNumber-1]["currentData"].enddate = endDate;
		currData[employeeNumber-1]["currentData"].payday = payDay;
		currData[employeeNumber-1]["currentData"].workhour = workHour;
		currData[employeeNumber-1]["currentData"].workrate = workRate;
		currData[employeeNumber-1]["currentData"].eideduction = ei;
		currData[employeeNumber-1]["currentData"].vpr = vpr;
		currData[employeeNumber-1]["currentData"].editMoreEmployee = "editMoreEmployee" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeStartDateID = "eSD" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeEndDateID = "eED" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeePayDayID = "ePD" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeWorkHourID = "eWH" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeWorkRateID = "eWR" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeEIID = "eEI" + employeeNumber;
		currData[employeeNumber-1]["currentData"].employeeVPRID = "eVPR" + employeeNumber;
		currData[employeeNumber-1]["template"] = "moreEachEmployee";
		Session.set("employeeInfoData", currData);
	}
});


/* More employee info Display <-> Edit Option */

Template.employeeInfoGUEST.helpers({
	moreEmployeeInfo: function(){
		return "moreEmployeeInfo";
	},
	moreEmployeeInfoData: function(){
		return Session.get("employeeInfoData");
	}
});

Template.moreEmployeeInfo.helpers({
	moreEmployeeInfoData: function(){
		return Session.get("employeeInfoData");
	}
});

Template.resultGUEST.helpers({
	resultData: function(){
		return Session.get("resultData");
	}
});


/* Fix the navigation bar at the top */

$(window).scroll(function(){
	var curScrollVal = $(window).scrollTop();
	if( curScrollVal > 175){
	    $('.nav').css({'position': 'fixed', 'top': 0});
	    $('#home').css({'padding-top': '180px'});
	}
	else{
	    $('.nav').css({'position': 'relative', 'top': 'auto'});
	    $('#home').css({'padding-top': '100px'});
	}
});


/* Anchor Scroll */

Template.navigatebar.events({
	'click a': function(event){
		$('html, body').animate({
        	scrollTop: $($(event.target).attr('href')).offset().top
   		 }, 500);
    	return false;
	}
});

Template.navigatebar.rendered = function(){
	var $navigationLinks = $('#navigation > ul > li > a');
	var $sections = $($(".section").get().reverse());
	var sectionIdTonavigationLink = {};
	$sections.each(function() {
		var id = $(this).attr('id');
		sectionIdTonavigationLink[id] = $('#navigation > ul > li > a[href=#' + id + ']');
	});

	function throttle(fn, interval) {
	    var lastCall, timeoutId;
	    return function () {
	        var now = new Date().getTime();
	        if (lastCall && now < (lastCall + interval) ) {
	            clearTimeout(timeoutId);
	            timeoutId = setTimeout(function () {
	                lastCall = now;
	                fn.call();
	            }, interval - (now - lastCall) );
	        } else {
	            lastCall = now;
	            fn.call();
	        }
	    };
	}

	function highlightNavigation() {
	    var scrollPosition = $(window).scrollTop();

	    $sections.each(function() {
	        var currentSection = $(this);
	        var sectionTop = currentSection.offset().top;
 
	        if (scrollPosition + 100 >= sectionTop) {
	            var id = currentSection.attr('id');
	            var $navigationLink = sectionIdTonavigationLink[id];
	            if (!$navigationLink.hasClass('active')) {
	                $navigationLinks.removeClass('active');
	                $navigationLink.addClass('active');
	            }
	            return false;
	        }
	    });
	}

	$(window).scroll( throttle(highlightNavigation,100) );
}

/* Scrolling words */

Template.home.rendered = function(){
	$('.texts').textillate({
	    minDisplayTime: 1000, 
	    in: { effect: 'flipInX', sync: true }, 
	    out :{  delay: 1, effect: 'lightSpeedOut', sync: true},
	    loop: true
	});
}


/* Sign In */

if(Meteor.isClient){
	Template.login.events({
		'submit form': function(event, template){
			event.preventDefault();
			var user = event.target.user_id.value;
			var pw = event.target.user_password.value;
			Meteor.loginWithPassword(user, pw);
		}
	})
	Template.registration.events({
		'submit form': function(event){
			event.preventDefault();
			var user = event.target.userId.value;
			var prof = event.target.userProfile.value;
			var mail = event.target.userEmail.value;
			var pw = event.target.userPassword.value;
			console.log(pw);
			Accounts.createUser({
				username: user,
				profile: prof,
				email: mail,
				password: pw
			});
		}
	})
}

function optionHTML(array, key){
	var strHTML = "";
	var arrlen = array.length;
	var selectedCity = (key == "") ? "" : Session.get(key);
	for(i=0; i < arrlen; ++i){
		if(array[i] == selectedCity){
			strHTML += "<option value=\"Option" + (i+1) + "\" selected>" + array[i] + "</option>";
		} else {
			strHTML += "<option value=\"Option" + (i+1) + "\">" + array[i] + "</option>";
		}
	}
	return strHTML;
}

Template.basicInfoEdit.rendered = function(){

	var selected = $('#provincelist').val();
	var citylist = [];
	if(selected == "AB"){
		citylist = cityAB;
	} else if(selected == "BC"){
		citylist = cityBC;
	} else if(selected == "ON"){
		citylist = cityON;
	} else if(selected == "SK"){
		citylist = citySK;
	}

	$("#citylist").html(optionHTML(citylist, "selectedCityBasicInfo"));

	
    $('#provincelist').on('change', function(){
    	
    	var selected = $(this).val();
    	var citylist = [];
    	if(selected == "AB"){
    		citylist = cityAB;
    	} else if(selected == "BC"){
    		citylist = cityBC;
    	} else if(selected == "ON"){
    		citylist = cityON;
    	} else if(selected == "SK"){
    		citylist = citySK;
    	}
    	$("#citylist").html(optionHTML(citylist, ""));
    }); 
}

Template.eachEmployeeEdit.rendered = function(){
	var employeeNumber = this.data.employeeNumber;
	employeeNumber = employeeNumber.replace("employeeProvince", "");
	employeeNumber = employeeNumber.replace("\/", "");
	var selected = $('#employeeProvince' + employeeNumber).val();
	var citylist = [];
	if(selected == "AB"){
		citylist = cityAB;
	} else if(selected == "BC"){
		citylist = cityBC;
	} else if(selected == "ON"){
		citylist = cityON;
	} else if(selected == "SK"){
		citylist = citySK;
	}
	$("#employeeCity" + employeeNumber).html(optionHTML(citylist, "selectedCityEmployee" + employeeNumber));

    $(".provincelist").on('change', function(){
    	var employeeNumber = event.target.id;
		employeeNumber = employeeNumber.replace("employeeProvince", "");
		employeeNumber = employeeNumber.replace("\/", "");

    	var selected = $(this).val();
    	var citylist = [];
    	if(selected == "AB"){
    		citylist = cityAB;
    	} else if(selected == "BC"){
    		citylist = cityBC;
    	} else if(selected == "ON"){
    		citylist = cityON;
    	} else if(selected == "SK"){
    		citylist = citySK;
    	}
    	
    	$("#employeeCity" + employeeNumber).html(optionHTML(citylist, ""));
    });
}

Template.moreEachEmployeeEdit.rendered = function(){
    $('.startdate').datepicker({
    	maxDate: new Date,
    	dateFormat: 'yy/mm/dd'
    });
    $('.enddate').datepicker({
    	maxDate: new Date,
    	dateFormat: 'yy/mm/dd'
    });
    $('.payday').datepicker({
    	maxDate: new Date,
    	dateFormat: 'yy/mm/dd'
    });
}
/* Dynamically adds/deletes employee fields */

Template.employeeInfo.events({
	'click #add': function(event){
		var currData = Session.get("employeeInfoData");
		var intId = currData.length + 1;
		var defaultEmployeeData = employeeInformation(intId);
		currData.push({
			"template": "eachEmployee",
			"currentData": defaultEmployeeData
		});
		Session.set("employeeInfoData", currData);
	},

	'click #delete': function(event){
		var currData = Session.get("employeeInfoData");
		var rowToDelete = currData.length;
		if(rowToDelete > 1){
			currData.pop();
			Session.set("employeeInfoData", currData);
		}
	},

	'click #next': function(event){
		var companyData = Session.get("basicInfoData");
		var currData = Session.get("employeeInfoData");
		
		/* Check if all the data is saved */
		if(Session.get("basicInfo") == "basicInfoEdit"){
			alert("Please save your company information!");
			return;
		}
		for(i=0; i < currData.length; ++i){
			if(currData[i]["template"] == "eachEmployeeEdit"){
				alert("Please save all of your employee information!");
				return;
			}
		}

		/* Check if all the data is entered */
		var missingInfos = [];
		if(companyData.name == "Not specified") missingInfos.push("Company's name");
		if(companyData.businessnumber == "Not specified") missingInfos.push("Company's business number");
		if(companyData.freq == "Not specified") missingInfos.push("Company's payment frequency");
		if(companyData.address == "Not specified") missingInfos.push("Company's address");
		if(companyData.province == "Not specified") missingInfos.push("Company's province");
		if(companyData.city == "Not specified") missingInfos.push("Company's city");
		if(companyData.postalcode == "Not specified") missingInfos.push("Company's postal code");

		for(j=0; j < currData.length; ++j){
			var necessaryData = currData[j]["currentData"];
			if(necessaryData.name == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s name");
			if(necessaryData.sinnumber == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s SIN number");
			if(necessaryData.address == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s address");
			if(necessaryData.province == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s province");
			if(necessaryData.city == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s city");
			if(necessaryData.postalcode == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s postal code");
		}
		if(missingInfos.length > 0){
			var alertMsg = "Missing the following information:\n";
			for(k=0; k < missingInfos.length; ++k){
				alertMsg += "* " + missingInfos[k] + "\n";
			}
			alert(alertMsg);
			return;
		}
		for(l=0; l < currData.length; ++l){
			currData[l]["template"] = "moreEachEmployee";
		}
		Session.set("currentPage", "employeeInfoGUEST");
		Session.set("employeeInfoData", currData);
	}
});

Template.moreEmployeeInfo.events({
	'click #prev': function(event){
		var currData = Session.get("employeeInfoData");
		for(l=0; l < currData.length; ++l){
			currData[l]["template"] = "eachEmployee";
		}
		Session.set("currentPage", "personalInfoGUEST");
		Session.set("employeeInfoData", currData);
	},
	'click #calc': function(event){
		var currEmployeeData = Session.get("employeeInfoData");
		var currCompanyData = Session.get("basicInfoData");
		/* Check if all the data is saved */
		for(i=0; i < currEmployeeData.length; ++i){
			if(currEmployeeData[i]["template"] == "moreEachEmployeeEdit"){
				alert("Please save all of your employee information!");
				return;
			}
		}

		/* Check if all the data is entered */
		var missingInfos = [];

		for(j=0; j < currEmployeeData.length; ++j){
			var necessaryData = currEmployeeData[j]["currentData"];
			if(necessaryData.startdate == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s start date");
			if(necessaryData.enddate == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s end date");
			if(necessaryData.payday == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s pay day");
			if(necessaryData.workhour == "Not specified" || isNaN(necessaryData.workhour)) 
				missingInfos.push("Employee #" + (j+1) + "'s work hours (not a valid number)");
			if(necessaryData.workrate == "Not specified" || isNaN(necessaryData.workrate)) 
				missingInfos.push("Employee #" + (j+1) + "'s work rate (not a valid number)");
			if(necessaryData.eideduction == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s EI deduction information");
			if(necessaryData.vpr == "Not specified") missingInfos.push("Employee #" + (j+1) + "'s vacation pay rate");
		}

		if(missingInfos.length > 0){
			var alertMsg = "Missing the following information:\n";
			for(k=0; k < missingInfos.length; ++k){
				alertMsg += "* " + missingInfos[k] + "\n";
			}
			alert(alertMsg);
			return;
		}
		var resultData = createPayrollStatement();
		Session.set("currentPage", "resultGUEST");
		Session.set("resultData", resultData);
	}
});

Template.resultGUEST.events({
	'click #restart': function(event){
		var defaultBasicInfoData = { 
			"name": "Not specified", 
			"businessnumber": "Not specified",
			"freq": "Not specified",
			"address": "Not specified",
			"province": "Not specified",
			"city": "Not specified",
			"postalcode": "Not specified"
		};
		Session.set("basicInfo", "basicInfo");
		Session.set("basicInfoData", defaultBasicInfoData);
		var employeeData = [];
		employeeData.push({
			"template": "eachEmployee",
			"currentData": employeeInformation(1)	
		});
		Session.set("employeeInfoData", employeeData);

		Session.set("currentPage", "personalInfoGUEST");
	},
	'click #prev1': function(event){
		var currData = Session.get("employeeInfoData");
		for(l=0; l < currData.length; ++l){
			currData[l]["template"] = "moreEachEmployee";
		}
		Session.set("currentPage", "employeeInfoGUEST");
		Session.set("employeeInfoData", currData);
	},
	'click #pdf': function(event){
		var pdfResultData = Session.get("resultData");

		Blaze.saveAsPDF(Template.pdfResult, {
			filename: "payrollStatement.pdf",
			data: pdfResultData,
			x: 28,
			y: 0
		});
	}
});

Template.contact_us.events({
	'click #send': function(event){ 

        var formData = {
        	'sender': $('#emailInput').val(),
        	'reason': $('#recipientInput').find(":selected").text(),
        	'content': $('#message').val()
        };
        //get the captcha data
        var captchaData = grecaptcha.getResponse();

        Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            // reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {
                console.log('Success!');
            }
        });
	}
})