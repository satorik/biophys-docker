const educationCourse = (sequelize, DataTypes ) => {
  return sequelize.define('educationCourse', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: { type: DataTypes.TEXT}
  }
  )
}

export default educationCourse