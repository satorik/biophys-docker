const Department =   `
  type DepartmentStaff {
    id: ID!
    firstname: String!
    middlename: String!
    lastname: String!
    imageUrl: String!
    jobTitle: String!
    description: String!
    tel: String!
    position: Int!
    mail: String!
  }

 input DepartmentStaffCreateData {
    firstname: String!
    middlename: String!
    lastname: String!
    image: Upload!
    jobTitle: String!
    description: String!
    tel: String!
    mail: String!
 }

  input DepartmentStaffUpdateData {
    firstname: String
    middlename: String
    lastname: String
    image: Upload
    jobTitle: String
    description: String
    tel: String
    mail: String
  }

  type DepartmentPrint {
    id: ID!
    link: String!
    imageUrl: String!
    description: String!
    title: String!
  }

  input DepartmentPrintCreateData {
    image: Upload!
    file: Upload!
    description: String!
    title: String!
  }

  input DepartmentPrintUpdateData {
    image: Upload
    file: Upload
    description: String
    title: String
  }

  type DepartmentPartnership {
    id: ID!
    link: String!
    imageUrl: String!
    description: String!
    title: String!
  }

  input DepartmentPartnershipCreateData {
    link: String!
    image: Upload!
    description: String!
    title: String!
  }

  input DepartmentPartnershipUpdateData {
    link: String
    image: Upload
    description: String
    title: String
  }
`
export default Department