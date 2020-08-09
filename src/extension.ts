import * as vscode from 'vscode'

import { getSpiderName, runSpider } from './utils'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'scrapy-command-runner.runSpider',
    () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        return
      }
      const { document } = editor
      const spiderName = getSpiderName(document)
      if (spiderName) {
        runSpider(spiderName)
      }
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
