const PlainText =   `
  enum SECTION {
    HISTORY
    ADMISSION
  }

  type HistoryText {
    id: ID!
    content: String!
    imageUrl: String!
  }

  input HistoryCreateData {
    image: Upload!
    section: SECTION! = HISTORY
    content: String!
  }

  input HistoryUpdateData {
    image: Upload
    section: SECTION! = HISTORY
    content: String
  }

  type AdmissionText {
    id: ID!
    content: String!
  }

  input AdmissionCreateData {
    section: SECTION! = ADMISSION
    content: String!
  }

  input AdmissionUpdateData {
    section: SECTION! = ADMISSION
    content: String
  }
`

export default PlainText