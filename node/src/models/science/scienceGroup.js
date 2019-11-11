const scienceGroup = (sequelize, DataTypes ) => {
  return sequelize.define('scienceGroup', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: { type: DataTypes.TEXT},
  imageUrl: {type: DataTypes.STRING},
  tel: { type: DataTypes.TEXT},
  mail: { type: DataTypes.TEXT},
  room: { type: DataTypes.TEXT}
  }
  )
}

export default scienceGroup