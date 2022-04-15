#!/usr/bin/env node

import CliApplication from './app/cli-application.js';
import ImportCommand from './cli-command/import-command.js';
import HelpCommand from './cli-command/help-command.js';
import VersionCommand from './cli-command/version-command.js';

const manager = new CliApplication();

manager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new ImportCommand,
]);

manager.processCommand(process.argv);
