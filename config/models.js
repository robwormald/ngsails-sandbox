/**
 * Models
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

var uuid = require('node-uuid');

module.exports.models = {

    connection: 'datastore',

    autoPk : false,

    attributes : {

        id : {
            type : 'string',
            primaryKey : true,
            unique: true,
            defaultsTo: function(){
                return uuid.v4()
            }

        }
    },

    beforeCreate : function(values,cb){

        if(!values.id){
            values.id = uuid.v4();
            cb()
        }
        else{
            cb()
        }


    }
}

