module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
  
    question: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
    correctAnswer: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
    option1: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
    option2: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
    option3: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
  })

  return Questions
}
