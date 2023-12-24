function generateOptions(questionId, optionNames) {
    const optionsContainer = document.querySelector(`.question[data-question-id="${questionId}"] .options-container`);

    optionNames.forEach((optionName, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" class="option-button" name="${questionId}" value="option${index + 1}"> ${optionName}`;
        optionsContainer.appendChild(label);
    });
}
generateOptions('q1', ['Chandra', 'Aditi', 'Devyani', 'Ishwari']);
generateOptions('q2', ['Darshan', 'Sudarshan', 'Soham', 'Rohan']);
generateOptions('q3', ['Parth', 'Vaishnav', 'Suraj', 'Adhar']);
generateOptions('q4', ['Riya', 'Aditi', 'Lakshmi', 'Chandra']);
generateOptions('q5', ['Neha', 'Ishwari', 'Hanishka', 'Divya']);
generateOptions('q6', ['Adhar', 'Aditya', 'Soham', 'Sudarshan']);

function getPastelLightBlueColor() {
    const baseColor = '173, 216, 230'; // RGB values for light blue
    const opacity = 0.45; // Set opacity to 45%
    return `rgba(${baseColor}, ${opacity})`;
}

document.addEventListener('DOMContentLoaded', function () {
    const optionButtons = document.querySelectorAll('.option-button');

    // Create an object to track the selected option for each question
    const selectedOptions = {};

    optionButtons.forEach(function (button) {
        button.style.backgroundColor = getPastelLightBlueColor();

        button.addEventListener('click', function () {
            const questionId = button.getAttribute('data-question-id');

            // Reset color for the previously selected option in the same question
            if (selectedOptions[questionId]) {
                selectedOptions[questionId].style.backgroundColor = getPastelLightBlueColor();
            }

            // Update the selected option for the current question
            selectedOptions[questionId] = button;
            button.style.backgroundColor = 'rgba(255, 182, 193, 0.45)'; // Light red color
        });
    });
});