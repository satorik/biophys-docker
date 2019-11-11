const seminarQuery = {
  seminars(parent, {limit, offset}, { models }) {
    const options = {
      raw: true,
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset
    }

    return models.Seminar.findAll(options)
  },
}

export default seminarQuery