const educationCourse = (sequelize, DataTypes ) => {
  return sequelize.define('educationCourse', {
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
  description: { 
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"title required"
      }
    }
  },
  read: {
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
  lector: {
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
  exam: {
    type:DataTypes.ENUM('EXAM', 'TEST')
  }
  }
  )
}

export default educationCourse