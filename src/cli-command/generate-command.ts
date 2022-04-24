import {appendFile} from 'fs/promises';
import got from 'got';

import {CliCommandInterface} from './cli-command.interface.js';
import MockData from '../types/mock-data.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import {printError, printSuccess} from './cli-functions.js';

class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(printError(`Can't fetch data from ${url}.`));
    }

    const offerGenerator = new OfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${offerGenerator.generate()}\n`, 'utf-8');
    }

    console.log(printSuccess(`File ${filepath} was created`));
  }
}

export default GenerateCommand;
