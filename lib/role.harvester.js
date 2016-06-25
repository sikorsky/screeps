/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        var sources = creep.room.find(FIND_SOURCES);
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
        //    var dest = creep.pos.find
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            
            if (targets.length > 0) {
                if(creep.transfer(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        
        /*if(creep.ticksToLive == 1) {
            if (creep.memory.home != undefined)
              creep.memory.home.createCreep([MOVE,CARRY,WORK],undefined,{role: 'harvester', home: creep.memory.home})
        }*/
	}
};

module.exports = roleHarvester;