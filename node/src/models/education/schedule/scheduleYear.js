const scheduleYear = (sequelize, DataTypes ) => {
  return sequelize.define('scheduleYear', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false 
  }
},
{
  freezeTableName: true
})
}

export default scheduleYear