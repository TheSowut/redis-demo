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
var ENDPOINTS;
(function (ENDPOINTS) {
    ENDPOINTS["PARAMETER"] = "http://www.localhost:8080/parameter";
})(ENDPOINTS || (ENDPOINTS = {}));
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["NOT_FOUND"] = "Not Found!";
    MESSAGES["KEY_MISSING"] = "Key Missing!";
    MESSAGES["KEY_DELETED"] = "Key has been deleted!";
    MESSAGES["VALUE_MISSING"] = "Value Missing!";
    MESSAGES["KEY_AND_VALUE_MISSING"] = "Both Key and Value must be set!";
    MESSAGES["VALUE_SET"] = "Value has been set!";
})(MESSAGES || (MESSAGES = {}));
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const getInputField = document.querySelector('#getInput');
    const setInputField = document.querySelector('#setInput');
    (_a = document.querySelector('#getButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const getValue = getInputField.value;
        if (!getValue)
            return;
        const result = yield fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
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
    }));
    (_b = document.querySelector('#setButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const getValue = getInputField.value;
        const setValue = setInputField.value;
        if (!getValue || !setValue) {
            alert(MESSAGES.KEY_AND_VALUE_MISSING);
            getInputField.value = '';
            setInputField.value = '';
            return;
        }
        yield fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: setValue }),
            method: 'POST',
        })
            .then(res => res.json())
            .then(_ => alert(MESSAGES.VALUE_SET))
            .then(_ => setInputField.value = '')
            .catch(e => alert(e));
    }));
    (_c = document.querySelector('#delButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const getValue = getInputField.value;
        if (!getValue) {
            alert(MESSAGES.KEY_MISSING);
            return;
        }
        yield fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
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
            // BUG: not shown
            .catch(e => MESSAGES.NOT_FOUND);
    }));
    //     await fetch(`${ENDPOINTS.PARAMETER}/${getValue}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(_ => alert('test'))
    //         .catch(e => alert(e))
    // });
}));
