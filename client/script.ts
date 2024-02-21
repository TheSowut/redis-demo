enum ENDPOINTS {
    PARAMETER = 'http://www.localhost:8080/parameter/'
}

enum MESSAGES {
    NOT_FOUND = 'Not Found!',
    KEY_MISSING = 'Key Missing!',
    VALUE_MISSING = 'Value Missing!',
    KEY_AND_VALUE_MISSING = 'Both Key and Value must be set!',
    VALUE_SET = 'Value has been set!'
}

window.addEventListener('load', async () => {
    const getInputField: HTMLInputElement = document.querySelector('#getInput')!;
    const setInputField: HTMLInputElement = document.querySelector('#setInput')!;

    document.querySelector('#getButton')?.addEventListener('click', async () => {
        const getValue: string | null = getInputField.value;
        if (!getValue) return;

        const result = await fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET'
        })
            .then(res => res.json())
            .catch(_ => {
                alert(MESSAGES.NOT_FOUND);
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
            alert(MESSAGES.KEY_AND_VALUE_MISSING);
            getInputField.value = '';
            setInputField.value = '';
            return;
        }

        await fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: setValue }),
            method: 'POST',
        })
            .then(res => res.json())
            .then(_ => alert(MESSAGES.VALUE_SET))
            .then(_ => setInputField.value = '')
            .catch(e => {
                alert(e);
            });
    });
});
