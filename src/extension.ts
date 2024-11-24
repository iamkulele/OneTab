import { workspace, ExtensionContext, commands, window, TabInputText } from 'vscode';
import { existsSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import path = require('path');

export const Configurations = {
    filePath: 'onetab.filePath'
};

export function syncWriteFile(filepath: string, data: any) {
	writeFileSync(filepath, data, { flag: 'a+' });
}

function setOneTabFilePath() {
	let oneTabFilePath = workspace.getConfiguration().get(Configurations.filePath, "");
	if (! existsSync(oneTabFilePath)) {
		if (workspace.workspaceFolders) {
			const workspacePath = workspace.workspaceFolders[0].uri.fsPath;
			oneTabFilePath = path.join(workspacePath, "todo.md");
		} else {
			oneTabFilePath = path.join(homedir(), "todo.md");
		}
	}
	return oneTabFilePath;
}

export function activate(context: ExtensionContext) {
	let oneTabFilePath = setOneTabFilePath();

	workspace.onDidChangeConfiguration(change => {
		if (change.affectsConfiguration(Configurations.filePath)) {
			oneTabFilePath = setOneTabFilePath();
		}
	});

    const disposable = commands.registerCommand('onetab.saveActiveGroupFiles', async () => {
        const active_group_files: string[] = [];
		active_group_files.push("\n### Active Group:");
		window.tabGroups.activeTabGroup.tabs.forEach((tab) => {
			if (tab.input instanceof TabInputText) {
				const filePath = tab.input.uri.fsPath;
				active_group_files.push("file://" + `${filePath}`);
			}
		});
		active_group_files.push("");
		syncWriteFile(oneTabFilePath, active_group_files.join("\n"));
    });

	const disposable_1 = commands.registerCommand('onetab.saveAllGroupsFiles', async () => {
		const all_groups_files: string[] = [];
		all_groups_files.push("");
		window.tabGroups.all.forEach((group, index) => {
			all_groups_files.push(`### Group ${index + 1}:`);
            group.tabs.forEach((tab) => {
                if (tab.input instanceof TabInputText) {
                    const filePath = tab.input.uri.fsPath;
					all_groups_files.push("file://" + `${filePath}`);
                }
            });
        });
		all_groups_files.push("");
		syncWriteFile(oneTabFilePath, all_groups_files.join("\n"));
	});

	context.subscriptions.push(disposable, disposable_1);
}
