require('screeps-perf')();
var roleManager = require('roleManager');
var spawnHelper = require('spawnHelper');
module.exports.loop = function () {
    
    if(Memory.lastSpawn <= 0) {
        Memory.lastSpawn = 60;
        spawnHelper.checkCreeps();
    } else {
        Memory.lastSpawn--;
    }
    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    
    roleManager.performRoles(Game.creeps);

    
    for (i in Game.spawns) {
        defendRoom(Game.spawns[i].room.name);
    }
    for (var i in towers) {
        var tower = towers[i];
        var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
                });        
    }
}

function defendRoom(roomName) {
    
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    } else {
        
    }
}

