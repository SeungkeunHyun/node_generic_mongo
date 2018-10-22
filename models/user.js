const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const crypto = require("crypto");

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
		}
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	salt: {
		type: String
	}
});

UserSchema.methods.toJSON = function () {
	return {
		_id: this._id,
		email: this.email,
		token: this.generateJWT()
	};
};

UserSchema.methods.setPassword = function () {
	console.log("This", this);
	this.salt = crypto.randomBytes(16).toString('hex');
	this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.password === hash;
};

UserSchema.methods.generateJWT = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};

UserSchema.pre('save', function (next) {
	var user = this;
	user.setPassword();
	next();
});

var User = mongoose.model("User", UserSchema);
//console.log("UserModel", User, "Mongoose", mongoose);
module.exports = User;