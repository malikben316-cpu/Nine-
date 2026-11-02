@echo off
title Nine Store Server
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo Node.js is not installed.
    echo Install it from https://nodejs.org and try again.
    echo.
    pause
    exit /b 1
)

node server.js
pause
