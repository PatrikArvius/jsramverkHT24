const updateForm = document.querySelector('#update-form');

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm);

    const title = formData.get('title');
    const content = formData.get('content');

    const response = await fetch('http://localhost:3000', {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(response);
});
