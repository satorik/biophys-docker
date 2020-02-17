const educationResourse = (sequelize, DataTypes ) => {
  return sequelize.define('educationResourse', {
  title: {
    type: DataTypes.STRING(300),
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"title required"
      },
      len:{
          args:[5, 300],
          msg:"Minimum 5 characters, Maximum 300 characters"
      }
    }
  },
  type: {type:DataTypes.ENUM('URL', 'PDF')},
  description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  image: {type: DataTypes.TEXT},
  fileLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
      notEmpty:{
        args:true,
        msg:"link required"
      }
    }
  }
  }
  )
}

export default educationResourse