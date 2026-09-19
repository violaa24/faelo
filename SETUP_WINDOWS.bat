@echo off
setlocal
cd /d "%~dp0"
title Faelo AI - First Setup

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js was not found. Please install Node.js and reopen this file.
    pause
    exit /b 1
)

if not exist .env (
    copy .env.example .env >nul
    echo A new .env file has been created.
    echo Enter your PostgreSQL password in DB_PASSWORD, save, and close Notepad.
    start /wait notepad .env
)

echo Installing the required Node.js packages...
call npm install
if errorlevel 1 goto :error

echo Preparing the PostgreSQL database...
call npm run db:setup
if errorlevel 1 goto :error

echo.
echo Setup completed successfully.
echo Next time, double-click START_WEBSITE.bat.
pause
exit /b 0

:error
echo.
echo Setup did not finish. Read PANDUAN_MENJALANKAN.md for troubleshooting.
pause
exit /b 1
