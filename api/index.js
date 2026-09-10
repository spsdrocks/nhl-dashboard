// Dependencies
const path = require('path');
const express = require('express');
const expressApp = express();



// Guiding express to the prohect root
expressApp.use(express.static(path.join(__dirname, '..')));



// Loading and checking API key
const apiKey = process.env.SPORTRADAR_NHL_API_KEY;

if (!apiKey || apiKey == "") {
    console.log("API key not found.");
}



// Main API call through express' get function
expressApp.get("/api/nhl-rankings", async (apiRequest, apiResult) => {
    try {
        // Direct API call using fetch
        const fetchUrl = "https://api.sportradar.com/nhl/trial/v7/en/seasons/2025/REG/rankings.json";
        const fetchOptions = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': apiKey}};

        const sportradarResponse = await fetch(fetchUrl, fetchOptions);

        // Handling a failed API call
        if (!sportradarResponse.ok) {
            const errorText = await sportradarResponse.text();
            console.error(`Sportradar responded ${sportradarResponse.status}:`, errorText);
            return apiResult.status(sportradarResponse.status)
                            .json({ error: `Sportradar API returned ${sportradarResponse.status}` });
        }

        // Getting API response data and parsing to JSON
        const responseData = await sportradarResponse.json();
        apiResult.json(responseData);

    } catch (error) {
        // Dealing with extrenuous errors
        console.error(error);
        apiResult.status(500).json({ error: 'Failed to fetch NHL rankings' });
    }
});



// For testing purposes
if (require.main === module) {
    expressApp.listen(3000, () => console.log(`Listening on http://localhost:${3000}`));
}



// Exporting app to be accessed by frontend
module.exports = expressApp;