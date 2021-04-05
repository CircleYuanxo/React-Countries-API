const BASE_URL = 'https://restcountries.eu/rest/v2'

export const getAll = () => {
  return fetch(`${BASE_URL}/all`).then(res => res.json())
}

export const getCountrybyCode = (code) => {
  return fetch(`${BASE_URL}/alpha/${code}`).then(res => res.json())
}
