document.getElementById('newsForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        url: document.getElementById('url').value,
        publishedAt: document.getElementById('publishedAt').value,
    };

    try {
        const response = await fetch('/db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if(response.ok) {
            alert('News Item Submitted Successfully!');
            console.log('Success:', data);
        } else {
            throw new Error(`${response.status}: ${data.message}`);
        }
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
        console.error('Error:', error);
    }
});



function deleteNews() {
    const title = document.getElementById('deleteTitle').value;

    fetch(`/db/${title}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('deleteResult').style.display = 'block';
            document.getElementById('deleteResult').textContent = 'News Item Deleted Successfully!';
        } else {
            throw new Error('Failed to delete news item');
        }
    })
    .catch(error => {
        document.getElementById('deleteResult').style.display = 'block';
        document.getElementById('deleteResult').textContent = `Error: ${error.message}`;
    });
}
