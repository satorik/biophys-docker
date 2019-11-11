const  sharedQuery = {
  links(parent, args, { models }, info) {
    return models.NavigationLink.findAll({ where: {level: 0}, raw: true })
  },
  async text(parent, {section}, { models }, info) {
    const text = await models.TextDescription.findOne({where: {section}})
    return text.content
  }
}

export default sharedQuery