var gpio = require("rpi-gpio");
const debounce = require("lodash/debounce");
const {
  startRecording,
  stopRecording,
  toggleRecording,
} = require("./recordAudio");

GPIO_PICKUP_PIN = 37;

gpio.setup(GPIO_PICKUP_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);

function onGpioPickupChange(channel, value) {
  if (channel != GPIO_PICKUP_PIN) return;
  const phoneIsPickedUp = value;
  console.log("Phone pickup state is now:", phoneIsPickedUp);
  if (phoneIsPickedUp) {
    startRecording();
  } else {
    stopRecording();
  }
}

const debouncedOnGpioPickupChange = debounce(onGpioPickupChange, 750);

gpio.on("change", function (channel, value) {
  console.log("Channel " + channel + " value is now " + value);
  debouncedOnGpioPickupChange(channel, value);
});
