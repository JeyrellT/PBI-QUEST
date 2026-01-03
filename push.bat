@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║           🚀 PBI-QUEST - Subir a GitHub                 ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: Verificar si hay cambios
git status --porcelain > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if "!changes!"=="" (
    echo ✓ No hay cambios para subir.
    echo.
    pause
    exit /b 0
)

:: Mostrar cambios
echo 📋 Cambios detectados:
echo ─────────────────────────────────────────────────────────────
git status --short
echo ─────────────────────────────────────────────────────────────
echo.

:: Solicitar mensaje de commit
set /p "mensaje=📝 Escribe el mensaje del commit: "

if "!mensaje!"=="" (
    set "mensaje=Actualización del proyecto"
)

echo.
echo ⏳ Subiendo cambios...
echo.

:: Agregar todos los cambios
git add .

:: Hacer commit
git commit -m "!mensaje!"

:: Hacer push
git push origin main

echo.
if %errorlevel% equ 0 (
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║         ✅ ¡Cambios subidos exitosamente!               ║
    echo ╚══════════════════════════════════════════════════════════╝
) else (
    echo ╔══════════════════════════════════════════════════════════╗
    echo ║         ❌ Error al subir los cambios                   ║
    echo ╚══════════════════════════════════════════════════════════╝
)
echo.
pause
