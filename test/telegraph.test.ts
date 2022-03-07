import TelegraphClient from "../src";

// Set accessToken to empty to create new account in the test
// const accessToken = ''
const accessToken = '0b1543ee3d7525b95f3499e6866ad7ed335f5328ca8c32c193388e611692'

var _client: TelegraphClient

const getClient= () => {
  const client = new TelegraphClient(accessToken)
  if (accessToken) {
    if (!_client) {
      _client = client
    }
    return _client
  }
  return client
}

test("createAccount", async () => {
  const client = getClient()
  if (client.accessToken) {
    console.log('use existing account', client.accessToken)
    return
  }
  const account = await client.createAccount("test", "Test User")
  expect(account).toHaveProperty('access_token')
  console.log('new account created', JSON.stringify(account))
})

test("getPageList", async () => {
  const pageList = await getClient().getPageList()
  expect(pageList).toHaveProperty('total_count')
  console.log('got pageList', JSON.stringify(pageList))
})
