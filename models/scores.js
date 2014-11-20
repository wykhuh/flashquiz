module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define('Scores', {
  
    score: {
      type: DataTypes.FLOAT
    },
  
    date: {
      type: DataTypes.DATE,
      get: function() {
        var value = this.getDataValue('date')
        return value ? value.toISOString().substring(0, 10) : value
      }
    },
  
    questionsCount: {
      type: DataTypes.INTEGER,
    }
  
  })

  return Scores
}
