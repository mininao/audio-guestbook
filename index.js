const r = require('array-gpio');
const debounce = require("lodash/debounce");
const httpServer = require("http-server")
var ON_DEATH = require('death');
const {
  startRecording,
  stopRecording,
} = require("./recordAudio");

const GPIO_PICKUP_PIN = 40;
const GPIO_LED_PIN = 7;


let gpioPickup = r.in(GPIO_PICKUP_PIN);
gpioPickup.setR('pu');
let gpioLed = r.out(GPIO_LED_PIN);

let recordingStartedAt = undefined;
const MAXIMUM_RECORDING_DURATION_MS = 1000 * 5

setInterval(()=>{
  if(!recordingStartedAt) return;
  const recordingDuration = Date.now() - recordingStartedAt;
  if(recordingDuration > MAXIMUM_RECORDING_DURATION_MS) {
    console.log("Maximum duraction exceeded, stopping recording")
    stopRecording();
    gpioLed.off();
    recordingStartedAt = undefined
  }
},1000)

function onGpioPickupChange(value) {
  const phoneIsPickedUp = value;
  console.log("Phone pickup state is now:", phoneIsPickedUp);
  if (phoneIsPickedUp) {
    startRecording();
    gpioLed.on();
    recordingStartedAt = Date.now()
  } else {
    stopRecording();
    gpioLed.off();
    recordingStartedAt = undefined
  }
}

const debouncedOnGpioPickupChange = debounce(onGpioPickupChange, 500);

gpioPickup.watch((state) => {
  debouncedOnGpioPickupChange(state)
});


ON_DEATH(function(signal, err) {
  stopRecording();
  gpioLed.off();
  process.exit()
})

