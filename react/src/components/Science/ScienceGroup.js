import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, isUrl, email } from '../../utils/validators'

import ScienceGroupListItem from './ScienceGroupListItem'
import ButtonAddNew from '../UI/ButtonAddNew'
import MultiEdit from '../Shared/MultiEdit'

const GET_SCIENCE_GROUPS = gql`                    
    query getSienceGroups($scienceRouteId: ID!){
      scienceGroups(scienceRouteId: $scienceRouteId){
        id
        title
        description
        tel
        imageUrl
        mail
        room
        people {
          id
          firstname
          middlename
          lastname
          description
          tel
          mail
          birthday
          type
        }
        articles {
          id
          author
          title
          journal
        }
    }
  }
  `

const PEOPLE_TEMPLATE= [
  {
    title: 'firstname',
    label:'Имя',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'middlename',
    label:'Отчество',
    type: 'input',
    required: true,
    validators: [required, length({ min: 3})]
  },
  {
    title: 'lastname',
    label:'Фамилия',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'description',
    label:'Должность',
    type:'input',
  },
  {
    title: 'tel',
    label:'Телефон',
    type:'input',
  },
  {
    title: 'mail',
    label:'Почта',
    type:'input',
    validators: [email]
  },
  {
    title: 'url',
    label:'Ссылка на истрину',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'type',
    required: true,
    label:[{title:'Сотрудник', value: 'STAFF'}, {title:'Студент', value: 'STUDENT'}],
    type:'radio'
  },
]
const ARTICLE_TEMPLATE = [
  {
    title: 'author',
    label:'Автор',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
  {
    title: 'journal',
    label:'Опубликовано в',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
]


const FORM_TEMPLATE = [
  {
    title: 'image',
    label:'Картинка',
    type: 'file',
    required: true,
    validators: [required]
  },
  {
    title: 'title',
    label:'Название',
    type: 'input',
    required: true,
    validators: [required, length({ min: 5, max: 100 })]
  },
  {
    title: 'description',
    label:'Описание',
    type:'textarea',
    required: true,
    validators: [required, length({ min: 5})]
  },
  {
    title: 'tel',
    label:'Телефон',
    type:'input',
    required: true,
    validators: [required]
  },
  {
    title: 'mail',
    label:'Почта',
    type:'input',
    required: true,
    validators: [required, email]
  },
  {
    title: 'room',
    label:'Комната',
    type:'input',
    required: true,
    validators: [required]
  },
  {
    title: 'people',
    label:'Сотрудники',
    type:'array',
    controls: PEOPLE_TEMPLATE
  },
  {
    title: 'articles',
    label:'Публикации',
    type:'array',
    controls: ARTICLE_TEMPLATE
  }
] 

const ScienceGroup = ({match}) => {

  const [viewId, setviewId] = React.useState(0)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})

  const { loading, error, data } = useQuery(GET_SCIENCE_GROUPS, {variables: {scienceRouteId: match.params.id}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {scienceGroups} = data

  const onSelectScinceGroupHandler = (id) => {
    setviewId(id)
  }

  const onAddNewScienceGroup = () => {
    setMode({...mode, isCreating: true})
  }

  return (
    <div className="container mt-5">
      <div className="card">

        {scienceGroups.map(scienceGroup => 
          <ScienceGroupListItem 
              key = {scienceGroup.id}
              onClickHandle = {() => onSelectScinceGroupHandler(scienceGroup.id)}
              groupTitle = {scienceGroup.title}
              active = {viewId === scienceGroup.id}
              groupInfo = {scienceGroup}
          />
        )}
        {
          (mode.isEditing || mode.isCreating) && 
          <MultiEdit 
            formProp = {FORM_TEMPLATE}
          />
        }
        {
          !(mode.isEditing || mode.isCreating) && 
          <div className="card-header text-center">
            <ButtonAddNew
              color='green'
              onClickAddButton={onAddNewScienceGroup}
              size='2'
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ScienceGroup
