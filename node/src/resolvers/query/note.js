const noteQuery = {
  notes(parent, {limit, offset, top}, { models }) {
    let options = {
      raw: true,
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset
    }
    if (top) {options = {...options, where: {onTop: true}}}

  return models.Note.findAll(options)
  },
}

export default noteQuery