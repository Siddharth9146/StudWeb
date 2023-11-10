// post data from contact.html in the form of a JSON object to the postStud endpoint in your routes.py file 

async function postStud() {
    try {
        // Make a POST request to the postStud endpoint in your routes.py file
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var link = "http://localhost:8000/postStud/" + name + "/" + email + "/" + phone;
        const response =  await fetch(link);
        const universitiesData =  await response.json();

 