"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    (_a = document.querySelector('#getButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const getInputField = document.querySelector('#getInput');
        const getValue = getInputField.value;
        const setInputField = document.querySelector('#setInput');
        if (!getValue)
            return;
        const result = yield fetch(`http://www.localhost:8080/parameter/${getValue}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'GET'
        })
            .then(res => res.json())
            .catch(_ => {
            alert('Not Found');
            setInputField === null || setInputField === void 0 ? void 0 : setInputField.setAttribute('value', '');
        });
        if (result.data) {
            setInputField.setAttribute('value', result.data);
        }
    }));
    (_b = document.querySelector('#setButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const getInputField = document.querySelector('#getInput');
        const getValue = getInputField.value;
        const setInputField = document.querySelector('#setInput');
        const setValue = setInputField.value;
        if (!getValue || !setValue)
            return;
        yield fetch(`http://www.localhost:8080/parameter/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: setValue }),
            method: 'POST',
        })
            .then(res => res.json())
            .catch(e => {
            alert(e);
        });
        setInputField === null || setInputField === void 0 ? void 0 : setInputField.setAttribute('value', '');
    }));
}));
