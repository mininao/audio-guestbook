const r = require('array-gpio');

let sw = r.in(40);
let led = r.out(7);

// using pull up resistor
sw.setR('pu');

// Pressing the switch sw button, the led will turn on
// Releasing the switch sw button, the led will turn off
sw.watch((state) => {
  if(state){
    led.on();
  }
  else{
    led.off();
  }
});