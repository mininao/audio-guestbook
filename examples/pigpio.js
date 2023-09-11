const Gpio = require("pigpio").Gpio;

const led = new Gpio(7, { mode: Gpio.OUTPUT });
const button = new Gpio(25, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  edge: Gpio.EITHER_EDGE,
});

button.on("interrupt", (level) => {
  led.digitalWrite(level);
});
