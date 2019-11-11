import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import ScienceGroupListItem from './ScienceGroupListItem'
import ScienceGroupInfo from './ScienceGroupInfo'


const GET_SCIENCE_GROUPS = gql`                    
    query getSienceGroups($scienceRouteId: ID!){
      scienceGroups(scienceRouteId: $scienceRouteId){
        id
        title
        desc
        tel
        imageUrl
        mail
        room
        people {
          id
          firstname
          middlename
          lastname
          desc
          tel
          mail
          birthday
          type
        }
        articles {
          id
          author,
          title,
          journal
        }
    }
  }
  `

const ScienceGroup = ({match}) => {

  const [selectedScienceGroup, setSelectedScienceGroup] = React.useState(0)

  const { loading, error, data } = useQuery(GET_SCIENCE_GROUPS, {variables: {scienceRouteId: match.params.id}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {scienceGroups} = data

  const onSelectScinceGroupHandler = (id) => {
    setSelectedScienceGroup(id)
  }

  console.log(data)
  return (
    <div className="container mt-5">
      <div className="card">

        {scienceGroups.map(scienceGroup => 
          <ScienceGroupListItem 
              key = {scienceGroup.id}
              onClickHandle = {() => onSelectScinceGroupHandler(scienceGroup.id)}
              groupTitle = {scienceGroup.title}
              groupClass = "card-header"
              showInfo = {selectedScienceGroup === scienceGroup.id}
              style={selectedScienceGroup === scienceGroup.id ? {backgroundColor:'#dc3545', color:'white', fontWeight: 'bold'} : null}
              groupInfo = {scienceGroup}
          />
        )}

      </div>
    </div>
  )
}

export default ScienceGroup
