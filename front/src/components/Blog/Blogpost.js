import React from 'react'
import {getDateToLocal} from '../../utils/dateFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import EditButtons from '../UI/EditButtons'

const Blogpost = ({blogpost, idx, onClickEdit, onClickDelete, showContent, onHandleCaretDown, toScroll, onScroll, id}) => {

  const divEl = React.useRef(null)

  React.useEffect(() => {
    if (toScroll === id) {
      divEl.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
      onScroll()
    }
  }, [])

  const { innerWidth: width, innerHeight: height } = window

  const isEven = idx % 2 === 1

  const headerClass = `col-md-6 text-white bg-dark p-3 ${isEven ? 'text-right' : 'text-left'}`
  const imageDivClass = `col-md-6 p-3 ${isEven ? 'text-left' : 'text-right'}`
  const gradientStyle = {background: `linear-gradient(${isEven ? 'to left' : 'to right'}, #343a40 85%, white 85%)`, overflow: 'hidden'}

  const image = <div className={imageDivClass} style={gradientStyle} key='image'>
                    <img 
                    src={process.env.REACT_APP_STATIC_URI+blogpost.imageUrl} 
                    alt="" 
                    style={{height:'10rem'}}
                    className="img-thumbnail" 
                    />
                </div>
  const header = <div className={headerClass} key='header'>
                    <div>
                      <h2>{blogpost.title}</h2> 
                      <p>{getDateToLocal(blogpost.createdAt)}</p>
                    </div>
                    <div>
                    <EditButtons 
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                        size="lg"
                        color="white"
                        row
                      />
                    </div>
                 </div>

  const content = () => {
    if (width < 768) {return [image, header] }
    if (!isEven) {return [header, image]}
    if (isEven) {return [image, header]}
  }

  return (
    <div className="container mt-5" ref={divEl}>
      <div className="row">
         {content()}
      </div>
      <div className="row text-justify px-5 pt-5 bg-light">
        {!showContent && <p className="m-0">{blogpost.description}</p>}
        {showContent && <p dangerouslySetInnerHTML={{__html: blogpost.content}}></p>}
        <div className="d-block w-100 m-0 text-center"><FontAwesomeIcon icon={showContent ? faCaretUp : faCaretDown} size="2x" onClick={() => onHandleCaretDown()} /></div>
      </div>
    </div>
  )
}

export default Blogpost