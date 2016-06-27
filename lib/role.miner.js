/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

var roleMiner = {
    getOpenSource: function(creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: function(source) {
                    if(Memory.sources[source.id] == undefined || Memory.sources[source.id].miner == undefined || Memory.sources[source.id].miner == creep.id)
                      return true;
                    if(Game.getObjectById(Memory.sources[source.id].miner) == null)
                      return true;
                    return false;
                }
        });
        
        return source;
    },
    
    setSourceToMine: function(source,creep) {
        if (!source)
          return;
        
        if(Memory.sources[source.id] == undefined)
          Memory.sources[source.id] = {id:source.id};
        
        Memory.sources[source.id].miner = creep.id;
        creep.memory.source = source.id;
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        if (Game.getObjectById(creep.memory.source) == null) {
            var source = this.getOpenSource(creep);
            if(!source)
              return;
            
            this.setSourceToMine(source,creep);
            
        }
        
        var source = Game.getObjectById(creep.memory.source);
        
        if(creep.harvest(source) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(source);
        }
        
        if (creep.ticksToLive == 1) {
            Memory.sources[creep.memory.source] == null;
        }
    }
};

module.exports = roleMiner;

