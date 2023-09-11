var keypress = require("keypress");
const {
  startRecording,
  stopRecording,
  toggleRecording,
} = require("./recordAudio");

keypress(process.stdin);

process.stdin.on("keypress", function (ch, key) {
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  } else if (key && key.name == "r") {
    toggleRecording();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
