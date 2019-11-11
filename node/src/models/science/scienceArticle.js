const scienceArticle = (sequelize, DataTypes ) => {
  return sequelize.define('scienceArticle', {
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: { type: DataTypes.TEXT, allowNull: false},
  journal: { type: DataTypes.TEXT},
  }
  )
}

export default scienceArticle