const updateBtn = document.querySelector('.update-btn');

updateBtn.addEventListener('click', updateOne);

async function updateOne() {
    const title = document.querySelector('.update-title').value;
    const content = document.querySelector('.update-content').value;
    const id = location.pathname.split('/')[1];

    const body = {
        title,
        content,
    };

    const res = await fetch(`http://localhost:3000/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    location.href = '/';
}
