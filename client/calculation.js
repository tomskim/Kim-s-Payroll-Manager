/* All the specific values are to be updated yearly */
/* Based on https://www.canada.ca Payroll Deductions tables */
/* As of 2017 */

var MAX_PENSION_EARNING_AB = 55300;
var MAX_PENSION_EARNING_BC = 55300;
var MAX_PENSION_EARNING_ON = 55300;
var MAX_PENSION_EARNING_SK = 55300;

var MAX_EMPLOYEE_CONTRIBUTION_AB = 2564.10;
var MAX_EMPLOYEE_CONTRIBUTION_BC = 2564.10;
var MAX_EMPLOYEE_CONTRIBUTION_ON = 2564.10;
var MAX_EMPLOYEE_CONTRIBUTION_SK = 2564.10;

var ANNUAL_BASIC_EXEMPTION_AB = 3500;
var ANNUAL_BASIC_EXEMPTION_BC = 3500;
var ANNUAL_BASIC_EXEMPTION_ON = 3500;
var ANNUAL_BASIC_EXEMPTION_SK = 3500;

var CONTRIBUTION_RATE_AB = 0.0495;
var CONTRIBUTION_RATE_BC = 0.0495;
var CONTRIBUTION_RATE_ON = 0.0495;
var CONTRIBUTION_RATE_SK = 0.0495;

var MAX_ANNUAL_EARNING_AB = 51300;
var MAX_ANNUAL_EARNING_BC = 51300;
var MAX_ANNUAL_EARNING_ON = 51300;
var MAX_ANNUAL_EARNING_SK = 51300;

var EI_PREMIUM_RATE_AB = 0.0163;
var EI_PREMIUM_RATE_BC = 0.0163
var EI_PREMIUM_RATE_ON = 0.0163;
var EI_PREMIUM_RATE_SK = 0.0163;

var MAX_ANNUAL_PREMIUM_AB = 836.19;
var MAX_ANNUAL_PREMIUM_BC = 836.19;
var MAX_ANNUAL_PREMIUM_ON = 836.19;
var MAX_ANNUAL_PREMIUM_SK = 836.19;

var BASIC_PERSONAL_AMOUNT_AB = 11635;
var BASIC_PERSONAL_AMOUNT_BC = 10208;
var BASIC_PERSONAL_AMOUNT_ON = 10171;
var BASIC_PERSONAL_AMOUNT_SK = 16065;

var CANADA_EMPLOYMENT_CREDIT_AB = 1178;
var CANADA_EMPLOYMENT_CREDIT_BC = 1178;
var CANADA_EMPLOYMENT_CREDIT_ON = 1178;
var CANADA_EMPLOYMENT_CREDIT_SK = 1178;

/* Federal Tax Rates and Income Thresholds in descending order */

var FED_TAXABLE_INCOME = new Array(202800.01, 142353.01, 91831.01, 45916.01, 0);
var FED_TAX_RATE = new Array(0.33, 0.29, 0.26, 0.205, 0.15);
var FED_TAX_CONSTANT = new Array(19959, 11847, 7576, 2525, 0);

/* Provincial Tax Rates and Income Thresholds in descending order */

var PROV_TAXABLE_INCOME_AB = new Array(303900.01, 202600.01, 151950.01, 126625.01, 0);
var PROV_TAX_RATE_AB = new Array(0.15, 0.14, 0.13, 0.12, 0.1);
var PROV_TAX_CONSTANT_AB = new Array(9117, 6078, 4052, 2533, 0);

var PROV_TAXABLE_INCOME_BC = new Array(108460.01, 89320.01, 77797.01, 38898.01, 0);
var PROV_TAX_RATE_BC = new Array(0.147, 0.1229, 0.1050, 0.0770, 0.0506);
var PROV_TAX_CONSTANT_BC = new Array(7418, 4804, 3205, 1027, 0);

var PROV_TAXABLE_INCOME_ON = new Array(220000.01, 150000.01, 84404.01, 42201.01, 0);
var PROV_TAX_RATE_ON = new Array(0.1316, 0.1216, 0.1116, 0.0915, 0.0505);
var PROV_TAX_CONSTANT_ON = new Array(7127, 4927, 3427, 1730, 0);

var PROV_TAXABLE_INCOME_SK = new Array(129214.01, 45225.01, 0);
var PROV_TAX_RATE_SK = new Array(0.145, 0.125, 0.105);
var PROV_TAX_CONSTANT_SK = new Array(3489, 905, 0);

var PROV_BASIC_PERSONAL_AMOUNT_AB = 18690;
var PROV_BASIC_PERSONAL_AMOUNT_BC = 10208;
var PROV_BASIC_PERSONAL_AMOUNT_ON = 10171;
var PROV_BASIC_PERSONAL_AMOUNT_SK = 16065;

function dateformat(date){
	var yyyy = date.getFullYear();
	var mm = date.getMonth()+1;
	var dd = date.getDate();
	mm = ('0' + mm).slice(-2);
	dd = ('0' + dd).slice(-2);
	var result = yyyy + '/' + mm + '/' + dd;
	return result;
}


createPayrollStatement = function(){
	var companyData = Session.get("basicInfoData");
	var employeeInfoData = Session.get("employeeInfoData");
	var employeeData = [];
	var employeeNum = employeeInfoData.length;
	for(k=0; k < employeeNum; ++k){
		employeeData.push(employeeInfoData[k].currentData);
	}
	var resultData = [];

	var companyProvince = companyData.province;
	var frequency = companyData.freq;
	frequency = (frequency == "Monthly (12 times a year)") ? 12 : ((frequency == "Biweekly (26 times a year)") ? 26 : 24);
	console.log(frequency);
	var maxPensionEarning = 0;
	var maxEmployeeContribution = 0;
	var annualBasicExemption = 0;
	var contributionRate = 0;
	var EIPremiumRate = 0;
	var maxAnnualEarning = 0;
	var maxAnnualPremium = 0;
	var basicPersonalAmount = 0;
	var canadaEmploymentCredit = 0;
	var fedTaxableIncome = FED_TAXABLE_INCOME;
	var fedTaxRate = FED_TAX_RATE;
	var fedTaxConstant = FED_TAX_CONSTANT;
	var provTaxableIncome = [];
	var provTaxRate = [];
	var provTaxConstant = [];
	var provBasicPersonalAmount = 0;
	switch(companyProvince){
		case 'AB':
			maxPensionEarning = MAX_PENSION_EARNING_AB;
			maxEmployeeContribution = MAX_EMPLOYEE_CONTRIBUTION_AB;
			annualBasicExemption = ANNUAL_BASIC_EXEMPTION_AB;
			contributionRate = CONTRIBUTION_RATE_AB;
			EIPremiumRate = EI_PREMIUM_RATE_AB;
			maxAnnualEarning = MAX_ANNUAL_EARNING_AB;
			maxAnnualPremium = MAX_ANNUAL_PREMIUM_AB;
			basicPersonalAmount = BASIC_PERSONAL_AMOUNT_AB;
			canadaEmploymentCredit = CANADA_EMPLOYMENT_CREDIT_AB;
			provTaxableIncome = PROV_TAXABLE_INCOME_AB;
			provTaxRate = PROV_TAX_RATE_AB;
			provTaxConstant = PROV_TAX_CONSTANT_AB;
			provBasicPersonalAmount = PROV_BASIC_PERSONAL_AMOUNT_AB;
			break;
		case 'BC':
			maxPensionEarning = MAX_PENSION_EARNING_BC;
			maxEmployeeContribution = MAX_EMPLOYEE_CONTRIBUTION_BC;
			annualBasicExemption = ANNUAL_BASIC_EXEMPTION_BC;
			contributionRate = CONTRIBUTION_RATE_BC;
			EIPremiumRate = EI_PREMIUM_RATE_BC;
			maxAnnualEarning = MAX_ANNUAL_EARNING_BC;
			maxAnnualPremium = MAX_ANNUAL_PREMIUM_BC;
			basicPersonalAmount = BASIC_PERSONAL_AMOUNT_BC;
			canadaEmploymentCredit = CANADA_EMPLOYMENT_CREDIT_BC;
			provTaxableIncome = PROV_TAXABLE_INCOME_BC;
			provTaxRate = PROV_TAX_RATE_BC;
			provTaxConstant = PROV_TAX_CONSTANT_BC;
			provBasicPersonalAmount = PROV_BASIC_PERSONAL_AMOUNT_BC;
			break;
		case 'ON':
			maxPensionEarning = MAX_PENSION_EARNING_ON;
			maxEmployeeContribution = MAX_EMPLOYEE_CONTRIBUTION_ON;
			annualBasicExemption = ANNUAL_BASIC_EXEMPTION_ON;
			EIPremiumRate = EI_PREMIUM_RATE_ON;
			maxAnnualEarning = MAX_ANNUAL_EARNING_ON;
			maxAnnualPremium = MAX_ANNUAL_PREMIUM_ON;
			basicPersonalAmount = BASIC_PERSONAL_AMOUNT_ON;
			canadaEmploymentCredit = CANADA_EMPLOYMENT_CREDIT_ON;
			provTaxableIncome = PROV_TAXABLE_INCOME_ON;
			provTaxRate = PROV_TAX_RATE_ON;
			provTaxConstant = PROV_TAX_CONSTANT_ON;
			provBasicPersonalAmount = PROV_BASIC_PERSONAL_AMOUNT_ON;
			break;
		case 'SK':
			maxPensionEarning = MAX_PENSION_EARNING_SK;
			maxEmployeeContribution = MAX_EMPLOYEE_CONTRIBUTION_SK;
			annualBasicExemption = ANNUAL_BASIC_EXEMPTION_SK;
			EIPremiumRate = EI_PREMIUM_RATE_SK;
			maxAnnualEarning = MAX_ANNUAL_EARNING_SK;
			maxAnnualPremium = MAX_ANNUAL_PREMIUM_SK;
			basicPersonalAmount = BASIC_PERSONAL_AMOUNT_SK;
			canadaEmploymentCredit = CANADA_EMPLOYMENT_CREDIT_SK;
			provTaxableIncome = PROV_TAXABLE_INCOME_SK;
			provTaxRate = PROV_TAX_RATE_SK;
			provTaxConstant = PROV_TAX_CONSTANT_SK;
			provBasicPersonalAmount = PROV_BASIC_PERSONAL_AMOUNT_SK;
			break;
	}

	for(var e=0; e < employeeNum; ++e){
		var employee = employeeData[e];
		var vpr = employee.vpr;
		vpr = (vpr == "0%") ? 0 : ((vpr == "4%") ? 0.04 : 0.06);
		/* Basic calculation */
		var amount = employee.workhour * employee.workrate;
		var vacPay = amount * vpr;
		var grossWage = amount + vacPay;
		var yearlyGrossWage = grossWage * frequency;

		/* Calculating CPP */
		var yearlyCPP = (yearlyGrossWage > maxPensionEarning) ? maxEmployeeContribution :
			(yearlyGrossWage - annualBasicExemption) * contributionRate;
		var CPP = yearlyCPP / frequency;
		CPP = (CPP < 0) ? 0 : CPP;

		/* Calculating EI */
		var yearlyEI = (yearlyGrossWage > maxAnnualEarning) ? maxAnnualPremium :
			(yearlyGrossWage * EIPremiumRate); 
		var EIDeduction = yearlyEI / frequency;
		EIDeduction = (EIDeduction < 0) ? 0 : EIDeduction;

		/* Calculating Federal Tax */
		var CEC = Math.min(yearlyGrossWage, canadaEmploymentCredit);
		var taxableIncome = yearlyGrossWage - basicPersonalAmount - yearlyCPP - yearlyEI - CEC;
		var taxBracketNumber = fedTaxableIncome.length;
		var taxBracket = taxBracketNumber - 1;
		for(i=0; i < taxBracketNumber; ++i){
			if(fedTaxableIncome[i] <= taxableIncome){
				taxBracket = i;
				break;
			}
		}
		var yearlyTF = taxableIncome * fedTaxRate[taxBracket] - fedTaxConstant[taxBracket];
		var TF = yearlyTF / frequency;
		TF = (TF < 0) ? 0 : TF;

		/* Calculating Provincial Tax */
		var taxableIncomeProvincial = yearlyGrossWage - provBasicPersonalAmount - yearlyCPP - yearlyEI;
		var provTaxBracketNumber = provTaxableIncome.length;
		var provTaxBracket = provTaxBracketNumber - 1;
		for(j=0; j < provTaxBracketNumber; ++j){
			if(provTaxableIncome[j] <= taxableIncomeProvincial){
				provTaxBracket = j;
				break;
			}
		}
		var yearlyTP = taxableIncomeProvincial * provTaxRate[provTaxBracket] - provTaxConstant[provTaxBracket];
		var TP = yearlyTP / frequency;
		TP = (TP < 0) ? 0 : TP;

		/* Deductions and net pay */
		var totalDeduction = CPP + EIDeduction + TF + TP;
		var netPay = grossWage - totalDeduction;

		resultData.push({
			"companyname": companyData.name,
			"companybusinessnumber": companyData.businessnumber,
			"companyaddress": companyData.address,
			"companyprovince": companyData.province,
			"companycity": companyData.city,
			"companypostalcode": companyData.postalcode,
			"employeenumber": employee.employeeNumber,
			"employeename": employee.name,
			"employeesinnumber": employee.sinnumber,
			"employeeaddress": employee.address,
			"employeeprovince": employee.province,
			"employeecity": employee.city,
			"employeepostalcode": employee.postalcode,
			"startdate": employee.startdate,
			"enddate": employee.enddate,
			"payday": employee.payday,
			"workhour": employee.workhour,
			"workrate": "$" + employee.workrate + "/hour",
			"salary": "$" + amount.toFixed(2),
			"salaryytd": "$" + amount.toFixed(2),
			"vacpay": "$" + vacPay.toFixed(2),
			"vacpayytd": "$" + vacPay.toFixed(2),
			"grosswage": "$" + grossWage.toFixed(2),
			"grosswageytd": "$" + grossWage.toFixed(2),
			"cpp": "$" + CPP.toFixed(2),
			"cppytd": "$" + CPP.toFixed(2),
			"ei": "$" + EIDeduction.toFixed(2),
			"eiytd": "$" + EIDeduction.toFixed(2),
			"fedtax": "$" + TF.toFixed(2),
			"fedtaxytd": "$" + TF.toFixed(2),
			"provtax": "$" + TP.toFixed(2),
			"provtaxytd": "$" + TP.toFixed(2),
			"deductiontotal": "$" + totalDeduction.toFixed(2),
			"deductiontotalytd": "$" + totalDeduction.toFixed(2),
			"grosspay": "$" + grossWage.toFixed(2),
			"grosspayytd": "$" + grossWage.toFixed(2),
			"deduction": "$" + totalDeduction.toFixed(2),
			"deductionytd": "$" + totalDeduction.toFixed(2),
			"netpay": "$" + netPay.toFixed(2),
			"netpayytd": "$" + netPay.toFixed(2)
		});
	}
	return resultData;
}