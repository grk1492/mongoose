//Chargement du module mongoose
var mongoose = require('mongoose');
//connection à la db via mongoose
mongoose.connect('mongodb://localhost/myTestDB');
//
var db = mongoose.connection;

db.on('error',function(err) {
	console.log('connection error',err);
});

db.once('open',function(){
	console.log('connected');
});

//Schema permet structurer les datas de la collection
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:String,
	age:Number,
	DOB:Date,
	isAlive:Boolean
});

userSchema.methods.isYounger = function() {
	return this.model('User').age < 30 ? true : false ;
}

var User = mongoose.model('User',userSchema);

var grace = new User({
	name:"Grace",
	age:25,
	DOB:'06.14.1992',
	isAlive:true
});

grace.save(function(err,data){
	if(err) {
		console.log('Error is ' + err);
	} else {
		console.log('Following user added ' + data);
	}
});

console.log('isYounger : ', grace.isYounger());

