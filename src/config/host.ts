interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || '',
  api: 'http://10.214.144.223:8081'
}

export default host
