const sciencePeople = (sequelize, DataTypes ) => {
  return sequelize.define('sciencePeople', {
  firstname: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Firstname required"
      },
      len:{
          args:[2, 100],
          msg:"Firstname 100 characters"
      }
    }
  },
  middlename: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Middlename required"
      },
      len:{
          args:[2, 100],
          msg:"Middlename 100 characters"
      }
    }
  },
  lastname: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Lastname required"
      },
      len:{
          args:[2, 100],
          msg:"Lastname 100 characters"
      }
    }
  },
  description: {type: DataTypes.TEXT, allowNull: true},
  tel: {type: DataTypes.STRING, allowNull: true},
  mail: {type: DataTypes.STRING, allowNull: true},
  birthday: {type: DataTypes.DATE, allowNull: true},
  url:{type:DataTypes.STRING, allowNull: true},
  type:{type:DataTypes.ENUM('STAFF', 'STUDENT')},
  },
  {
    freezeTableName: true
  })
}

export default sciencePeople