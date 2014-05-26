/**
 * TimeLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

        employee : {
            model : 'employee'
        },
        job : {
            model : 'job'
        },
        startTime : {
            type : 'datetime'
        },
        stopTime : {
            type : 'datetime'
        },
        payrollItem : {
            model : 'payrollitem'
        },

        serviceItem : {
            model: 'serviceItem'
        }

	}

};
