import {CliCommandInterface} from './cli-command.interface.js';

class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.

      Пример:
          main.js --command [--arguments]

      Команды:
          --version:        # выводит номер версии приложения
          --help:           # помощь по работе с CLI приложения
          --import <path>:  # импортирует данные из файла в формате TSV
    `);
  }
}

export default HelpCommand;
