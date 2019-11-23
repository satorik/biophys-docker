const scienceQuery = {
  async scienceRoutes(parent, {id}, {models}, info) {
    
    let WHERE = {}
    if (id) WHERE = {id}
    
    const options = {
      where: WHERE,
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: models.ScienceGroup,
          include:[
            {
              model: models.SciencePeople
            },
            {
              model: models.ScienceArticle
            }
          ]
        }
      ]     
    }

    const routes = await models.ScienceRoute.findAll(options)
    return routes.map(route => {
      return Object.assign(
        {},
        {
          id: route.id,
          title: route.title,
          description: route.description,
          scienceGroups: route.scienceGroups.map(group => {
            return Object.assign(
              {},
              {
                id: group.id,
                title: group.title,
                description: group.description,
                imageUrl: group.imageUrl,
                tel: group.tel,
                mail: group.mail,
                room: group.room,
                people: group.sciencePeople,
                articles: group.scienceArticles
              }
            )
          })
        }
      )
    })

  },
  async scienceGroups(parent, {id, scienceRouteId}, {models}, info) {

    let WHERE = {}
    if (id) WHERE = {id}
    if(scienceRouteId) WHERE={...WHERE, scienceRouteId}

    const options = {
      where: WHERE,
      include:[
        {
          model: models.SciencePeople
        },
        {
          model: models.ScienceArticle
        }
      ],
      order: [
        ['createdAt', 'ASC'],
        [{model: models.SciencePeople}, 'position', 'ASC'],
        [{model: models.ScienceArticle}, 'position', 'ASC']
      ],
    }

    
    const groups = await models.ScienceGroup.findAll(options)
    return groups.map(group => {
      return Object.assign(
        {},
        {
          id: group.id,
          title: group.title,
          description: group.description,
          imageUrl: group.imageUrl,
          tel: group.tel,
          mail: group.mail,
          room: group.room,
          people: group.sciencePeople,
          articles: group.scienceArticles
        }
      )
    })
  }
}

export default scienceQuery