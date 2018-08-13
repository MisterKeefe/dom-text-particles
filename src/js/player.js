import Bus from './bus';

// Big dumb player object
const Player = {
  name: "",
  health: 15,
  max_health: 15,
  mana: 15,
  max_mana: 15,
  exp: 0,
  next_level: 1000,
  
  changeResource: function(name, amount) {
    this[name] += amount;
    Bus.pub(`${name}-amount`, this[name]);
  }
};

export default Player;