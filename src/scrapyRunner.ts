import * as vscode from 'vscode'

import { getSpiderName, runTerminalCommand } from './utils'

function scrapyRun(command: string) {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }
  const { document } = editor
  const spiderName = getSpiderName(document)
  if (spiderName) {
    runTerminalCommand(command, spiderName)
  }
}

export { scrapyRun }
