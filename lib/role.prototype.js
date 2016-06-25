/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.prototype');
 * mod.thing == 'a thing'; // true
 */
var proto = {
    /** The creep for this role
     * 
     * @type creep
     */
     creep: null,
     
     /**
      * Set the creep for this role
      * @parap {Creep} creep
      */
      setCreep: function(creep)
      {
          this.creep = creep;
          return this;
      }
}
module.exports = {

};