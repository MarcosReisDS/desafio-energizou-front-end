interface validInterface {
    valid: boolean,
    error: {
        [key: string]: string
    }
}

interface captureInterface {
    [key: string]: {
        value: string | number | null
        element: HTMLInputElement | null
    }
}

export const validInputData = (data: captureInterface): validInterface => {
    let dataValid: validInterface = {
        valid: true,
        error: {}
    }

    Object.keys(data).forEach(key => {
        if (key in data) {
            let input = data[key];
            if (input.element) {
                let regex = /.*/gi
                let errMessage = `Campo obrigatório!`
                let type = input.element.getAttribute("data-type") ?? input.element.getAttribute("name") ?? key
                switch (type) {
                    case "client_name":
                        regex = /^\w{2,}(\s)\w{2,}/g
                        errMessage = "Por favor, insira seu nome e sobrenome"
                        break;
                    case "email":
                        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
                        errMessage = "E-mail inválido!"
                        break;
                    case "phone":
                        regex = /^\([1-9]{2}\) (?:[1-9]|\d[1-9])[0-9]{3}\-[0-9]{4}$/g
                        errMessage = "Telefone inválido!"
                        break;
                }

                if (!input.value || !regex.test(String(input.value)) && input.element.type !== 'checkbox') {
                    dataValid.valid = false;
                    dataValid.error[key] = errMessage
                }
            }
        }
    })

    return dataValid;
}

export const appendErrorInput = (error: validInterface | any, inputKeys: string[] | undefined = undefined) => {
    let data: any = "message" in error?.error ? error.error.message : error.error;

    const appendEvent = (key: string, msg: string, inputRemove: string[] | undefined = undefined, fieldKey: string | undefined = undefined) => {
        let element = document.querySelector(`[data-name="${fieldKey ?? key}"]`) ?? document.querySelector(`[name="${fieldKey ?? key}"]`);
        let input_element = document.querySelector(`input[name="${key}"]`);
        if (element && input_element && msg) {
            function removeError(e: any) {
                element?.removeAttribute("data-error");
                input_element?.removeEventListener("keypress", removeError);
                input_element?.removeEventListener("change", removeError);

                if (e && inputRemove) {
                    inputRemove.forEach(key => {
                        let el = document.querySelector(`[data-name="${key}"]`) ?? document.querySelector(`[name="${key}"]`);
                        let in_el = document.querySelector(`input[name="${key}"]`);
                        el?.removeAttribute("data-error");
                        in_el?.removeEventListener("keypress", removeError);
                        in_el?.removeEventListener("change", removeError);
                    })
                }
            }

            removeError(false);

            input_element.addEventListener("change", removeError);
            input_element.addEventListener("keypress", removeError);

            element.setAttribute("data-error", msg);
        }
    }

    if (typeof data === "string") {
        if (inputKeys) {
            inputKeys.forEach(key => {
                appendEvent(key, data, inputKeys, "error")
            })
        }
    } else {
        Object.keys(data).forEach(key => {
            if (key in data) {
                let message = data[key];
                let msg = Array.isArray(message) ? message[0] : message;
                appendEvent(key, msg);
            }
        })
    }
}

export const captureElementData = (keys: string[]) => {
    let data: captureInterface = {}

    keys.forEach(key => {
        let element: HTMLInputElement | null = document.querySelector(`[name="${key}"]`);
        data[key] = {
            value: element ? element?.value : null,
            element: element
        }
    });

    return data;
}

export const setElementsData = (inputs: { key: string, value: any }[]) => {
    let data: captureInterface = {}

    inputs.forEach(input => {
        let element: HTMLInputElement | null = document.querySelector(`[name="${input.key}"]`);

        if (element) {
            element.value = input.value
        }
    });

    return data;
}