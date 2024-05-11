// const meyda = require("meyda");
// const fs = require("fs");

// async function extractBPM(fileName, filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, async (err, audioBuffer) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       try {
//         const bufferSize = 512;
//         const audioData = meyda.extract(["tempo"], audioBuffer, bufferSize);
//         const bpm = audioData.tempo;
//         resolve({ fileName, bpm });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// }

// module.exports = {
//   extractBPM,
// };
