# OneTab

This is an extension for VS Code. It allows you to save the group file tab in a file.

Github link: https://github.com/iamkulele/OneTab.git

## Useage

Click any file in `OPEN EDITORS` in `EXPLORER` in VS Code, press `cmd+s` to save the file tab of active group in a file, or press `cmd+option+s` to save all group file tab.

## Extension setting

- `onetab.filePath` specify the file path where to save tabs. When user does not define the file, the extension will use:
    - `$HOME/todo.md` when no folder is opened
    - `FOLDER/todo.md` when a folder is opened
