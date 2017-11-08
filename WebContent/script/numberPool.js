var numberPool = [];
var lowestNumberKey = 0;

/*
 * Remove the lowest available number from the pool.
 */
function removeLowest() {
	if (lowestNumberKey < numberPool.length) {
		delete numberPool[lowestNumberKey];
		alert("Lowest Key " + (lowestNumberKey + 1) + " removed");
		displayPool();
		lowestNumberKey++;

		// move to next key if pointer is at key already retrieved
		while (lowestNumberKey < numberPool.length) {
			if (numberPool[lowestNumberKey] == undefined)
				lowestNumberKey++;
			else
				break;
		}

		// if pool is empty after remove reset app
		if (numberPool.length == lowestNumberKey) {
			totalAppReset();
			$('#numberPoolSize').val("");
		}
	}
}

/*
 * Return a number to the pool. Verify the value is not currently in the pool.
 * and the number is within the pool range.
 */

function returnNumber() {
	var returnValue = $('#returnValue').val();

	if (isValidInput(returnValue)) {

		if (numberPool[returnValue - 1] != undefined) {
			alert("Number is already in number pool");
		} else if (returnValue <= numberPool.length) {
			// check if lowest is being returned to pool
			if (lowestNumberKey > returnValue - 1)
				lowestNumberKey = returnValue - 1

			numberPool[returnValue - 1] = returnValue;
			displayPool();
			alert("returned " + returnValue + " to the pool"); 
		} else {
			alert("number larger than pool max limit")
		}
	} else {
		$('#returnValue').val("");
	}
}
/*
 * Load the initial number pool based on the user specified size
 */
function initNumberPool() {
	// reset application on initialize click
	totalAppReset();

	var i = 0;
	var inputValue = $('#numberPoolSize').val();
	if (isValidInput(inputValue)) {
		while (i < inputValue) {
			numberPool[i] = i + 1;
			i++;
		}
		displayPool();

		alert("Pool Initialize to " + numberPool.length);
		$('#removeBtn').removeClass('disabled').prop('disabled', false);
		$('#returnBtn').removeClass('disabled').prop('disabled', false);
		$('#returnValue').removeClass('disabled').prop('disabled', false);

	} else {
		$('#numberPoolSize').html("");
	}

}
/*
 * Display number pool. Display is limited to pools with 10,000 enteries. A pool
 * larger will not display.. limit memory issues
 */
function displayPool() {
	if (numberPool.length <= 10000)
		document.getElementById("poolDisplay").innerHTML = numberPool;
	else
		$('#poolDisplay').html("[too large to display]");
}

/* validate uses number input */
function isValidInput(inputValue) {
	var valid = true;
	if (isNaN(inputValue) || inputValue == "") {
		alert("Please enter a numeric value");
		valid = false;
	}
	return valid;
}

/*
 * Reset number pool and UI component on user initialization; initilize button
 */
function totalAppReset() {
	numberPool = [];
	lowestNumberKey = 0;
	$('#returnValue').val("");
	$('#poolDisplay').html("");
	$('#removeBtn').removeClass('disabled').prop('disabled', true);
	$('#returnBtn').removeClass('disabled').prop('disabled', true);
	$('#returnValue').removeClass('disabled').prop('disabled', true);
}