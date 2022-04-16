import {CliCommandInterface} from './cli-command.interface.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import {printError} from './cli-functions.js';

class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(fileName = '') {
    const fileReader = new TsvFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(printError(`Не удалось импортировать данные из файла по причине: ${err.message}`));
    }
  }
}

export default ImportCommand;
