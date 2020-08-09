import * as vscode from 'vscode'

function getSpiderName(document: vscode.TextDocument): string | null {
  const text = document.getText()
  const spiderNameMatch = text.match(
    /\n\s+name\s*=\s*["'](?<spiderName>[\w\-.]+)["']\s*\n/
  )
  if (spiderNameMatch === null) {
    vscode.window.showInformationMessage(
      'Error: spider name not found. Make sure the active file is a Scrapy spider.'
    )
    return null
  }
  return spiderNameMatch!.groups!['spiderName']
}

// Keep track of last active terminal id
let NEXT_TERM_ID = 1

async function runSpider(spiderName: string) {
  let terminal = await selectTerminal()
  // For now relying on existence of a `spider-run` script alias defined in user's shell
  // TODO - consider running full command inline. Requires clearing log file, output file and running spider
  terminal.sendText(`spider-run ${spiderName}`)
}

// Select from existing terminals or create a new one.
function selectTerminal(): Thenable<vscode.Terminal> {
  interface TerminalQuickPickItem extends vscode.QuickPickItem {
    terminal: vscode.Terminal
  }

  const terminals = vscode.window.terminals
  if (!terminals.length) {
    return Promise.resolve(createTerminal())
  }

  const items: TerminalQuickPickItem[] = terminals.map((t) => {
    return {
      label: `Name: ${t.name}`,
      terminal: t,
    }
  })
  return vscode.window.showQuickPick(items).then((item) => {
    return item ? item.terminal : createTerminal()
  })
}

function createTerminal(): vscode.Terminal {
  return vscode.window.createTerminal(`Scrapy runner #${NEXT_TERM_ID++}`)
}

export { getSpiderName, runSpider }
