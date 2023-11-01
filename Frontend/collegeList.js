// Assuming you have a button with an ID of "printTableBtn" in your HTML file
const printTableBtn = document.getElementById("printTableBtn");

// Add a click event listener to the button
printTableBtn.addEventListener("click", async () => {
    try {
        // Make a GET request to the getUniInfo endpoint in your routes.py file
        const response = await fetch("/getUniInfo");
        const universities = await response.json();

        // Get the table element from your HTML file
        const table = document.getElementById("universitiesTable");

        // Create a table row for each university and append it to the table
        universities.forEach((university) => {
            const row = table.insertRow();
            const nameCell = row.insertCell();
            const locationCell = row.insertCell();
            const NIRFrankCell = row.insertCell();
            nameCell.innerHTML = university.name;
            locationCell.innerHTML = university.location;
            NIRFrankCell.innerHTML = university.nirf_ranking;
        });
    } catch (error) {
        console.error(error);
    }
});

