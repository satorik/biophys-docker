const navigationLink = (sequelize, DataTypes) => {
  const link = sequelize.define('navigationLink', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, {
    // options
  })
  link.hasOne(link, { as: 'upLink' })

  return link
}

export default navigationLink