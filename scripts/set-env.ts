let writeFile = require('fs').writeFile;

let dotenv = require('dotenv').config();
let argv = require('yargs').argv;

const environment = argv.environment;
const isProd = environment === 'prod';

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  firebase: {
    apiKey: "${process.env.FIREBASE_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}"
  },
  mapbox: {
    accessToken: "${process.env.MAPBOX_ACCESS_TOKEN}"
  }
};
`;

writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
