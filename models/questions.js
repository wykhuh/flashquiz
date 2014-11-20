module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
  
    question: {
      type: DataTypes.STRING
    },
  
    correctAnswer: {
      type: DataTypes.STRING
    },
  
    option1: {
      type: DataTypes.STRING
    },
  
    option2: {
      type: DataTypes.STRING
    },
  
    option3: {
      type: DataTypes.STRING
      
    }
  
  })

  return Questions
}
