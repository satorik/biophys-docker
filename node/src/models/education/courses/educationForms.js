const educationForm = (sequelize, DataTypes ) => {
  return sequelize.define('educationForm', {
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
  }
  }
  )
}

export default educationForm