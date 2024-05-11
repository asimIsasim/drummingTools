const fs = require("fs");
const meyda = require("meyda"); // Import the Meyda library

const extractBPM = (req, res, next) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  fs.readFile(filePath, async (err, audioBuffer) => {
    if (err) {
      return next(err);
    }

    try {
      const bufferSize = 512;
      // Adjust the length of audioBuffer to be a power of 2
      const adjustedAudioBuffer = audioBuffer.slice(
        0,
        Math.pow(2, Math.floor(Math.log2(audioBuffer.length)))
      );
      const audioData = meyda.extract(
        ["tempo"],
        adjustedAudioBuffer,
        bufferSize
      );
      const bpm = audioData.tempo;

      console.log(bpm);
      req.bpm = { fileName, bpm };

      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { extractBPM };
