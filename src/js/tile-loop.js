import { Hookable } from './helpers';
import Card from './cards/';
import CreatureCard from './cards/creature';
import { getCreature } from './creature';

// Better to call it a tile "loop", with a movable pointer to the current card.
// This changes what operations we need to support.

export class TileLoop extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'></ul>`
    });
    
    this._tiles = [];
    
    this.pointer = 0; // current position in the stack
    this.direction = 1; // which way we're moving
    this.stride = 1; // how many steps we take per move
  }
  
  next () {
    this.pointer += (this.direction * this.stride);  
    this.pointer = this.pointer % this._tiles.length;
    this.reposition();
  }
  
  reverse () {
    this.direction = -this.direction;  
  }
  
  push (c) {
    this._tiles.unshift(c.buildTile()); 
    this.reposition();
  }
  
  peek (idx) {
    // Gets tile at index (relative to the current pointer)
    idx = idx || 0; 
    return this._tiles[this.pointer + idx]; 
  }
  
  pop (idx) {
    // Removes tile at index (relative to current pointer)
    idx = idx || 0;
    let m =  this._tiles.splice(this.pointer + idx, 1)[0];
    this.reposition();
    m.destroy();
    return m;
  }
  
  unshift (c) {
    // Places a new tile under current pointer
    let e = new Tile({ parent: this.container, position: this.pointer, card: c });
    e.inner.classList.add('spin1');
    this._tiles.splice(this.pointer, 0, e);
    this.reposition();
  }
  
  reposition () {
    // call this to resync 
    this._tiles.map((e, idx) => e.reposition(idx, this.pointer, this._tiles.length));
  }
}
