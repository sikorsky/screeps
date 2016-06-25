var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*if(creep.memory.upgrading == true) {
            if(creep.carry.energy == 0) {
                creep.memory.upgradging = false;
            }
            else {
                
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgradging = true
            }
            else {
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            
        }*/
	    if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;