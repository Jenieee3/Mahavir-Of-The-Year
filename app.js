const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for votes
const votes = {};

// Set to track users who have voted
const votedUsers = new Set();

// Mapping of option values to names for question 2
const optionNamesMap = {
    q1_option1: 'Chandra',
    q1_option2: 'Aditi',
    q1_option3: 'Devyani',
    q1_option4: 'Isha',
    // Add more mappings as needed for other questions
    q2_option1: 'Dev',
    q2_option2: 'Sudarshan',
    q2_option3: 'Soham',
    q2_option4: 'Rohan',
    //
    q3_option1: 'Parth',
    q3_option2: 'Vaishnav',
    q3_option3: 'Suraj',
    q3_option4: 'Adhar',
    //
    q4_option1: 'Riya',
    q4_option2: 'Aditi',
    q4_option3: 'Lakshmi',
    q4_option4: 'Chandra',
    //
    q5_option1: 'Neha',
    q5_option2: 'Ishwari',
    q5_option3: 'Hanishka',
    q5_option4: 'Divya',
    //
    q6_option1: 'Adhar',
    q6_option2: 'Aditya',
    q6_option3: 'Soham',
    q6_option4: 'Sudarshan',
};

// Route to handle form submission
app.post('/submit', (req, res) => {
    const userName = req.body.userName;

    // Check if the user has already voted
    if (votedUsers.has(userName)) {
        console.log(`${userName} has already voted. Rejecting the vote.`);
        return res.status(400).send('User has already voted.');
    }

    // Mark the user as voted
    votedUsers.add(userName);

    const answers = req.body;

    // Update votes based on user's selections
    Object.keys(answers).forEach(questionId => {
        const selectedOption = answers[questionId];
        const key = `${questionId}_${selectedOption}`;

        // Initialize vote count for the option if not exists
        votes[key] = votes[key] || 0;

        // Increment the vote count
        votes[key]++;
    });

    // Log a simple message for each vote
    console.log(`${userName} voted:`);
    Object.keys(votes).forEach(key => {
        // Split the key to extract questionId and option value
        const [questionId, optionValue] = key.split('_');
        // Map option value to name if a mapping exists, otherwise use the original value
        const optionName = optionNamesMap[`${questionId}_${optionValue}`] || optionValue;
        console.log(`  ${questionId}: ${optionName} - ${votes[key]} votes`);
    });

    // Send a response back to the client with a success message
    res.status(200).send('Form submitted successfully!');
});

app.get('/total-votes-page', (req, res) => {
    // Render an HTML page with the vote data
    const voteDataHtml = Object.keys(votes).map(key => {
        const [questionId, optionValue] = key.split('_');
        const optionName = optionNamesMap[`${questionId}_${optionValue}`] || optionValue;
        return `<p>${questionId}: ${optionName} - ${votes[key]} votes</p>`;
    }).join('');

    const html = `
        <html>
            <head>
                <title>Total Votes</title>
            </head>
            <body>
                <h1>Total Votes</h1>
                ${voteDataHtml}
            </body>
        </html>
    `;

    res.send(html);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
