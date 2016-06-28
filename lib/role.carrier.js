/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier');
 * mod.thing == 'a thing'; // true
 */
var roleCarrier = {
    parts: [[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            [CARRY,MOVE,MOVE]],
    getOpenSource: function(creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: function(source) {
                    if(Memory.sources[source.id] == undefined || Memory.sources[source.id].miner == undefined || Memory.sources[source.id].carrier == creep.id)
                      return true;
                    if(Game.getObjectById(Memory.sources[source.id].carrier) == null)
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
        
        Memory.sources[source.id].carrier = creep.id;
        creep.memory.source = source.id;
    },
    onDeath: function() {
        Memory.sources[this.creep.memory.source].carrier = null;
    },
    action: function() {
        var creep = this.creep
        if (Game.getObjectById(creep.memory.source) == null) {
            var source = this.getOpenSource(creep);
            if(!source)
                return;
                
            this.setSourceToMine(source,creep);
        }
        
        var source = Game.getObjectById(creep.memory.source);
        
        function spawnFilter(structure) {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            
        }
        
        function storageFilter(structure) {
            return Memory.storage[structure.id] != undefined && Memory.storage[structure.id].resourceType == 'energy' && _.sum(structure.store) <structure.storeCapacity;
        }
        
        function towerFilter(structure) {
            return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
        }
        
        
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        
        if (creep.memory.harvesting) {
            var dropedResource = source.pos.findClosestByRange(FIND_DROPPED_ENERGY,3);
            if (dropedResource) {
                if (creep.pickup(dropedResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropedResource);
                }
            }
        } else {
            var target = null;
                if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:spawnFilter})) != null) {
                    if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: storageFilter})) != null) {
                    if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: towerFilter})) != null); {
                    if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }

        }

    }
}
module.exports = roleCarrier
