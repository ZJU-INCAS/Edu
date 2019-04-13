interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || '',
  api: process.env.api || ''
}

export default host
