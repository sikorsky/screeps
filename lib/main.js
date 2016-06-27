require('screeps-perf')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleCarrier = require('role.carrier');
module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
    var carriers = _.filter(Game.creeps,(creep) => creep.memory.role == 'carrier');
    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    //var towers = _.filter(Game.structures,(structure) => structure.structureType = STRUCTURE_TOWER);
    
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,WORK,WORK,WORK,WORK, MOVE], 'miner'+Game.time, {role: 'miner'});
        if (isNaN(newName)){
            //Game.notify('Spawning new Harvester: '+newName,180);
        }
    }
    else if(carriers.length<2) {
        var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'carrier'+Game.time,{role:'carrier'});
    }
    else if(builders.length<3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE, MOVE, MOVE],'builder'+Game.time,{role: 'builder'});
        if (isNaN(newName)){
            //Game.notify('Spawning new builder: ' +newName,180);
        }
    }
    else if(upgraders.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE, MOVE, MOVE],'upgrader'+Game.time,{role: 'upgrader'});
        if (isNaN(newName)){
            //Game.notify('Spawning new Upgrader: '+newName,180);
        }
    }
    
    
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == ('harvester' || 'CreepMiner')) {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
    
    /*if (Game.time%60 == 0)
    {
        var creepSet = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log("Your harvesters are:");
        for (var i in creepSet) {
            console.log('  '+creepSet[i].name);
        }
        
        creepSet = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Your upgraders are:');
        for (var i in creepSet) {
            console.log('  '+creepSet[i].name);
        }
        
        creepSet = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
        console.log('Your builders are:');
        for (var i in creepSet) {
            console.log('  '+creepSet[i].name);
        }
    }*/
    
    for (i in Game.spawns) {
        defendRoom(Game.spawns[i].room.name);
    }
    for (var i in towers) {
        var tower = towers[i];
        //console.log(tower);
        var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
                });
        if (tower.pos.inRangeTo(target,5)) {
            tower.repair(target);
        }
        
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

