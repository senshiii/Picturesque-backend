const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String
		},
		bio: {
			type: String,
			default: ''
		},
		dpUrl:{
			type: String,
			default: ''
		},
		dpFile:{
			type: String,
			default: ''
		},
		password: {
			type: String
		},
		storage: {
			type: Number,
			default: 0
		},
		socials: {
			type: Array,
			default: []
		},
		images: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Image'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
