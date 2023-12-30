import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const version = packageJson.version;

// Assuming your `src` directory is at the same level as the `build-widgets.js` script
const srcDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../src');
const buildDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../build');

const widgets = [
  'accesscharts',//this config will delete all files in the build folder
  'ide',
  // Add other widget names here
];

function buildWidget(widgetName) {
  console.log(`Building PROD ${widgetName}...`);

  // Set environment variables for the current widget build
  process.env.VITE_APP_VERSION = version;
  process.env.VITE_SRC_DIR = srcDir;
  process.env.VITE_OUT_DIR = path.join(buildDir);
  process.env.VITE_URL = "https://quorumlanguage.com";


  // Assuming your config files are in a directory named 'config' at the same level as the `build-widgets.js` script
  const configFile = path.resolve(path.dirname(new URL(import.meta.url).pathname), `./widgetconfigs/vite.config.${widgetName}.js`);

  execSync(`vite build --config ${configFile}`, { stdio: 'inherit' });
}

widgets.forEach(buildWidget);

