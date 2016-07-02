var mongo = require('mongodb').MongoClient
var firstName = process.argv[2]
var lastName = process.argv[3]

var url = 'mongodb://localhost:27017/learnyoumongo'

var doc ={
    firstName: firstName,
  lastName: lastName
}

mongo.connect(url, function(err, db) {
  if (err) throw err
  var docs = db.collection('docs')
   
  
    docs.insert(doc, function(err, data) {
    if (err) {
      return console.error(err)
    }

   
    console.log(JSON.stringify(doc))
    db.close()
  })
})