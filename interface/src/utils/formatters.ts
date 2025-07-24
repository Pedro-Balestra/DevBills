export const fomartCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency"
    }).format(value);
}