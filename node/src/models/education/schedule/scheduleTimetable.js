const scheduleTimetable = (sequelize, DataTypes ) => {
  return  sequelize.define('scheduleTimetable', {
  discipline: {
    type: DataTypes.STRING(500), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"discipline required"
      },
      len:{
          args:[5, 500],
          msg:"Minimem 5 characters, Maximum 500 characters"
      }
    }
  },
  lectureHall: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  lector: {
    type: DataTypes.STRING(250),
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
    allowNull: true,
    validate:{
      isDate:{
          args:true,
          msg:"Must be in date format"
      }
    }
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
    type:DataTypes.TINYINT,
    allowNull: false
  },
  isDouble: {
    type: DataTypes.INTEGER,
    allowNull: false 
  }
},
{
  freezeTableName: true
})
}

export default scheduleTimetable