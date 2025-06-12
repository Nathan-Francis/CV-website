/* ==========================
 
Name: Nathan Francis
SUN: 240382935
Email: 240382935@aston.ac.uk
Description: JavaScript for Nathan Francis' CV

=========================== */

// Ensure DOM is fully loaded
window.onload = function () {
	// Array of CV section IDs to reveal/hide
	const sections = [
		"work-experience",
		"education",
		"languages",
		"skills",
		"interests",
		"testimonials",
	];

	// Loop through each section ID and set up the reveal/hide functionality
	sections.forEach((sectionId) => {
		const section = document.getElementById(sectionId);
		const revealBtn = document.getElementById(`reveal-${sectionId}`);
		const hideBtn = document.getElementById(`hide-${sectionId}`);

		// Check if section and buttons exist before adding event listeners
		if (section && revealBtn && hideBtn) {
			revealBtn.onclick = function () {
				// Reveal the section
				section.style.display = "block";
				revealBtn.style.display = "none";
				hideBtn.style.display = "block";
			};
			hideBtn.onclick = function () {
				// Hide the section
				section.style.display = "none";
				revealBtn.style.display = "block";
				hideBtn.style.display = "none";
			};
		}
	});

	// Assign contact form variable for easier access
	let form = document.getElementById("contact-form");

	// Check validation when new input or changing fields
	if (form) {
		const firstEmail = form["first-email"];
		const confirmEmail = form["confirm-email"];
		const projectStartDate = form["project-start-date"];

		if (firstEmail && confirmEmail) {
			firstEmail.onchange = checkEmails;
			confirmEmail.onchange = checkEmails;
		}
		if (projectStartDate) {
			projectStartDate.onchange = checkDate;
		}

		// Check validation when submitting the form
		form.onsubmit = function (e) {
			checkEmails();
			checkDate();

			// Prevent submission of the form if invalid
			if (!form.checkValidity()) {
				e.preventDefault();
			} else {
				alert(
					"Contact form successfully submitted to the following: \n\nName: Nathan Francis\nSUN: 240382935\nEmail: 240382935@aston.ac.uk"
				);
			}
		};
	}
};

// Function to check emails match
function checkEmails() {
	// Declare variables for email validation
	let form = document.getElementById("contact-form");
	const firstEmail = form["first-email"];
	const confirmEmail = form["confirm-email"];

	// Clear any previous validity messages
	firstEmail.setCustomValidity("");
	confirmEmail.setCustomValidity("");

	// Check Emails match when a value is entered
	if (
		firstEmail.value &&
		confirmEmail.value &&
		confirmEmail.value !== firstEmail.value
	) {
		confirmEmail.setCustomValidity("Emails do not match.");
	}
}

// Function to check project start date validity
function checkDate() {
	// Declare variables for project start date validation
	const projectStartInput = document.getElementById("project-start-date");
	const projectStartValue = projectStartInput.value;
	const projectStartDate = new Date(projectStartValue);
	const today = new Date();

	// Clear any previous validity messages
	projectStartInput.setCustomValidity("");

	// No date is initially selected, this prevents the 'Please fill in this field' message on page load
	if (!projectStartValue) return;

	/*
    Resetting to Midnight is required to prevent timing issues. The project cannot start 
    at X time (e.g., 3pm) the following day, if current time is later X (e.g., 4pm)
    */
	today.setHours(0, 0, 0, 0);
	today.setDate(today.getDate() + 1);

	// Show project start validation messages
	if (projectStartDate < today) {
		projectStartInput.setCustomValidity(
			"Project start date must be at least one day in the future."
		);
	}
	projectStartInput.reportValidity();
}
