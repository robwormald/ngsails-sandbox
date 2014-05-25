/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/connections
 */

var parseDbUrl = require("parse-database-url");

var database = parseDbUrl(process.env["DATABASE_URL"] || require('./local.js').database_url);

module.exports.connections = {


  datastore: {
    adapter: 'sails-postgresql',
    host: database.host,
    port: database.port,
    user: database.user,
    password: database.password,
      ssl: true,
    database: database.database,

  },


  // More adapters:
  // https://github.com/balderdashy/sails

};
