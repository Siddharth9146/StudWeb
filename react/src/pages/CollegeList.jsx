async function getUniInfo(selectedStream = null) {
    try {
        // Fetch university data
        const response = await fetch("http://127.0.0.1:8000/UniInfo");
        let universitiesData = await response.json();

        // Filter data based on the selected stream
        if (selectedStream) {
            universitiesData = universitiesData.filter(university =>
                university.degrees_offered.includes(selectedStream)
            );
        }

        // Create a container for filter and table
        const containerDiv = document.createElement("div");
        containerDiv.className = "container mt-3";

        // Create filter dropdown
        const filterDiv = document.createElement("div");
        filterDiv.className = "mb-3";

        const label = document.createElement("label");
        label.innerHTML = "<b>Degree:</b> ";
        label.className = "me-2";

        const select = document.createElement("select");
        select.className = "form-select d-inline w-auto";
        select.innerHTML = `
            <option value="">All</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="Architecture">Architecture</option>
        `;

        select.addEventListener("change", (event) => {
            getUniInfo(event.target.value);
        });

        filterDiv.appendChild(label);
        filterDiv.appendChild(select);
        containerDiv.appendChild(filterDiv);

        // Create table element
        const table = document.createElement("table");
        table.className = "table table-striped table-bordered table-hover";

        // Define table headers
        const headers = ["Name", "State", "Campus Size (Acres)", "Degrees Offered", "Facilities",
            "Established Year", "Website", "Contact Email", "Created At", "Updated At"];

        // Create table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.innerHTML = `<b>${headerText}</b>`;
            th.style.textAlign = "center";
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        universitiesData.forEach((university) => {
            const row = table.insertRow();
            const nameCell = row.insertCell();
            const stateCell = row.insertCell();
            const campus_sizeCell = row.insertCell();
            const degrees_offeredCell = row.insertCell();
            const facilitiesCell = row.insertCell();
            const established_yearCell = row.insertCell();
            const websiteCell = row.insertCell();
            const contact_emailCell = row.insertCell();
            const created_atCell = row.insertCell();
            const updated_atCell = row.insertCell();

            // Required fields
            nameCell.innerHTML = university.name;
            stateCell.innerHTML = university.state;
            campus_sizeCell.innerHTML = university.campus_size;
            degrees_offeredCell.innerHTML = university.degrees_offered.join(", ");

            // Optional fields
            facilitiesCell.innerHTML = university.facilities ? university.facilities.join(", ") : "N/A";
            established_yearCell.innerHTML = university.established_year ?? "N/A";
            websiteCell.innerHTML = university.website ? `<a href="${university.website}" target="_blank">Visit</a>` : "N/A";
            contact_emailCell.innerHTML = university.contact_email || "N/A";
            created_atCell.innerHTML = university.created_at ? new Date(university.created_at).toLocaleString() : "N/A";
            updated_atCell.innerHTML = university.updated_at ? new Date(university.updated_at).toLocaleString() : "N/A";

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        containerDiv.appendChild(table);

        // Get the div element from your HTML file
        const universitiesTableDiv = document.getElementById("universitiesTableDiv");

        // Clear previous content and append new content
        universitiesTableDiv.innerHTML = "";
        universitiesTableDiv.appendChild(containerDiv);

    } catch (error) {
        console.error("Error fetching university data:", error);
    }
}

// Initial call to load all universities
getUniInfo();
