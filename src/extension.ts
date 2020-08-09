import * as vscode from 'vscode'

import { scrapyRun } from './scrapyRunner'

export function activate(context: vscode.ExtensionContext) {
  const runSpiderCommand = vscode.commands.registerCommand(
    'scrapy-command-runner.runSpider',
    () => {
      scrapyRun('spider-run')
    }
  )
  const testSpiderCommand = vscode.commands.registerCommand(
    'scrapy-command-runner.testSpider',
    () => {
      scrapyRun('spider-test')
    }
  )

  context.subscriptions.push(runSpiderCommand, testSpiderCommand)
}

export function deactivate() {}
