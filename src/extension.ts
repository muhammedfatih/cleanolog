// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cleanolog" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('cleanolog.run', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from cleanolog!');
	// });

	let disposable = vscode.commands.registerCommand('cleanolog.run', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
			editor.edit(editBuilder => {
				editor.document.getText().split('\n').forEach((line, index) => {
					const regex = /.*?[ |m]/gi;
					const newline = line.replace(regex, '');
					editBuilder.delete(new vscode.Range(index,0,index, line.length+1));
					editBuilder.insert(new vscode.Position(index, 0), newline);
				})
			})
        }
    });

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
