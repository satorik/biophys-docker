import {gql} from "apollo-boost"

const queries = {
  'conferences' : gql`                    
  {
    conferences {
      id,
      title,
      content,
      imageUrl,
      dateFrom,
      dateTo
    }
  }
`,
'seminars': gql`                    
{
  seminars {
    id,
    title,
    content,
    date
  }
}
`,
'blogposts': gql`                    
{
  blogposts {
    id,
    title,
    content,
    imageUrl
  }
}
`,
'news': gql`                    
{
  news {
    id,
    title,
    content,
    imageUrl,
    date,
    dateFrom,
    dateTo,
    type,
    updatedAt
  }
}
`,
'department': gql`                    
{
  department{
    history
    staff{
      firstname
      desc
      tel
    }
    prints{
      link
      imageUrl
    }
    partnership{
      link
      desc
    }
  }
}
`,
'links' : gql`
{
  links {
    id,
    title,
    path,
    subLinks {
      id,
      title,
      path,
      upLink {
        path
      }
    }
  }
}
`
}


export {queries}