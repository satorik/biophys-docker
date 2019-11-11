const scheduleYear = (sequelize, DataTypes ) => {
  return sequelize.define('scheduleYear', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calendarYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  freezeTableName: true
})
}

export default scheduleYear