var x = db.sales.find().limit(10).toArray()
printjson(x)
