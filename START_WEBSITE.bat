@echo off
setlocal
cd /d "%~dp0"
title Faelo AI Website

if not exist .env (
    echo Configuration is missing. Run SETUP_WINDOWS.bat first.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Node.js packages are missing. Run SETUP_WINDOWS.bat first.
    pause
    exit /b 1
)

echo Starting Faelo AI...
echo The website will be available at http://127.0.0.1:3000
echo Keep this window open while using the website.
echo.
call npm start
pause
