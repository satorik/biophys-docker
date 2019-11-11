const blogpostQuery = {
  async blogposts(parent, {limit, offset}, { models }, info) {
    const options = {
      raw: true,
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset
    }

    const totalCount = await models.Blogpost.count()
    const blogposts = await models.Blogpost.findAll(options)

    return {
      posts: blogposts,
      total: totalCount
    }
  }
}

export default blogpostQuery