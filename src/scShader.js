const fs = require('fs');
const { decompileShader } = require('./spirv');

const unpack = async (fileToUnpack) => {
  const buffer = fs.readFileSync(fileToUnpack);
  const version = buffer.readUInt16LE(0);

  if (version !== 4) {
    throw Error('Unsupported shader file format. Expected version 4.');
  }

  const headerSize = buffer.readUInt32LE(4);
  const numberOfVariants = buffer.readUInt16LE(8);
  const numberOfShaders = buffer.readUInt32LE(0xa);
  const variantsListSize = buffer.readUInt32LE(0xe);

  // for (let i = 0; i < numberOfVariants; i += 1) {

  // }

  let currentIndex = headerSize - 1;
  for (let i = 0; i < numberOfShaders; i += 1) {
    const u1 = buffer.readUInt32LE(currentIndex);
    const shaderOffset = buffer.readUInt32LE(currentIndex + 4);
    const u3 = buffer.readUInt32LE(currentIndex + 8);
    const offset = buffer.readUInt32LE(currentIndex + 0xc);
    const length = buffer.readUInt32LE(currentIndex + 0x10);
    currentIndex += 20;

    const shader = buffer.subarray(offset, offset + length);
    fs.writeFileSync(`temp/${fileToUnpack}/${shaderOffset}.spv`, shader);
    decompileShader(`${fileToUnpack}/${shaderOffset}.spv`);
  }
};
module.exports = {
  unpack,
};
