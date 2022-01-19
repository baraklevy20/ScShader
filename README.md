# SC Shader Unpacker

An unpacker for Supercell's shader files.

## Installation

- Install NPM - https://www.npmjs.com/get-npm
- Install Node - https://nodejs.org/en/download/
- Clone the project - `git clone https://github.com/baraklevy20/ScShader.git`
- Run `cd SCShader`
- Run `npm i`
- Download SPIRV-Cross from here: https://github.com/KhronosGroup/SPIRV-Cross/releases and extract the bin folder and place it in the ScShader directory (`ScShader/bin/spirv-cross.exe`).
- Done, now you can use the unpacker.

## Usage

Extract a list of files - `node index.js --file assets/shader1.shader --file assets/shader2.shader`

Extract a directory - `node index.js --folder assets/shaders`

You can also combine them - `node index.js --folder assets/shaders --file assets2/shader.shader`
