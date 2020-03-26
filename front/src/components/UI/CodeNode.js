import React from 'react'

const CodeNode = ({attributes, children}) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}

export default CodeNode
