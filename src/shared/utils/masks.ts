export const phoneMask = (value: string) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

export const cnpjMask = (value: string) => {
    if (!value) return ""
    value = value.replace(/\D+/g, '')
    value = value.replace(/(\d{2})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    value = value.replace(/(-\d{2})\d+?$/, '$1')
    return value
}

export const zipCodeMask = (value: string) => {
    if (!value) return ""
    value = value.replace(/\D+/g, '')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value
}