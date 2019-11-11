const DepartmentStaff =   `
  type DepartmentStaff {
    id: ID!
    firstname: String!
    middlename: String!
    lastname: String!
    imageUrl: String!
    jobTitle: String!
    desc: String!
    tel: String!
    mail: String!
  }
`
const DepartmentPrint =   `
  type DepartmentPrint {
    id: ID!
    link: String!
    imageUrl: String!
    desc: String!
    title: String!
  }
`
const DepartmentPartnership =   `
  type DepartmentPartnership {
    id: ID!
    link: String!
    imageUrl: String!
    desc: String!
    title: String!
  }
`
export default [DepartmentPartnership, DepartmentPrint, DepartmentStaff]