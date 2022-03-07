import * as superagent from 'superagent'

const constants = {
  API_URL: 'https://api.telegra.ph/',
}

interface Account {
  access_token: string
  short_name: string
  author_name: string
  author_url: string
  auth_url: string
  page_count: string
}

export default class TelegraphClient {
  accessToken: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken
  }

  async request(method: string, path: string, data: any = {}): Promise<any> {
    let req = superagent(method, `${constants.API_URL}${path}`)
    if (Object.keys(data).length > 0) {
      req = req.send(data)
    }

    // determine what condition is ok
    req = req.ok(res => {
      return res.ok === true
    })

    try {
      const res = await req
      return res.body.result
    } catch(err) {
      console.error(`${method} ${path} error: ${err.response.status} ${err.response.text}`)
      throw new Error(`TelegraphClient.request failed: ${err.message}`)
    }
  }

  async createAccount(shortName: string, authorName: string): Promise<Account>  {
    const data = await this.request('POST', `/createAccount`, {
      short_name: shortName,
      author_name: authorName,
    })
    return data as Account
  }
}
