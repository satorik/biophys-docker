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
    allowNull: true
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
  englishName: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  position: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  description: {type: DataTypes.STRING, allowNull: true},
  tel: {type: DataTypes.STRING, allowNull: true},
  mail: {type: DataTypes.STRING, allowNull: true},
  birthday: {type: DataTypes.DATE, allowNull: true},
  urlIstina:{type:DataTypes.STRING, allowNull: true},
  urlRints:{type:DataTypes.STRING, allowNull: true},
  urlOrcid:{type:DataTypes.STRING, allowNull: true},
  urlResearcher:{type:DataTypes.STRING, allowNull: true},
  urlScopus:{type:DataTypes.STRING, allowNull: true},
  type:{type:DataTypes.ENUM('STAFF', 'STUDENT')},
  },
  {
    freezeTableName: true
  })
}

export default sciencePeople