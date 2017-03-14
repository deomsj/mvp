var mongoose = require('mongoose');
var assert = require('assert');
var Leader = require('../models/leaders');

before(function(done) {

  mongoose.Promise = global.Promise;

  //log message when connection to db has been established
  mongoose.connection.once('open', function() {
    console.log('connected to database');
    done();
  }).on('error', function(error) {
    console.log('Connection error: ', error);
    done();
  });
});

//drop leaders collection before each test
beforeEach(function(done){
  mongoose.connection.collections.leaders.drop(function(){
    console.log('clearing collection before test');
    done();
  });
});

describe('saving to the db', function() {

  it('adds name and score to db', function(done) {
    var leader = new Leader({
      name: 'Issac',
      score: 9
    });

    leader.save().then(function() {
      assert(5===5);
      assert(leader.isNew === false);
      done();
    });

  });

});