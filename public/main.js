const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	});

	window.loadURL('http://localhost:3000');
};

app.on('browser-window-created', (_, window) => {
	require('@electron/remote/main').enable(window.webContents);
});

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
	app.quit();
});
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicity with Cmd+Q.
// app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// On OS X it is common to recreate a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('active', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
