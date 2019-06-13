const baseUrl = 'http://localhost:3000'
const areasUrl = baseUrl + '/areas'
const hostsUrl = baseUrl + '/hosts'
const logsUrl = baseUrl + '/logs?_sort=id&_order=desc'

const get = url => fetch(url).then(resp => resp.json())

const patch = (url, data) => fetch(url, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(resp => resp.json())

const post = (url, data) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(resp => resp.json())

export const getAreas = () => get(areasUrl)
export const getHosts = () => get(hostsUrl)
export const getLogs = () => get(logsUrl)
export const updateHost = host => patch(`${hostsUrl}/${host.id}`, host)
export const addLog = log => post(logsUrl, log)

export default { getAreas, getHosts, updateHost, getLogs, addLog }
