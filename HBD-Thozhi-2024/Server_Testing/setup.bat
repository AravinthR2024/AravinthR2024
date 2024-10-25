@echo off
SETLOCAL

:: Check if Node.js is installed
where node >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
    echo Node.js is already installed.
) ELSE (
    echo Node.js is not installed. Installing now...
    call :install_node
)

:: Install Node.js (using Chocolatey or manual download)
:install_node
echo Installing Node.js...
:: Check if Chocolatey is installed
where choco >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Installing Chocolatey...
    :: Install Chocolatey (Windows package manager)
    @powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "Set-ExecutionPolicy Bypass -Scope Process; ^
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; ^
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
)

:: Install Node.js via Chocolatey
choco install -y nodejs-lts

:: Create server.js
echo Creating server.js...
(
echo const http = require('http');
echo const fs = require('fs');
echo const path = require('path');
echo.
echo // HTML content to serve
echo const htmlContent = `
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo ^    ^<title^>My Local Server^</title^>
echo ^</head^>
echo ^<body^>
echo ^    ^<h1^>Hello, World!^</h1^>
echo ^    ^<p^>This is served from a Node.js server.^</p^>
echo ^</body^>
echo ^</html^>
echo `;
echo.
echo // Write the HTML content to index.html
echo fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, (err) => {
echo     if (err) throw err;
echo     console.log('index.html has been created.');
echo });
echo.
echo // Create the server
echo const hostname = '127.0.0.1';
echo const port = 3000;
echo.
echo const server = http.createServer((req, res) => {
echo     if (req.url === '/') {
echo         fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
echo             if (err) throw err;
echo             res.writeHead(200, { 'Content-Type': 'text/html' });
echo             res.end(content);
echo         });
echo     } else {
echo         res.writeHead(404, { 'Content-Type': 'text/plain' });
echo         res.end('404 Not Found');
echo     }
echo });
echo.
echo // Start the server
echo server.listen(port, hostname, () => {
echo     console.log(`Server running at http://%hostname%:%port%/`);
echo });
) > server.js

:: Run the server
echo Starting the Node.js server...
node server.js

GOTO :EOF
