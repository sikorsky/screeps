/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.prototype');
 * mod.thing == 'a thing'; // true
 */
var proto = {
    parts: [[WORK,CARRY,MOVE,MOVE]],
    /**
     * The creep for this role
     *
     * @type creep
     */
    creep: null,
    
    setCreep: function(creep) {
      this.creep = creep;
      return this;
    },
    
    run: function() {
        this.action();
        
        if(this.creep.ticksToLive == 1)
            this.onDeath();
    },
    
    action: function() {},
    onDeath: function() {},
    
    rest: function() {},
}
module.exports = {

};
