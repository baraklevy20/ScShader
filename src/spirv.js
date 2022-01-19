const { spawn } = require('child_process');

const decompileShader = (fileName) => {
  spawn('bin/spirv-cross.exe', [
    `temp/${fileName}`,
    '--output',
    `out/${fileName}.txt`]);
};

module.exports = {
  decompileShader,
};
