const scienceRoute = (sequelize, DataTypes ) => {
  return sequelize.define('scienceRoute', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: { type: DataTypes.TEXT}
  }
  )
}

export default scienceRoute