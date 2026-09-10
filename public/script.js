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

// Add function to parse json data, another function to turn the data into an html table of sorts
// const dataObject = JSON.parse(apiData);

function parseData(apiData) {
    const dataObject = JSON.parse(apiData);

    console.log(dataObject);
}

document.getElementById("api-test-button").addEventListener("click", loadNhlData);