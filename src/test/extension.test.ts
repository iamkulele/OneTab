import * as assert from 'assert';
import * as fs from 'fs';
import { homedir } from 'os';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { syncWriteFile } from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const expected = "abc";
	test("syncWriteFile", () => {
		syncWriteFile("./todo.md", expected);
	});
	const data = fs.readFileSync("./todo.md", { encoding: 'utf8', flag: 'r' });
	console.log(data);
	assert.strictEqual(expected, data);

});
