var guard = {
	parts: [
		[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
		[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
		[TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE],
		[TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE]],

	action: function()
	{
		var creep = this.creep;
		var targets = creep.room.find(FIND_HOSTILE_CREEPS);
		if (targets.length) {
			creep.moveTo(targets[0]);
			creep.attack(targets[0]);
		}
		else {
			this.rest();
		}
	}
};

module.exports = guard;
