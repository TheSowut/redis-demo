enum ENDPOINTS {
    PARAMETER = 'http://www.localhost:8080/parameter'
}

enum MESSAGES {
    NOT_FOUND = 'Not Found!',
    KEY_MISSING = 'Key Missing!',
    KEY_DELETED = 'Key has been deleted!',
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
            .catch(e => alert(e))
    });

    document.querySelector('#delButton')?.addEventListener('click', async () => {
        const getValue: string | null = getInputField.value;
        if (!getValue) {
            alert(MESSAGES.KEY_MISSING);
            return;
        }

        await fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // You may include additional headers if required
            },
        })
        .then(res => res.json())
        .then(console.log)
        .then(_ => {
            alert(MESSAGES.KEY_DELETED);
            getInputField.value = '';
            setInputField.value = '';
        })
        .catch(e => alert(MESSAGES.NOT_FOUND));
    })
});
