# PBI-QUEST - Script para subir cambios a GitHub
# Uso: .\push.ps1 o .\push.ps1 "mensaje del commit"

param(
    [string]$Mensaje = ""
)

$Host.UI.RawUI.WindowTitle = "PBI-QUEST - Push to GitHub"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           🚀 PBI-QUEST - Subir a GitHub                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar si hay cambios
$changes = git status --porcelain

if (-not $changes) {
    Write-Host "✓ No hay cambios para subir." -ForegroundColor Green
    Write-Host ""
    exit 0
}

# Mostrar cambios
Write-Host "📋 Cambios detectados:" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor Gray
git status --short
Write-Host "─────────────────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""

# Solicitar mensaje si no se proporcionó
if (-not $Mensaje) {
    $Mensaje = Read-Host "📝 Escribe el mensaje del commit"
    if (-not $Mensaje) {
        $Mensaje = "Actualización del proyecto - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
}

Write-Host ""
Write-Host "⏳ Subiendo cambios..." -ForegroundColor Cyan
Write-Host ""

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m $Mensaje

# Hacer push
$result = git push origin main 2>&1

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║         ✅ ¡Cambios subidos exitosamente!               ║" -ForegroundColor Green
    Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Ver repositorio: https://github.com/JeyrellT/PBI-QUEST" -ForegroundColor Cyan
} else {
    Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║         ❌ Error al subir los cambios                   ║" -ForegroundColor Red
    Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host $result -ForegroundColor Red
}
Write-Host ""
