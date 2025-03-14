// @ts-check
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * @type {import("metro-config").MetroConfig}
 */
const config = {
  server: {
    port: 8080, // Set Metro to use port 8080
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
