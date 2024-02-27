document.addEventListener('DOMContentLoaded', function() {
    fetchHistoryRecords();
});

function fetchHistoryRecords() {
    fetch('/getHistory') 
    .then(response => response.json())
    .then(data => {
        displayHistoryRecords(data.records); 
    })
    .catch(error => {
        console.error('Error fetching history records:', error);
    });
}

function displayHistoryRecords(records) {
    const container = document.getElementById('historyContainer');
    records.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('record');
        recordDiv.innerHTML = `
            <p><strong>City:</strong> ${record.cityName}</p>
            <p><strong>Country:</strong> ${record.country}</p>
            <p><strong>Weather:</strong> ${record.weather} (${record.description})</p>
            <p><strong>Temperature:</strong> ${record.temperature}</p>
            <p><strong>Timestamp:</strong> ${record.timestamp}</p>
            <p><strong>Coordinates:</strong> Lat ${record.coord.lat}, Lon ${record.coord.lon}</p>
        `;
        container.appendChild(recordDiv);
    });
}
