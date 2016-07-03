var roleUpgrader = {
    parts: [[WORK, WORK, WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE, MOVE, MOVE,MOVE],
            [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]],
            
    /** @param {Creep} creep **/
    action: function() {
        var creep = this.creep;
    
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false
        }
        
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true
        }
        
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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

module.exports = roleUpgrader;

