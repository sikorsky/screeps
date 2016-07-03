/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
var roleBuilder = {
    parts: [[WORK, WORK, WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE, MOVE, MOVE,MOVE],
            [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]],
            
    action: function() {
        var creep = this.creep;
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        
        function repairFilter(structure) {
            return structure.hits < structure.hitsMax;
        }
        
        function rampartFilter(structure) {
            return (structure.structureType == STRUCTURE_RAMPART) &&  structure.hits < 10000;
        }
        function wallFilter(structure) {
            return (structure.structureType == STRUCTURE_WALL) && structure.hits < 100000;
        }
        function towerFilter(structure) {
            return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
        }
        

        if (creep.memory.building) {
            var target = null;
            
            if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:rampartFilter})) != null) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if ((target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)) != null) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if ((target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter:towerFilter})) != null) {
                if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter:wallFilter})) != null) {
                if(creep.repair(target)== ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else if ((target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:repairFilter})) != null) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                this.rest('civ');
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                   filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
            });
            
            if(target) {
                if(target.transfer(creep,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                this.rest('civ');
            }
        }
    }
};

module.exports = roleBuilder;

