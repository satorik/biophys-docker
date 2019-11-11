const conferenceQuery = {
  async conferences(parent, {limit, offset}, { models }, info) {
    const options = {
      raw: true,
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset
    }
    return models.Conference.findAll(options)
  },
}

export default conferenceQuery