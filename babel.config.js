module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@/api': './src/api',
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/contexts': './src/contexts',
          '@/screens': './src/screens',
          '@/styles': './src/styles',
          '@/routes': './src/routes',
          '@/routers': './src/routers',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/models': './src/models',
          '@/navigation': './src/navigation',
          '@/navigators': './src/navigators',
          '@/store': './src/store'
        }
      }
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: true,
        verbose: false
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
