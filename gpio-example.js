var gpiop = require("rpi-gpio");

gpio.setup(37, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.on("change", function (channel, value) {
  console.log("Channel " + channel + " value is now " + value);
});
