module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@swc/babel-preset-javascript',
    
  ],
  "plugins": ["@babel/plugin-transform-typescript"]
};