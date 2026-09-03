const path = require('path');
const express = require('express');
const expressApp = express();



expressApp.use(express.static(path.join(__dirname, '..')));



const apiKey = process.env.SPORTRADAR_NHL_API_KEY;

if (!apiKey || apiKey == "") {
    console.log("API key not found.");
}



expressApp.get("/api/nhl-rankings", async (apiRequest, apiResult) => {
    try {
        const fetchUrl = "https://api.sportradar.com/nhl/trial/v7/en/seasons/2025/REG/rankings.json";
        const fetchOptions = {method: 'GET', headers: {accept: 'application/json', 'x-api-key': apiKey}};

        const sportradarResponse = await fetch(fetchUrl, fetchOptions);

        if (!sportradarResponse.ok) {
            const errorText = await sportradarResponse.text();
            console.error(`Sportradar responded ${sportradarResponse.status}:`, errorText);
            return apiResult.status(sportradarResponse.status)
                            .json({ error: `Sportradar API returned ${sportradarResponse.status}` });
        }

        const responseData = await sportradarResponse.json();
        apiResult.json(responseData);

    } catch (err) {
        console.error(err);
        apiResult.status(500).json({ error: 'Failed to fetch NHL rankings' });
    }
});



if (require.main === module) {
    expressApp.listen(3000, () => console.log(`Listening on http://localhost:${3000}`));
}



module.exports = expressApp;