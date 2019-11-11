const scheduleTimetable = (sequelize, DataTypes ) => {
  return  sequelize.define('scheduleTimetable', {
  discipline: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lectureHall: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lector: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timeFrom: {
    type: DataTypes.TIME,
    allowNull: false 
  },
  timeTo: {
    type: DataTypes.TIME,
    allowNull: true 
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  yearId: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  dayId: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  isEven: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  isDouble: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  orderNumber: {
    type:  DataTypes.INTEGER,
    allowNull: false
  },
  isTimeRight: {
    type:  DataTypes.BOOLEAN,
    allowNull: false
  }
},
{
  freezeTableName: true
})
}

export default scheduleTimetable