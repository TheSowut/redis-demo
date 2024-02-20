window.addEventListener('load', async () => {

    document.querySelector('#getButton')?.addEventListener('click', async () => {
        const getInputField: HTMLInputElement = document.querySelector('#getInput')!;
        const getValue: string | null = getInputField.value;
        const setInputField: HTMLInputElement = document.querySelector('#setInput')!;
        if (!getValue) return;

        const result = await fetch(`http://www.localhost:8080/parameter/${getValue}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET'
        })
            .then(res => res.json())
            .catch(_ => {
                alert('Not Found');
                setInputField?.setAttribute('value', '');
            });

        if (result.data) {
            setInputField.setAttribute('value', result.data);
        }
    });

    document.querySelector('#setButton')?.addEventListener('click', async () => {
        const getInputField: HTMLInputElement = document.querySelector('#getInput')!;
        const getValue: string | null = getInputField.value;
        const setInputField: HTMLInputElement = document.querySelector('#setInput')!;
        const setValue: string | null = setInputField.value;
        if (!getValue || !setValue) return;

        await fetch(`http://www.localhost:8080/parameter/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: setValue }),
            method: 'POST',
        })
            .then(res => res.json())
            .catch(e => {
                alert(e);
            })

        setInputField?.setAttribute('value', '');
    });
});
