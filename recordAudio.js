// Imports modules.
const fs = require("fs"),
  path = require("path");
const AudioRecorder = require("node-audiorecorder");

// Folder with current date and time appended
const DIRECTORY = "recs-" + new Date().toISOString().replace(/:/g, "-");

// Create path to write recordings to.
if (!fs.existsSync(DIRECTORY)) {
  fs.mkdirSync(DIRECTORY);
}

const audioRecorder = new AudioRecorder(
  {
    program: "sox",
    silence: 0,
    type: "mp3",
  },
  console,
);
// Log information on the following events.
audioRecorder.on("error", function () {
  console.warn("Recording error.");
});
audioRecorder.on("end", function () {
  console.warn("Recording ended.");
});

let isRecording = false;

function startRecording() {
  if (isRecording) {
    console.log("Already recording.");
    return;
  }
  const fileName = path.join(
    DIRECTORY,
    Math.random()
      .toString(36)
      .replace(/[^0-9a-zA-Z]+/g, "")
      .concat(".mp3"),
  );
  console.log("Starting recording at:", fileName);

  const fileStream = fs.createWriteStream(fileName, { encoding: "binary" });
  audioRecorder.start().stream().pipe(fileStream);
  isRecording = true;
}

function stopRecording() {
  if (!isRecording) {
    console.log("Already stopped recording.");
    return;
  }
  audioRecorder.stop();
  isRecording = false;
  console.log("Stopped recording.");
}

function toggleRecording() {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
}

module.exports = {
  startRecording,
  stopRecording,
  isRecording,
  toggleRecording,
};
