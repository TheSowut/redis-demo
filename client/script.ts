window.addEventListener('load', async () => {
    const getInputField: HTMLInputElement = document.querySelector('#getInput')!;
    const setInputField: HTMLInputElement = document.querySelector('#setInput')!;

    document.querySelector('#getButton')?.addEventListener('click', async () => {
        const getValue: string | null = getInputField.value;
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
                setInputField.value = '';
            });

        if (result.data) {
            setInputField.value = result.data;
        }
    });

    document.querySelector('#setButton')?.addEventListener('click', async () => {
        const getValue: string | null = getInputField.value;
        const setValue: string | null = setInputField.value;

        if (!getValue || !setValue) {
            alert('Both values must be set!');
            getInputField.value = '';
            setInputField.value = '';
            return;
        }

        await fetch(`http://www.localhost:8080/parameter/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: setValue }),
            method: 'POST',
        })
            .then(res => res.json())
            .then(_ => alert('Value has been set.'))
            .then(_ => setInputField.value = '')
            .catch(e => {
                alert(e);
            });
    });
});
