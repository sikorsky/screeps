/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnHepler');
 * mod.thing == 'a thing'; // true
 * 
 *
 * using single room logic for now, hard coding Spawn1 into everythig
 */
 module.exports = {
    spawn: function(role) {
        //console.log('attempting to spawn '+role);
        var rolePartLists = null;
        try {
            roleObj = require('role.'+role);
            if(roleObj) {
                rolePartLists = roleObj.parts;
            }
        } catch(e) {
            //console.log(e);
            rolePartLists= [[WORK,CARRY,MOVE]];
        }
        //console.log(rolePartLists);
        for (var i in rolePartLists) {
            var newName = Game.spawns.Spawn1.createCreep(rolePartLists[i],role+Game.time,{role:role});
            if (newName = ERR_NOT_ENOUGH_ENERGY) {
                continue;
            } else {
                console.log('spawning new '+role+' named '+newName);
                break;
            }
        }
    },
    
    test: function() {
     Notify("Test");   
    },
    
    checkCreeps: function() {
        var popCaps = Memory.popCap;
        if (popCaps == (undefined || null)) {
            console.log('no pop caps');
            return; // no caps set
        }
    
        var miners    = _.filter(Game.creeps,(creep) => creep.memory.role == 'miner');
        var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
        var builders  = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
        var carriers  = _.filter(Game.creeps,(creep) => creep.memory.role == 'carrier');
        var guards    = _.filter(Game.creeps,(creep) => creep.memory.role == 'guard');
        if(miners[0] != undefined && carriers[0] != undefined) {
            if(miners[0].ticksToLive < 240 || carriers[0].ticksToLive < 240) {
                return;
            }
        }
        console.log('miners: '+miners.length+'/'+popCaps.miners);
        console.log('carriers: '+carriers.length+'/'+popCaps.carriers);
        console.log('upgraders: '+upgraders.length+'/'+popCaps.upgraders);
        console.log('builders: '+builders.length+'/'+popCaps.builders);
        console.log('guards:'+guards.length+'/'+popCaps.guards);
        if (miners.length < popCaps.miners) {
            this.spawn('miner');
        }
        else if (carriers.length < popCaps.carriers) {
            this.spawn('carrier');
        }
        else if (builders.length < popCaps.builders) {
            this.spawn('builder');
        }
        else if (upgraders.length < popCaps.upgraders) {
            this.spawn('upgrader');
        }
        else if (guards.length < popCaps.guards) {
            this.spawn('guard');
        }
    },
    listCreeps: function() {
        var popCaps = Memory.popCap;
        if (popCaps == (undefined || null)) {
            console.log('no pop caps');
            return; // no caps set
        }
        var miners    = _.filter(Game.creeps,(creep) => creep.memory.role == 'miner');
        var upgraders = _.filter(Game.creeps,(creep) => creep.memory.role == 'upgrader');
        var builders  = _.filter(Game.creeps,(creep) => creep.memory.role == 'builder');
        var carriers  = _.filter(Game.creeps,(creep) => creep.memory.role == 'carrier');
        var guards    = _.filter(Game.creeps,(creep) => creep.memory.role == 'guard');
        console.log('miners: '+miners.length+'/'+popCaps.miners);
        console.log('carriers: '+carriers.length+'/'+popCaps.carriers);
        console.log('upgraders: '+upgraders.length+'/'+popCaps.upgraders);
        console.log('builders: '+builders.length+'/'+popCaps.builders);
        console.log('guards:'+guards.length+'/'+popCaps.guards);
    }
 }
