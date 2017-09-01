const input = document.querySelector('input[type="text"]');

// "Job role" section variables
const jobSelector = document.querySelector('#title');
const otherOption = document.querySelector('option[value="other"]');
const otherLabel = document.querySelector('#other-label');
const otherInput = document.querySelector('#other-title');

// "T-shirt Section" section variables
const shirtDesignSelector = document.querySelector('#design');
const colorSection = document.querySelector('#colors-js-puns');
const colorSelector = document.querySelector('#color');
const jsPunsOption = document.querySelector('option[value="js puns"]');
const heartJsOption = document.querySelector('option[value="heart js"]');

// "Register for activities" section variables
const activitiesFieldset = document.querySelector('.activities');
const activitiesCheckboxes = document.querySelectorAll('.activities input');
const activities = document.querySelectorAll('.activities label');
const jsFrameworksWorkshop = document.querySelector('input[name="js-frameworks"]');
const expressWorkshop = document.querySelector('input[name="express"]');
const jsLibrariesWorkshop = document.querySelector('input[name="js-libs"]');
const nodeJsWorkshop = document.querySelector('input[name="node"]');

// "Payment info" section variables
const paymentFieldset = document.querySelector('#payment');
const creditCardOption = document.querySelector('option[value="credit card"]');
const paypalOption = document.querySelector('option[value="paypal"]');
const bitcoinOption = document.querySelector('option[value="bitcoin"]');
const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');

// Form validation variables
const form = document.querySelector('form');
const basicInfoFieldset = document.querySelector('#basic-info');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#mail');
const creditCardNumInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const submitButton = document.querySelector('#submit');



// function to display an element as block
const displayBlock = element => { element.style.display = "block"; };
// function to hide elements
const displayNone = element => { element.style.display = "none"; };


// when the page loads, give focus to the first text field
input.focus();


/****** "Job Role" section ******/

// hide the "other" label and input intitally
displayNone(otherLabel);
displayNone(otherInput);

// when the user selects the "other" option, display the "other" label and input;
jobSelector.addEventListener('change', () => {
	if(otherOption.selected) {
		displayBlock(otherLabel);
		displayBlock(otherInput);
	} 
});


/****** "T-Shirt Info" section ******/
// hide color section by default
displayNone(colorSection);

// for the T-Shirt color menu, only display the color options that match the design selected
shirtDesignSelector.addEventListener('change', () => {
	// display the color section 
	displayBlock(colorSection);
	if(jsPunsOption.selected) {
		colorSelector.innerHTML = 
		'<option value="cornflowerblue">Cornflower Blue</option>' +
		'<option value="darkslategrey">Dark Slate Grey</option>' +
		'<option value="gold">Gold</option>';
	} else if(heartJsOption.selected) {
		colorSelector.innerHTML = 
		'<option value="tomato">Tomato</option>' +
		'<option value="steelblue">Steel Blue</option>' +
		'<option value="dimgrey">Dim Grey</option>';
	// if no design option is selected hide the color Section
	}	else {
		displayNone(colorSection);
	}
});


/****** "Register for Activities" section ******/

//When an activity is checked, hide the other activity that is at the same time
const hideConflictingEvent = (selectedEventCheckbox, conflictingEventCheckbox) => {
	if(selectedEventCheckbox.checked) {
		displayNone(conflictingEventCheckbox.parentNode);
	} else {
		displayBlock(conflictingEventCheckbox.parentNode);
	}
};

activitiesFieldset.addEventListener('change', () => {
	// if the Javascript Frameworks Workshop is checked, hide Express Workshop 
	hideConflictingEvent(jsFrameworksWorkshop, expressWorkshop);
		
	// if Express Workshop is checked, hide Javascript Framework Workshop
	hideConflictingEvent(expressWorkshop, jsFrameworksWorkshop);
	
	// if the JavaScript Libraries Workshop is checked, hide  Node.js Workshop
	hideConflictingEvent(jsLibrariesWorkshop, nodeJsWorkshop);
	
	// if the Node.js Workshop is checked, hide JavaScript Libraries Workshop
	hideConflictingEvent(nodeJsWorkshop, jsLibrariesWorkshop);
	
});


// Create total cost element and append it to the activities section of the document
const total = document.createElement('p');
let totalCost = 0;
activitiesFieldset.appendChild(total);
total.textContent = "Total: $" + totalCost;

// Hide the total by default
displayNone(total);
	
	
// display a total cost for activities currently selected
activitiesFieldset.addEventListener('change', () => {
	for(i=0; i < activitiesCheckboxes.length; i++) {
		if(activitiesCheckboxes[i].checked) {
			// if the checked item includes the string "$100", add 100 to the total cost 
			if( activities[i].textContent.includes("$100") ) {
				totalCost += 100;
			//if the checked item includes the string "$200", add 200 to the total cost 
			} else if( activities[i].textContent.includes("$200") ) {
				totalCost += 200;
			}
		}
	}
		// remove old total element from document
		activitiesFieldset.removeChild(total);
		
		// change the total element's text content to the total cost
		total.textContent = "Total: $" + totalCost;
		
		// add new total element to the document and display it
		activitiesFieldset.appendChild(total);
		displayBlock(total);
		
		// reset total cost to 0
		totalCost = 0;
});


/****** "Payment Info" section ******/

const displayOnePayment = (toShow, toHide1, toHide2 ) => {
		displayBlock(toShow);
		displayNone(toHide1);
		displayNone(toHide2);
};

// display the credit card information only by default
displayOnePayment(creditCardInfo, paypalInfo, bitcoinInfo);

paymentFieldset.addEventListener('change', () => {
	//if credit card is selected, only display credit card info
	if(creditCardOption.selected) {
		displayOnePayment(creditCardInfo, paypalInfo, bitcoinInfo);	 
		
	// if paypal is selected, only display paypal info
	} else if(paypalOption.selected) {
		displayOnePayment(paypalInfo, creditCardInfo, bitcoinInfo);
	
	// if bitcoin is selected, only display bitcoin info
	} else if(bitcoinOption.selected) {
		displayOnePayment(bitcoinInfo, creditCardInfo, paypalInfo);
	
	// otherwise display credit card info only 
	} else {
	displayOnePayment(creditCardInfo, paypalInfo, bitcoinInfo);	 
	}
});


/****** Form Validation ******/
// create an errorMessage and assign it the class error
const errorMessage = document.createElement('p');
errorMessage.className = 'error-message';

// when the submit button is clicked, check for errors
submitButton.addEventListener('click', (event) => {
	
	//reset the error message after each click
	errorMessage.textContent = '';
	
	/* No name error */
	if(nameInput.value.length < 1){
		nameInput.className = 'error';
		errorMessage.textContent += 'Please enter a name. ';
	}
	
	
	/* Email Error */
	// if email does not include "@" or is less than 6 characters add email error message

	if( emailInput.value.includes('@') == false || emailInput.value.length < 6) {
		emailInput.className = 'error';
		errorMessage.textContent += 'Please enter a correctly formatted email address. ';
	}

	
	/* No activities Error */
	// set activitySelected to false by default
	let activitySelected = false;
	// if any of the checkboxes are checked, set activitySelected to true
	for(let i = 0; i < activitiesCheckboxes.length; i++) {
		if(activitiesCheckboxes[i].checked) {
			activitySelected = true;
		}
	}
	// if no activity is selected, add activity error message
	if(activitySelected == false) {
		errorMessage.textContent += 'Please select at least one activity. ';
		activitiesFieldset.className = 'error';
	}
	
	
	/* Credit Card Error */
	// if credit card option or no option is selected, check for credit card info validation
	if(paypalOption.selected == false && bitcoinOption.selected == false) {
		// if credit card number is not a number between 13 and 16 digits, add credit card number error message
		if (isNaN(creditCardNumInput.value) || creditCardNumInput.value.length < 13 || creditCardNumInput.value.length > 16) {
			errorMessage.textContent += 'Please enter a credit card number between 13 and 16 digits. ';
			creditCardNumInput.className = 'error';
		}
		
		// if zip code is not a 5 digit number, add zip code error message
		if (isNaN(zipCodeInput.value) || zipCodeInput.value.length != 5) {
			errorMessage.textContent += 'Please enter a 5 digit zip code. ';
			zipCodeInput.className = 'error';
		}
		
		// if cvv is not a 3 digit number, add cvv error
		if (isNaN(cvvInput.value) || cvvInput.value.length != 3) {
			errorMessage.textContent += 'Please enter a 3 digit CVV number. ';
			cvvInput.className = 'error';
		} 
			
		// if there are any errors, prevent the form from submitting and display the error message
		if(errorMessage.textContent.length > 1) {
			event.preventDefault();
			form.insertBefore(errorMessage, basicInfoFieldset);
			
			//scroll to top of page
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		} 
	}
});