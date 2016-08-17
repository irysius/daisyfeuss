// ---------------------------------
// :: Environment Variables
// ---------------------------------

import { argv } from 'yargs';

export default {
  environment: argv.env || 'development',
  getConfigKeys () {
    let keys;
    try {
      keys = require(`./config/${this.environment}`);
    } catch (e) {
      throw new Error(`No config file found for environment ${this.environment}`);
    }
    keys.environment = this.environment;
    return keys;
  }
}
