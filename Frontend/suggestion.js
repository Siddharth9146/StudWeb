
async function getUniInfo() {
    try {
        // Make a GET request to the getUniInfo endpoint in your routes.py file
        var name = document.getElementById("name").value;
        var link = "http://localhost:8000/UniSuggestion/" + name;
        const response =  await fetch(link);
        const universitiesData =  await response.json();

        // Create a table element to hold the university data
        const table = document.createElement("table");

        // Create a table header row
        const headerRow = table.insertRow();
        const nameHeader = headerRow.insertCell();
        const stateHeader = headerRow.insertCell();
        const NIRFrankHeader = headerRow.insertCell();
        const degrees_bestHeader = headerRow.insertCell();
        const campus_sizeHeader = headerRow.insertCell();
        const facilities_scoreHeader = headerRow.insertCell();
        const required_12thHeader = headerRow.insertCell();
        nameHeader.innerHTML = "<b>Name</b>";
        stateHeader.innerHTML = "<b>State</b>";
        NIRFrankHeader.innerHTML = "<b>NIRF Ranking</b>";
        campus_sizeHeader.innerHTML = "<b>Campus Size</b>";
        degrees_bestHeader.innerHTML = "<b>Degrees Offered</b>";
        facilities_scoreHeader.innerHTML = "<b>Facilities Score</b>";
        required_12thHeader.innerHTML = "<b>Required 12th Score</b>";

        // Create a table row for each university and append it to the table
        universitiesData.forEach((university) => {
            const row = table.insertRow();
            const nameCell = row.insertCell();
            const stateCell = row.insertCell();
            const NIRFrankCell = row.insertCell();
            const degrees_bestCell = row.insertCell();
            const campus_sizeCell = row.insertCell();
            const facilities_scoreCell = row.insertCell();
            const required_12thCell = row.insertCell();
            nameCell.innerHTML = university.name;
            stateCell.innerHTML = university.state;
            NIRFrankCell.innerHTML = university.nirf_ranking;
            degrees_bestCell.innerHTML = university.degrees_best;
            campus_sizeCell.innerHTML = university.campus_size;
            facilities_scoreCell.innerHTML = university.facilities_score;
            required_12thCell.innerHTML = university.required_12th_score;

        });

        // Get the div element from your HTML file to hold the table
        const universitiesTableDiv = document.getElementById("universitiesTableDiv");

        // Clear the div before adding new data
        universitiesTableDiv.innerHTML = "";

        // Append the table to the div
        universitiesTableDiv.appendChild(table);
    } catch (error) {
        console.log(error);
    }
}
