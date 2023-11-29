export function convertNumberToCurrencyString(value: number, withCurrencySymbol: boolean = false) {
    let stringValue = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (withCurrencySymbol)
        stringValue = 'R$ ' + stringValue;

    return stringValue;
}

export function convertCurrencyStringToNumber(value: string) {
    value = value.replaceAll(' ', '');

    value = value.replaceAll('R$', '');

    value = value.replaceAll('.', '');

    value = value.replaceAll(',', '.');

    return parseFloat(value);
}