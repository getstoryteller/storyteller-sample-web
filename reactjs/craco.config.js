module.exports = {
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: false,
        runtimeErrors: false,
      },
    },
  },
  webpack: {
    configure: (config) => {
      const result = {
        ...config,
        module: {
          ...config.module,
          rules: config.module.rules.map((rule) => {
            if (rule.oneOf instanceof Array) {
              // eslint-disable-next-line no-param-reassign
              rule.oneOf[rule.oneOf.length - 1].exclude = [
                /\.(js|mjs|jsx|cjs|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
              ];
            }
            return rule;
          }),
        },
      };
      return result;
    },
  },
};
