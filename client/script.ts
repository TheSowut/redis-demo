window.addEventListener('load', async () => {

    document.querySelector('#getButton')?.addEventListener('click', async () => {
        const value: string | null = (document.querySelector('#getInput') as HTMLInputElement).value;
        if (!value) return;

        const result = await fetch(`http://www.localhost:8080/${value}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET'
        })
            .then(res => res.json())
            .catch(err => alert(err));

        if (result) {
            (document.querySelector('#setInput') as HTMLInputElement).setAttribute('value', result.date);
        }
    });
});
