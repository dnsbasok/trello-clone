const base = 'https://jsonplaceholder.typicode.com'

async function getUsers () {
  const usersEndpoint = `${base}/users`
  const response = await fetch(usersEndpoint)
  const usersData = await response.json()

  return usersData
}

export { getUsers }
