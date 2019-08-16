export const parseCountry = (str: string) => str.slice(0, str.indexOf(','));

export const parseCity = (str: string) => str.slice(str.indexOf(', '));