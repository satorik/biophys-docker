import React from 'react'
import EditButtons from '../UI/EditButtons'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

export const PrintCard = ({fileLink}) => {
 
  const [numPages, setNumPages] = React.useState(null)

  const  onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  return (
      <div className="col-md-6">
        <Document
          file={process.env.REACT_APP_STATIC_URI+fileLink}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
        </Document>
        <p>Page 1 of {numPages}</p>
      </div>
  )
}