'use strict'

const mongoose = require('mongoose');

// mongodb connectiion
mongoose.connect('mongodb://127.0.0.1:27017/sandbox');
let db = mongoose.connection;
// if mongo conection error
db.on('error', console.error.bind(console, 'connection error:'));

db.on('error', function (err) {
  console.log('connection error:', err);
});

db.once('open', function() {
  console.log('db connection successfull');

  let Schema = mongoose.Schema;

  let AnimalSchema = new Schema({
    type: {type: String, default: 'Goldfish'},
    size: String,
    color: {type: String, default: 'Gold'},
    mass: {type: Number, default: '0.004'},
    name: {type: String, default: 'Angela'}
  });

  let Animal = mongoose.model('Animal', AnimalSchema);

  let elephant = new Animal({
    type: 'Elephan',
    color: 'Gray',
    mass: 5000,
    name: 'Lawrance'
  });

  let animal = new Animal({});

  let whale = new Animal({
    type: 'Whale',
    mass: 500.000,
    name: 'Fig'
  });

  let animalData = [
    {
      type: 'mouse',
      color: 'grey',
      mass: 0.045,
      name: 'Marvin'
    },
    {
      type: 'nitria',
      color: 'brown', 
      mass: 0.045,
      name: 'Gretchen'
    },
    {
      type: 'wolf',
      color: 'grey',
      mass: 0.045,
      name: 'Iris'
    },
    animal,
    whale,
    elephant
  ];

  AnimalSchema.statics.findSize = function(size, callback) {
    return this.find({size: size}, callback);
  }

  AnimalSchema.methods.findSameColor = function(callback) {
    return this.model('Animal').find({color: this.color}, callback);
  }

  AnimalSchema.pre('save', function(next) {
    var animal = this;
    if (animal.mass >= 100) {
      animal.size = 'Big';
    } else if (animal.mass >= 5 && animal.mass < 100){
      animal.size = 'Medium';
    } else {
      animal.size = 'Small'
    }
    next();
  });

  Animal.findOne({type: 'Elephan'}, function(err, elephan) {
    if (err) console.log('read failed', err);
    elephan.findSameColor(function (err, animals) {  
      if (err) console.log('read failed', err);
      animals.forEach((animal) => {
        console.log(animal.name + ' the ' + animal.color + ' size: ' + animal.size);
      });
    });
  });

  Animal.deleteMany({}, function(err) {
    if (err) console.log('delete failed', err);
  });

  Animal.create(animalData, (err, animal) => {
    if (err) console.log('save failed', err);
    db.close(function() {
      console.log('db connection closed');
    });
  });

  // elephant.save(function(err) {
  //   if (err) console.log('save failed', err);
  //   animal.save(function(err) {
  //     if (err) console.log('save failed', err);
  //     whale.save(function(err) {
  //       if (err) console.log('save failed', err);
  //       db.close(function() {
  //         console.log('db connection closed');
  //       });
  //     });
  //   });
  // });

});