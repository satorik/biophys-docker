import React from 'react'
import { Editor } from 'slate-react'
import Plain from 'slate-plain-serializer'
import Html from 'slate-html-serializer'

import EditorButton from './EditorButton'

const initialValue = Plain.deserialize('')
const html = new Html()

const DEFAULT_NODE = 'paragraph'

const RichTextEditor = () => {

  let editor = React.createRef()

  const [value, setValue] = React.useState(initialValue)

  const onChangeTextValue = ({value}) => {
    const content = JSON.stringify(value.toJSON(), null, '\t')
    console.log(content)
   // const newcontent = html.serialize(value)
    //console.log(newcontent)
    setValue(value)
  }

  const wrapLink = (href) => {
    editor.current.wrapInline({
      type: 'link',
      data: { href },
    })
  
    editor.current.moveToEnd()
  }

  const unwrapLink = () => {
    editor.current.unwrapInline('link')
  }

  const hasMark = type => {
    return value.activeMarks.some(mark => mark.type === type)
  }

  const hasBlock = type => {
    return value.blocks.some(node => node.type === type)
  }

  const hasLinks = () => {
    return value.inlines.some(inline => inline.type === 'link')
  }

  const onClickMark = (event, type) => {
    event.preventDefault()
    editor.current.toggleMark(type)
  }

  const onClickLink = (event, type) => {
    event.preventDefault()

    const hasLinks = value.inlines.some(inline => inline.type === 'link')

    if (hasLinks) {
      editor.current.command(unwrapLink)
    } else if (value.selection.isExpanded) {
      const href = window.prompt('Enter the URL of the link:')

      if (href == null) {
        return
      }

      editor.current.command(wrapLink, href)
    } else {
      const href = window.prompt('Enter the URL of the link:')

      if (href == null) {
        return
      }

      const text = window.prompt('Enter the text for the link:')

      if (text == null) {
        return
      }

      editor.current
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapLink, href)
    }
  }

  const onClickBlock = (event, type) => {
    event.preventDefault()

    const { document } = value

    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type)
      const isList = hasBlock('list-item')

      if (isList) {
        editor.current
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.current.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      const isList = hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor.current
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor.current
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.current.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  const renderMarkButton = (type, icon) => {
    const isActive = hasMark(type)
    return (
      <button className={`btn mr-1 ${isActive ? "btn-secondary" : "btn-outline-secondary"}`} onMouseDown={event => onClickMark(event, type)}>
        <EditorButton icon={icon} />
      </button>
    )
  }

  const renderInlineButton = (type, icon) => {
    const isActive = hasLinks()
    return (
      <button className={`btn mr-1 ${isActive ? "btn-secondary" : "btn-outline-secondary"}`} onMouseDown={onClickLink}>
        <EditorButton icon={icon} />
      </button>
    )
  }

 const renderBlockButton = (type, icon) => {
    let isActive = hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {

      const { document, blocks }  = value

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <button className={`btn mr-1 ${isActive ? "btn-secondary" : "btn-outline-secondary"}`} onMouseDown={event => onClickBlock(event, type)}>
        <EditorButton icon={icon} />
      </button>
    )
  }

  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }
  
  const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  return (
    <div className="container mt-5">
        <div className="container d-flex mt-5 mb-2">
          {renderMarkButton('bold', 'bold')}
          {renderMarkButton('italic', 'italic')}
          {renderMarkButton('underlined', 'underline')}
          {renderMarkButton('strikethrough', 'strikethrough')}
          {renderInlineButton('link', 'link')}
          {renderBlockButton('block-quote', 'quote-right')}
          {renderBlockButton('numbered-list', 'list-ol')}
          {renderBlockButton('bulleted-list', 'list-ul')}
        </div>
        <div className="border p-1">
          <Editor
            autoFocus
            placeholder="Enter some rich text..."
            value={value}
            ref={editor}
            onChange={onChangeTextValue}
            renderMark = {renderMark}
            renderBlock={renderBlock}
          />
        </div>
      </div>
  )
}

export default RichTextEditor
