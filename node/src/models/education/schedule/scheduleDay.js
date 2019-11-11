const scheduleDay = (sequelize, DataTypes ) => {
  return sequelize.define('scheduleDay', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
}

export default scheduleDay