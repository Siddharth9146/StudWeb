import React, { useEffect, useState } from 'react';
import './CollegeList.css';

const CollegeList = () => {
    const [universitiesData, setUniversitiesData] = useState([]);
    const [selectedStream, setSelectedStream] = useState('');

    const getUniInfo = async (stream = null) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/UniInfo");
            let data = await response.json();

            if (stream) {
                data = data.filter(university =>
                    university.degrees_offered.includes(stream)
                );
            }

            setUniversitiesData(data);
        } catch (error) {
            console.error("Error fetching university data:", error);
        }
    };

    useEffect(() => {
        getUniInfo(selectedStream);
    }, [selectedStream]);

    const handleStreamChange = (event) => {
        setSelectedStream(event.target.value);
    };

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <label className="me-2"><b>Degree:</b></label>
                <select 
                    className="form-select d-inline w-auto"
                    value={selectedStream}
                    onChange={handleStreamChange}
                >
                    <option value="">All</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Architecture">Architecture</option>
                </select>
            </div>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}><b>Name</b></th>
                        <th style={{ textAlign: "center" }}><b>State</b></th>
                        <th style={{ textAlign: "center" }}><b>Campus Size (Acres)</b></th>
                        <th style={{ textAlign: "center" }}><b>Degrees Offered</b></th>
                        <th style={{ textAlign: "center" }}><b>Facilities</b></th>
                        <th style={{ textAlign: "center" }}><b>Established Year</b></th>
                        <th style={{ textAlign: "center" }}><b>Website</b></th>
                        <th style={{ textAlign: "center" }}><b>Contact Email</b></th>
                        <th style={{ textAlign: "center" }}><b>Created At</b></th>
                        <th style={{ textAlign: "center" }}><b>Updated At</b></th>
                    </tr>
                </thead>
                <tbody>
                    {universitiesData.map((university, index) => (
                        <tr key={index}>
                            <td>{university.name}</td>
                            <td>{university.state}</td>
                            <td>{university.campus_size}</td>
                            <td>{university.degrees_offered.join(", ")}</td>
                            <td>{university.facilities ? university.facilities.join(", ") : "N/A"}</td>
                            <td>{university.established_year ?? "N/A"}</td>
                            <td>
                                {university.website ? (
                                    <a href={university.website} target="_blank" rel="noopener noreferrer">
                                        Visit
                                    </a>
                                ) : "N/A"}
                            </td>
                            <td>{university.contact_email || "N/A"}</td>
                            <td>
                                {university.created_at ? 
                                    new Date(university.created_at).toLocaleString() : "N/A"}
                            </td>
                            <td>
                                {university.updated_at ? 
                                    new Date(university.updated_at).toLocaleString() : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollegeList;
