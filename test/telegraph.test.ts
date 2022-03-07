import TelegraphClient from "../src";

const getClient = () => {
  return new TelegraphClient()
}

test("createAccount", async () => {
  const account = await getClient().createAccount("test", "Test User")
  expect(account).toHaveProperty('access_token')
})
