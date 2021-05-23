//Add dynamic form entry
var rowCount = 0;
function addMoreRows(frm) {
	rowCount++;
	var recRow = "<tr id='rowCount" + rowCount + "'>";
	recRow += "<td><input type='text' name='plan_return_rate[" + rowCount + "]'  class='plan_return_rate form-control'></td>";
	recRow += "<td><input type='text' name='plan_minimum_deposit[" + rowCount + "]'  class='plan_minimum_deposit form-control'></td>";
	recRow += "<td><input type='text' name='plan_maximum_deposit[" + rowCount + "]' class='plan_maximum_deposit form-control'></td>";
	recRow += "<td><input type='text' name='plan_investment_period[" + rowCount + "]' class='plan_investment_period form-control'></td>";
	recRow += "<td><a href='javascript:void(0);' onclick='removeRow(" + rowCount + ");'>Delete</a></td></tr>";
	$('#addedRows').append(recRow);
}

//delete form entry row
function removeRow(removeNum) {
	$('#rowCount' + removeNum).remove();
}

//add submit button, this way you can force app to use javascript
function addBtn() {
	btnCode = "<tr><td colspan='5'>";
	btnCode += "<button type='submit' name='add_plan' class='btn btn-primary'>Add Plan</button>";
	btnCode += "</td></tr>";

	editCode = "<tr><td colspan='5'>";
	editCode += "<div class='col-md-12 text-right'><button type='submit' name='edit_plan' class='btn btn-primary edit-btn'>Edit Plan</button>";
	editCode += "&nbsp;&nbsp;<button type='submit' name='delete_plan' class='btn btn-primary'>Delete Plan</button></div>";
	editCode += "</td></tr>";

	$('#form_button').append(btnCode);
	$('.edit_form_button').each(function () {
		$(this).append(editCode);
	})
}

//validate that all entry in an array is same
Array.prototype.allValuesSame = function () {
	for (var i = 1; i < this.length; i++) {
		if (this[i] !== this[0])
			return false;
	}
	return true;
}

//check match float pattern
function isValidEntry(n, allow_fraction_part = true) {
	//absolute int and float test conditions
	if (allow_fraction_part) {
		var pattern = /^[0-9]{1,7}(\.[0-9]{1,2})?$/;
	} else {
		var pattern = /^[0-9]{1,7}$/;
	}

	//don't progress further if test is not passed
	if (!pattern.test(n)) {
		return false;
	}

	//return the allowed data type
	if (allow_fraction_part) {
		return parseFloat(n);
	}
	return parseInt(n);
};

//validate form entry field before server submission
function validateInvestmentPlan(
	return_rate_list,
	min_list,
	max_list,
	return_period_list
) {
	//loop thru each row and validate data accross it
	var counter = 0;
	while (counter < return_rate_list.length) {
		rate = isValidEntry(return_rate_list[counter]);
		minimum = isValidEntry(min_list[counter]);
		maximum = isValidEntry(max_list[counter]);
		period = isValidEntry(return_period_list[counter], false);

		if (!rate || !minimum || !maximum || !period) {
			error = "When fill plan form put Number only. Do not put any sign";
			error += "like $ or % You can not use alphabeths also, only numbers";
			error += " or numbers with decimal.\n\n";
			error += "please correct error."
			return error;
		}

		if (minimum > maximum) {
			error = "Minimum Value cannot be greater than Maximum value in one of ";
			error += " your plan rows.\n\ncheck and correct it";
			return error;
		}
		counter++;
	}

	//confirm all the return list value are same (they must be)
	var b = return_period_list.allValuesSame();

	if (b == false) {
		error = "For the same plan all the options under it must have same ";
		error += "Profit Period. This is Number of days profit is paid.";
		return error;
	}
}


$('document').ready(function () {
	//add button to plan form
	addBtn();

	//add more plan row if user click add button
	$('#add_btn').on('click', function () {
		addMoreRows(this.form);
	});

	//validate form before submit
	$("#plan_form").on('submit', function () {
		//validate mimimum,maximum,return rate and return days
		var return_rate_list = [];
		var min_list = [];
		var max_list = [];
		var return_period_list = [];

		$('.plan_return_rate').each(function () {
			return_rate_list.push($(this).val());
		});

		$('.plan_minimum_deposit').each(function () {
			min_list.push($(this).val());
		});

		$('.plan_maximum_deposit').each(function () {
			max_list.push($(this).val());
		});

		$('.plan_investment_period').each(function () {
			return_period_list.push($(this).val());
		});

		var error = validateInvestmentPlan(
			return_rate_list,
			min_list,
			max_list,
			return_period_list
		);

		if (error) {
			window.alert(error);
			return false;
		}
	});
});
