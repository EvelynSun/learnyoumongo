var mongo = require('mongodb').MongoClient


var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
  if (err) throw err
  var prices = db.collection('prices')
  prices.aggregate([
    { $match: {
      size: process.argv[2]
    }}
  , { $group: {
      _id: 'average'
    , average: {
        $avg: '$price'
      }
    }}
  ]).toArray(function(err, results) {
    if (err) throw err
    if (!results.length) {
      throw new Error('No results found')
    }
    var o = results[0]
  //  console.log(results);
    console.log(Number(o.average).toFixed(2))
    db.close()
  })
})