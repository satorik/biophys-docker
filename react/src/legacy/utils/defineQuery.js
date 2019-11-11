import {queries} from './queries'

const defineQuery = (pathname) => {

  if (!pathname) {
    throw new Error('No pathname')
  }

  const contentType = pathname.split('/')[1]


  const query = queries[contentType]

  if (!query) {
    throw new Error('No query found for pathname=', pathname)
  }

  return query
}

export default defineQuery