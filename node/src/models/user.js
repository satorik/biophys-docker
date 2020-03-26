const User = (sequelize, DataTypes ) => {
  return sequelize.define('user', {
  email: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    unique: true,
    validate:{
      notEmpty:{
          args:true,
          msg:"Title required"
      },
      isEmail:{
          args:true,
          msg:"Must be a valid email"
      }
    }
  },
  username: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Description required"
      }
    }
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i
  },
  role: {type:DataTypes.ENUM('USER', 'ADMIN')}
  }, {
   
  })}

export default User