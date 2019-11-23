const  sharedQuery = {
  links(parent, args, { models }, info) {
    return models.NavigationLink.findAll({ where: {level: 0}, raw: true })
  }
}

export default sharedQuery