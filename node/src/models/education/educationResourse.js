const educationResourse = (sequelize, DataTypes ) => {
  return sequelize.define('educationResourse', {
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: { type: DataTypes.STRING },
  desc: { type: DataTypes.TEXT}
  }
  )
}

export default educationResourse