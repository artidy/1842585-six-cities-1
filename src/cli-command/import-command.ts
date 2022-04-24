import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage, printError, printSuccess} from './cli-functions.js';

class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(printSuccess(`Импортировано предложений: ${count}.`));
  }

  public async execute(fileName = '') {
    const fileReader = new TSVFileReader(fileName.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.log(printError(`Не удалось импортировать данные из файла по причине: ${getErrorMessage(err)}`));
    }
  }
}

export default ImportCommand;
