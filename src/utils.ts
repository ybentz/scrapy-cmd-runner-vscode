import * as vscode from 'vscode'

function getSpiderName(document: vscode.TextDocument): string {
  const text = document.getText()
  const spiderNameMatch = text.match(
    /\n\s+name\s*=\s*["'](?<spiderName>[\w\-.]+)["']\s*\n/
  )
  if (spiderNameMatch === null) {
    vscode.window.showInformationMessage(
      'Spider name not found. Make sure the active file is a Scrapy spider.'
    )
  }
  return spiderNameMatch!.groups!['spiderName']
}

export { getSpiderName }
