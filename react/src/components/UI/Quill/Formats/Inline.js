import { Quill } from 'react-quill'

const registerFormats = () => {
  Quill.debug('error')

  let Inline = Quill.import('blots/inline')

  class BoldBlot extends Inline { }
  BoldBlot.blotName = 'bold'
  BoldBlot.tagName = 'strong'

  class ItalicBlot extends Inline { }
  ItalicBlot.blotName = 'italic';
  ItalicBlot.tagName = 'em';

  class UnderlineBlot extends Inline { }
  UnderlineBlot.blotName = 'underline';
  UnderlineBlot.tagName = 'u';

  class LinkBlot extends Inline {
    static create(value) {
      let node = super.create()
      node.setAttribute('href', value)
      node.setAttribute('target', '_blank')
      return node;
    }
  
    static formats(node) {
      return node.getAttribute('href')
    }
  }
  LinkBlot.blotName = 'link'
  LinkBlot.tagName = 'a'
  

  let Block = Quill.import('blots/block');

  class BlockquoteBlot extends Block { }
  BlockquoteBlot.blotName = 'blockquote';
  BlockquoteBlot.tagName = 'blockquote';

  class HeaderBlot extends Block {
    static formats(node) {
      return HeaderBlot.tagName.indexOf(node.tagName) + 1;
    }
  }
  HeaderBlot.blotName = 'header';
  HeaderBlot.tagName = ['H1', 'H2'];

  Quill.register('formats/link', LinkBlot)
  Quill.register('formats/bold', BoldBlot)
  Quill.register('formats/underline', UnderlineBlot)
  Quill.register('formats/italic', ItalicBlot)

}

export default registerFormats