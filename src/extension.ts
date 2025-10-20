import * as vscode from 'vscode';
import * as os from 'os';

let keybindingsRegExp: RegExp;
let title: string;

export function activate(context: vscode.ExtensionContext) {
	if (os.platform() === 'darwin') {
		title = 'Use ctrl+ shift+ alt+ cmd+ modifiers (in that order) followed by the key';
		keybindingsRegExp = /^((ctrl\+)?(shift\+)?(alt\+)?(cmd\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide))( ((ctrl\+)?(shift\+)?(alt\+)?(cmd\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide)))?$/i;
	} else if (os.platform() === 'win32') {
		title = 'Use ctrl+ shift+ alt+ win+ modifiers (in that order) followed by the key';
		keybindingsRegExp = /^((ctrl\+)?(shift\+)?(alt\+)?(win\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide))( ((ctrl\+)?(shift\+)?(alt\+)?(win\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide)))?$/i;
	} else if (os.platform() === 'linux') {
		title = 'Use ctrl+ shift+ alt+ super+ modifiers (in that order) followed by the key';
		keybindingsRegExp = /^((ctrl\+)?(shift\+)?(alt\+)?(super\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide))( ((ctrl\+)?(shift\+)?(alt\+)?(super\+)?(a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|`|-|=|\[|\]|\\|;|\'|,|\.|\/|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|left|up|right|down|pageup|pagedown|end|home|tab|enter|escape|space|backspace|delete|insert|pausebreak|capslock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpad_multiply|numpad_add|numpad_separator|numpad_subtract|numpad_decimal|numpad_divide)))?$/i;
	};
	context.subscriptions.push(vscode.commands.registerCommand('vscode-describe-key.describe-key', async () => {
		await openKeybindingsInRecordingMode();
	}));
}

export function deactivate() {}

async function openKeybindingsInRecordingMode() {
	const keys = await vscode.window.showInputBox({
		title: title,
        prompt: 'Enter keyboard shortcuts(s). For multiple shortcuts separate them by space. Enter empty to open keybindings editor, then use alt+k.',
		validateInput: (keybindings) => {
			// Allow empty input to open keybindings editor
			if (keybindings === '') {
				return undefined;
			}
			// Validate against the regular expression
			if (keybindingsRegExp.test(keybindings)) {
				return undefined;
			}
			return 'Not a valid keyboard shortcut sequence';
		}
    });
	
	if (keys === '' || keys) {
		if (keys === '') {
			vscode.window.showInformationMessage('Use Alt+K to search by keyboard shortcuts.');
		}
		await vscode.commands.executeCommand('workbench.action.openGlobalKeybindings',
			 keys === '' ? undefined : `"${keys}"`);
	}
}