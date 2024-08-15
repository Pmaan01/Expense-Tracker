async function createUser(event) {
    event.preventDefault(); 
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;

    const user = {
        name: userName,
        email: userEmail
    };

    try {

        //tried to make it work no idea why is it no fetching the data, I checked routes its the same address for post and index.js has same path no idea why it is not working
        const response = await fetch('/api/v1/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Raw Response:', response);

        const responseBody = await response.text(); 
        console.log('Response Body:', responseBody);

        let dataInJson;
        try {
            dataInJson = JSON.parse(responseBody);
            console.log('Parsed JSON:', dataInJson);
        } catch (error) {
            console.log('Error parsing JSON:', error);
            return;
        }

        if (response.ok) {
            console.log('User created successfully, redirecting...');
            //without fetching its not opening dashboard.
            window.location.href = "/dashboard.html"; 
        } else {
            console.log('Registration failed:', dataInJson.message);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
