module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: ["nativewind/babel", require.resolve("expo-router/babel")],
  };
};
