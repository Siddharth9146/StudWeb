
// Assuming you have a button with an ID of "printTableBtn" in your HTML file
const printTableBtn = document.getElementById("printTableBtn");

// Add a click event listener to the button
printTableBtn.addEventListener("click", async () => {
    try {
        // Make a GET request to the getUniInfo endpoint in your routes.py file
        const response = await fetch("http://127.0.0.1:8000/UniInfo");
        const universities = await response.json();

        // Get the table element from your HTML file
        const table = document.getElementById("universitiesTable");

        // Create a function to print the table
        function printTable(universities) {
            // Get the table element from your HTML file
            const table = document.getElementById("universitiesTable");

            // Clear the table before adding new data
            table.innerHTML = "";

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
            universities.forEach((university) => {
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
                degrees_bestCell.innerHTML = university.degrees_offered;
                campus_sizeCell.innerHTML = university.campus_size;
                facilities_scoreCell.innerHTML = university.facilities_score;
                required_12thCell.innerHTML = university.required_12th_score;
            });
        }

        // Assuming you have a button with an ID of "printTableBtn" in your HTML file
        const printTableBtn = document.getElementById("printTableBtn");

        // Add a click event listener to the button
        printTableBtn.addEventListener("click", async () => {
            try {
                // Make a GET request to the getUniInfo endpoint in your routes.py file
                const response = await fetch("http://127.0.0.1:8000/StudInfo");
                const universities = await response.json();

                // Call the printTable function to print the table
                printTable(universities);
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

