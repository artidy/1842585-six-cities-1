import {readFileSync} from 'fs';

import {CliCommandInterface} from './cli-command.interface.js';

class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private getVersion(): string {
    const packageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(packageJSON);

    return content.version;
  }

  public async execute() {
    const version = this.getVersion();

    console.log(version);
  }
}

export default VersionCommand;
