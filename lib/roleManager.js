roleManager = {
    getRole: function(role) {
        var roleObject;
        try {
            roleObject = require('role.' + role);
        }
        catch(e) {
            return null;
        }
        
        var proto = require('role.prototype');
        return this.extend(roleObject,proto);
            
    },
    
    getRoleBodyParts: function(role) {
        var role = this.getRole(role);
        
        if(role != null) {
            return role.parts;
        }
    },
    
    performRoles: function(creeps) {
        for (var name in creeps) {
            var creep = creeps[name];
            if(creep.spawning || creep.memory.role == undefined) {
                continue;
            }
            
            var role = creep.memory.role;
            
            role = this.getRole(role);
            
            if(role == null)
                continue;
            role.setCreep(creep);
            try{role.run();} catch(e){};
        }
    },
    
    extend: function(destination,source) {
        for (var k in source) {
            if(!destination.hasOwnProperty(k)) {
                destination[k] = source[k];
            }
        }
    }
}

module.exports = roleManager;
