const noteQuery = {
  notes(parent, {limit, offset}, { models }) {
    const options = {
      raw: true,
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset
    }

  return models.Note.findAll(options)
  },
}

export default noteQuery