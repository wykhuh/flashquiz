module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define('Scores', {
  
    score: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
    date: {
      type: DataTypes.DATE,
      validate: {
        notNull: true,
        
        
        
      },
      get: function() {
        var value = this.getDataValue('date')
        return value ? value.toISOString().substring(0, 10) : value
      }
    },
  
    questionsCount: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        
        
        
      },
      
    },
  
  })

  return Scores
}
