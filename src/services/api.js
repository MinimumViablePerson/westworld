const baseUrl = 'http://localhost:3001'
const areasUrl = baseUrl + '/areas'
const hostsUrl = baseUrl + '/hosts'

const get = url => fetch(url).then(resp => resp.json())

export const getAreas = () => get(areasUrl)
export const getHosts = () => get(hostsUrl)
