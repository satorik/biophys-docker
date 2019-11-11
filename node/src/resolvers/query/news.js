const newsQuery = {
  async getNews(parent, {contentType, limit, offset}, { models }, info) {
    let options = {
      raw: true,
      order: [['updatedAt', 'DESC']]
    }
 
    if (contentType !== 'news') {
      options = {
        ...options,
        where: {contentType}
      }
    }

    if (limit) {
      options = {
        ...options,
        limit: limit
      }
    }

    if (offset) {
      options = {
        ...options,
        offset: offset
      }
    }

    let totalCount = 4
    if (contentType === 'news') {
      const notes = await models.News.findAll({ raw: true, where: {contentType: 'note'}, limit: 4, order: [['updatedAt', 'DESC']] })
      const conferences = await models.News.findAll({ raw: true, where: {contentType: 'conference'}, limit: 4, order: [['updatedAt', 'DESC']] })
      const updatedConferences = conferences.map(conference => {
        return {
          ...conference,
          dateFrom: conference.dateFrom.toISOString(),
          dateTo: conference.dateTo.toISOString(),
          createdAt: conference.createdAt.toISOString(),
          updatedAt: conference.updatedAt.toISOString()
        }
      })
      const seminars = await models.News.findAll({ raw: true, where: {contentType: 'seminar'}, limit: 4, order: [['updatedAt', 'DESC']] })
      const updatedSeminars = seminars.map(seminar => {
        return {
          ...seminar,
          date: seminar.date.toISOString(),
          createdAt: seminar.createdAt.toISOString(),
          updatedAt: seminar.updatedAt.toISOString()
        }
      })

      const blogposts = await models.News.findAll({ raw: true, where: {contentType: 'blogpost'}, limit: 6, order: [['updatedAt', 'DESC']] })
      const updatedBlogposts = blogposts.map(blogpost => {
        return {
          ...blogpost,
          createdAt: blogpost.createdAt.toISOString(),
          updatedAt: blogpost.updatedAt.toISOString()
        }
      })
      return [...notes, ...updatedConferences, ...updatedSeminars, ...updatedBlogposts]
    }
    else {
      totalCount = await models.News.count({where: {contentType}})
      const news = await models.News.findAll(options)
      const updatedNews = news.map(item => {
        return {
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          dateFrom: item.dateFrom ? item.dateFrom.toISOString() : null,
          dateTo: item.dateTo ? item.dateTo.toISOString() : null,
          date: item.date ? item.date.toISOString() : null,

        }
      })
      return {news: updatedNews, totalCount: totalCount}
    }
  }
}

export default newsQuery