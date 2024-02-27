function bored(){
    fetch(`http://localhost:3000/quiz`)
    .then(response => response.json())
    .then(data => {
        const message = document.getElementById('message');
        const info = document.createElement('p');
        info.textContent = `This is ${data.message}`;

        message.innerHTML = '';
        message.appendChild(info);


    })
.   catch(error => {
        console.error('Something wrong: ', error)
    }) 
}

function boredA(){
    fetch(`http://localhost:3000/quiz/activity`)
    .then(response => response.json())
    .then(data => {
        const activity = document.getElementById('activity');
        const info = document.createElement('p');
        info.innerHTML = `
        <p>Activity: <\P>
        <p>${data.activity}<\P>
        <p>Type: ${data.type}<\p>
        <p>Price:    ${data.price}<\p>
        <p>Link:     ${data.link}<\P>
        `;

        activity.innerHTML = '';
        activity.appendChild(info);


    })
.   catch(error => {
        console.error('Something wrong: ', error)
    }) 
    bored();
}

function fetchPrice() {
    const price = document.getElementById('searchPrice').value;
    fetch(`/quiz/activity/${encodeURIComponent(price)}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = ''; 
            const info = document.createElement('p');
            info.innerHTML = `
            <p>Activity: <\P>
            <p>${data.activity}<\P>
            <p>Type: ${data.type}<\p>
            <p>Price:    ${data.price}<\p>
            <p>Link:     ${data.link}<\P>
            `;

            resultsContainer.innerHTML = '';
            resultsContainer.appendChild(info);
        })
        .catch(error => console.error('Error fetching specific news:', error));
        
}


boredA();