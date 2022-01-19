const fs = require('fs');
const { decompileShader } = require('./spirv');

const readNullTerminatedString = (buffer, offset) => buffer.toString(
  'utf-8',
  offset,
  buffer.indexOf(0, offset),
);

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
  const variants = [];

  let currentOffset = 0x14;
  for (let i = 0; i < numberOfVariants; i += 1) {
    const variant = readNullTerminatedString(buffer, currentOffset);
    currentOffset += variant.length + 1;
    variants.push(variant);
  }

  let currentIndex = headerSize - 1;
  for (let i = 0; i < numberOfShaders; i += 1) {
    // Unused
    buffer.readUInt32LE(currentIndex);

    // https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glSampleMaski.xhtml
    const shaderMask = buffer.readUInt32LE(currentIndex + 4);
    const shaderMaskNumber = buffer.readUInt32LE(currentIndex + 8);

    const offset = buffer.readUInt32LE(currentIndex + 0xc);
    const length = buffer.readUInt32LE(currentIndex + 0x10);
    currentIndex += 20;

    const shader = buffer.subarray(offset, offset + length);
    fs.writeFileSync(`temp/${fileToUnpack}/${i}.spv`, shader);
    decompileShader(`${fileToUnpack}/${i}.spv`);
  }
};
module.exports = {
  unpack,
};
