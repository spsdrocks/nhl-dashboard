async function loadNhlData() {
    let apiData = {};

    try {
        const apiResponse = await fetch("/api/nhl-rankings");
        apiData = await apiResponse.json();

        console.log("NHL rankings:", apiData);
        document.getElementById("output").textContent = JSON.stringify(apiData, null, 2);
        
    } catch (error) {
        console.error("Error fetching NHL rankings:", error);
    }

    parseData(apiData);
}

function parseData(apiData) {
    const dataObject = JSON.parse(apiData);

    console.log(dataObject);

    flattenData(apiData);
}

function flattenData(apiData) {
    const tableRows = [];

    // apiData.JSON
    // finish flattening into array
    apiData.conferences.forEach(currentConference => {
        currentConference.divisions.forEach(currentDivision => {
            currentDivision.teams.forEach(currentTeam => {
                tableRows.push({
                    team: `${currentTeam.market} ${currentTeam.name}`
                    // Add the rest of the columns
                });
            })
        })
    })
}



document.getElementById("api-test-button").addEventListener("click", loadNhlData);