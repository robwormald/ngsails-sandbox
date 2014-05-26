/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

var uuid = require('node-uuid')
var bcrypt = require('bcrypt')
    , SALT_WORK_FACTOR = 10
    , MIN_PASSWORD_LENGTH = 8;


/**
 * [hashPassword description]
 * @param  {Object}   values [description]
 * @param  {Function} next   [description]
 * @return {[type]}          [description]
 */
function hashPassword(values, next) {
    console.log(values)
    bcrypt.hash(values.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) {
            return next(err);
        }
        values.password = hash;
        next();
    });
}



module.exports = {



    // Subscribers only get to hear about update and destroy events.
    // This lets us keep our "users online" list accurate, while avoiding
    // sending private messages to anyone but the intended recipient.
    // To get chat messages for a user, you subscribe to the `message`
    // context explicitly.
    // autosubscribe: ['destroy', 'update'],

    attributes: {

        username: {
            type : 'string',
            unique : true
        },
        password: 'string',
        email: {type : 'string'},
        verified : {type : 'boolean', defaultsTo : false},
        employee : {model : 'employee'},
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.email;
            return obj;
        },
        validPassword : function(claimedPassword,callback){
            var user = this.toObject();

            bcrypt.compare(claimedPassword, user.password, callback);

        }



        //compare the asserted password to the hashed password.

    },

    beforeCreate: function(values, next) {

        if(!values.id){
            values.id = uuid.v4();
        }


        hashPassword(values, next);
    },

    beforeUpdate: function(values, next) {
        if (values.password) {
            hashPassword(values, next);
        }
        else {
            User.findOne(values.id).done(function(err, user) {
                if (err) {
                    next(err);
                }
                else {
                    values.password = user.password;
                    next();
                }
            });
        }
    }



    // Hook that gets called after the default publishUpdate is run.
    // We'll use this to tell all public chat rooms about the user update.
    //	afterPublishUpdate: function (id, changes, req, options) {

    // Get the full user model, including what rooms they're subscribed to
    // User.findOne(id).populate('rooms').exec(function(err, user) {
    // 	// Publish a message to each room they're in.  Any socket that is
    // 	// subscribed to the room will get the message. Saying it's "from" id:0
    // 	// will indicate to the front-end code that this is a systen message
    // 	// (as opposed to a message from a user)
    // 	sails.util.each(user.rooms, function(room) {
    // 		var previousName = options.previous.name == 'unknown' ? 'User #'+id : options.previous.name;
    // 		Room.message(room.id, {room:{id:room.id}, from: {id:0}, msg: previousName+" changed their name to "+changes.name}, req);
    // 	});

    // });

    //	}

}
