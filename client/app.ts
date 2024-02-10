window.addEventListener('load', async () => {
    await fetch('http://www.localhost:8080', {
        headers: {
            'Accept': 'application/javascript',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET'
    })
    // .then(res => res.json());
    .then(console.log);
});
