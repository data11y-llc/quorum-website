// vite.dev.js
import configs from './config/generateConfigs.js';

// Pick one of the configs based on an environment variable or some other condition
const selectedConfigIndex = process.env.VITE_WIDGET_INDEX || 0;
const selectedConfig = configs[selectedConfigIndex];

export default selectedConfig;

