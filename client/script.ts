window.addEventListener('load', async () => {

    document.querySelector('#test')?.addEventListener('click', async () => {
        await fetch('http://www.localhost:8080/time', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET'
        })
            .then(res => res.body)
    });
});
