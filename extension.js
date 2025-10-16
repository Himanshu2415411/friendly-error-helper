const vscode = require('vscode');
const { marked } = require('marked');

// This is our offline error database. No changes needed here.
const errorDatabase = {
    "Assignment to constant variable": `
### 🧐 What This Error Means
*(Offline Analysis)*
This is a **TypeError**. It occurs when you try to change the value of a variable that was declared using \`const\`. To fix this, use \`let\` if the variable needs to be reassigned.
`,
    "is not defined": `
### 🧐 What This Error Means
*(Offline Analysis)*
This is a **ReferenceError**. It means you are trying to use a variable that hasn't been declared yet. Declare it with \`let\` or \`const\` before use.
`,
    // ... other errors from the previous version ...
    "default": `
### 🧐 What This Error Means
*(Offline Analysis)*
I don't have a specific match for this error in my offline database. Please check online resources like Stack Overflow or MDN.
    `
};

async function getOfflineAnalysis(errorMessage) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lowerCaseError = errorMessage.toLowerCase();
    for (const key in errorDatabase) {
        if (lowerCaseError.includes(key.toLowerCase())) {
            return errorDatabase[key];
        }
    }
    return errorDatabase["default"];
}

// =======================================================================
// Main Extension Logic - This is the updated part
// =======================================================================

function activate(context) {
    console.log('Friendly Error Helper is now active!');

    let disposable = vscode.commands.registerCommand('friendly-error-helper.analyzeError', async function () {
        
        let errorText = "";
        const editor = vscode.window.activeTextEditor;

        // First, try to get text from the active editor's selection
        if (editor && !editor.selection.isEmpty) {
            errorText = editor.document.getText(editor.selection);
        } else {
            // If there's no selection, try to get text from the clipboard
            // This is our new logic for the terminal workflow!
            errorText = await vscode.env.clipboard.readText();
        }

        errorText = errorText.trim();

        if (!errorText) {
            vscode.window.showInformationMessage('No error selected, and clipboard is empty. Please select an error or copy one to your clipboard.');
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'errorAnalysis',
            'Friendly Helper Analysis',
            vscode.ViewColumn.Beside,
            { enableScripts: true }
        );

        panel.webview.html = getWebviewContent('loading');

        try {
            const analysis = await getOfflineAnalysis(errorText); 
            panel.webview.html = getWebviewContent('success', analysis);
        } catch (error) {
            console.error("Friendly Error Helper Error:", error);
            vscode.window.showErrorMessage(`Error analyzing text: ${error.message}`);
            panel.webview.html = getWebviewContent('error', error.message);
        }
    });

    context.subscriptions.push(disposable);
}

// =======================================================================
// No changes needed below this line.
// =======================================================================

function getWebviewContent(state, data = '') {
    const nonce = new Date().getTime() + '' + new Date().getMilliseconds();
    let body = '';
    switch (state) {
        case 'loading': body = `<div class="container"><div class="loader"></div><h2>Your friendly helper is analyzing the error...</h2></div>`; break;
        case 'error': body = `<div class="container"><h1>Oops! Something Went Wrong.</h1><div class="error-box">${data}</div></div>`; break;
        case 'success': body = marked(data); break;
    }
    return `
        <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; img-src https: data:; script-src 'none';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Friendly Helper Analysis</title>
            <style nonce="${nonce}">
                body { font-family: var(--vscode-font-family, sans-serif); color: var(--vscode-editor-foreground); background-color: var(--vscode-editor-background); padding: 20px; line-height: 1.6; }
                .container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh; text-align: center; }
                .loader { border: 5px solid var(--vscode-editor-foreground, #f3f3f3); border-top: 5px solid var(--vscode-button-background, #3498db); border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                h1, h2, h3 { border-bottom: 1px solid var(--vscode-editor-foreground); padding-bottom: 8px; }
                code { background-color: var(--vscode-textBlockQuote-background, #f0f0f0); padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 6px; }
                pre { background-color: var(--vscode-textBlockQuote-background, #f0f0f0); padding: 16px; border-radius: 8px; overflow-x: auto; }
                pre code { padding: 0; background: none; }
                a { color: var(--vscode-textLink-foreground); text-decoration: none; }
                a:hover { text-decoration: underline; }
                .error-box { background-color: rgba(255, 0, 0, 0.1); border: 1px solid var(--vscode-errorForeground); padding: 15px; border-radius: 8px; }
            </style>
        </head><body>${body}</body></html>`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};