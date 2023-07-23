module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['e2e/features/**/*.ts'],
    publishQuiet: true,
  },
};
