var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var log = [];
module.exports.loop = function () {
    
    for (var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        log.push("Attempt to create harvester");
    }
    if(builders.length<2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined,{role: 'builder'});
        log.push("Attempt to create builder");
    }
    if(upgraders.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE],undefined,{role: 'upgrader'});
        console.log('Spawning new upgrader: ' +newName);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    if (Game.time%60 == 0)
    {
        writeLog();
    }
}

function writeLog() {
    for(i = 0; i<log.length;i++) {
        console.log(log[i]);
    }
}