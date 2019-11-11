const scheduleTime = (sequelize, DataTypes ) => {
  return sequelize.define('scheduleTime', {
  timeFrom: {
    type: DataTypes.TIME,
    allowNull: false
  },
  timeTo: {
    type: DataTypes.TIME,
    allowNull: false
  },
  orderNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
}

export default scheduleTime