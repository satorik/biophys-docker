const NavigationLink = {
 subLinks(parent, args, { models }, info) {
    return models.NavigationLink.findAll({ where: {upLinkId: parent.id}, raw: true })
  },
 upLink(parent, args, { models }, info) {
   return models.NavigationLink.findByPk(parent.upLinkId)
 }
}

export default NavigationLink