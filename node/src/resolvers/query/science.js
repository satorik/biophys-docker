const scienceQuery = {
  async scienceRoutes(parent, {id}, {models}, info) {
    let routes
    if (id) {
      routes = await models.ScienceRoute.findAll({raw:true, where: {id}})
    }
    else {
      routes = await models.ScienceRoute.findAll({raw:true })
    }
    for (const route of routes) {  
      const groups = await models.ScienceGroup.findAll({raw: true, where:{scienceRouteId: route.id}})
      route.groups = groups
    }
    return routes
  },
  async scienceGroups(parent, {id, scienceRouteId}, {models}, info) {
    let WHERE = {}
   
    if (parent) {WHERE = {scienceRouteId: parent.id}}
    if (scienceRouteId) { WHERE = {...WHERE, scienceRouteId: scienceRouteId} }
    if (id) {
      WHERE = {...WHERE, id}  
    }
    
    const groups = await models.ScienceGroup.findAll({raw:true, where: WHERE})

    for (const group of groups) {  
      const people = await models.SciencePeople.findAll({raw: true, where:{scienceGroupId: group.id}})
      const articles = await models.ScienceArticle.findAll({raw: true, where:{scienceGroupId: group.id}})
      group.people = people
      group.articles = articles
    }
    return groups
  }
}

export default scienceQuery