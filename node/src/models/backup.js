const BackUp = (sequelize, DataTypes ) => {
  return sequelize.define('backUp', {
  title: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    unique: true,
    validate:{
      notEmpty:{
          args:true,
          msg:"Title required"
      }
    }
  },
  }, {
   
  })}

export default BackUp