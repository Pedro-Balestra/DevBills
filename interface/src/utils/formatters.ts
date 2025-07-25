export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency"
    }).format(value);
}

export const formatDate = (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return new Intl.DateTimeFormat("pt-br").format(dateObj)
}