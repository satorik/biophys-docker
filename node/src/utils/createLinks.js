const createLinks = async (models) => {
  /////////////TOP LEVEL
  await models.navigationLink.create(
    {
      title: 'Кафедра',
      path: '/department',
      level: 0,
      upLinkId: null
    })

  await models.navigationLink.create(
    {
      title: 'Семинары',
      path: '/seminar',
      level: 0,
      upLinkId: null
    })


  await models.navigationLink.create(
    {
      title: 'Конференции',
      path: '/conference',
      level: 0,
      upLinkId: null
    })

  await models.navigationLink.create(
    {
      title: 'Блог',
      path: '/blogpost',
      level: 0,
      upLinkId: null
    })

  await models.navigationLink.create(
    {
      title: 'Учебный процесс',
      path: '/education',
      level: 0,
      upLinkId: null
    })

  await models.navigationLink.create(
    {
      title: 'Наука',
      path: '/science',
      level: 0,
      upLinkId: null
    })

  /////////////SECOND LEVEL
  const departmentLink = await models.navigationLink.findOne({where: {path: '/department'}})
  const educationLink = await models.navigationLink.findOne({where: {path: '/education'}})
  const scienceLink = await models.navigationLink.findOne({where: {path: '/science'}})

  await models.navigationLink.create(
    {
      title: 'История',
      path: '/history',
      level: 1,
      upLinkId: departmentLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Члены',
      path: '/staff',
      level: 1,
      upLinkId: departmentLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Сотрудничество',
      path: '/partnership',
      level: 1,
      upLinkId: departmentLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Печать',
      path: '/prints',
      level: 1,
      upLinkId: departmentLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Расписание',
      path: '/schedule',
      level: 1,
      upLinkId: educationLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Прием на кафедру',
      path: '/admission',
      level: 1,
      upLinkId: educationLink.id
    })

  await models.navigationLink.create(
    {
      title: 'Учебные курсы',
      path: '/courses',
      level: 1,
      upLinkId: educationLink.id
    })

  const scienceRouteLinks = await models.scienceRoute.findAll({raw: true})

  for (const scieneRouteLink of scienceRouteLinks) {

  await models.navigationLink.create(
    {
      title: scieneRouteLink.title,
      path: '/route/'+scieneRouteLink.id,
      level: 1,
      upLinkId: scienceLink.id
    })
  }

  console.log('links created');
}

export default createLinks