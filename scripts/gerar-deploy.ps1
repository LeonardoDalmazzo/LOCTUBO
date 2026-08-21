[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^\d+\.\d+\.\d+$')]
    [string]$Versao
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$raizProjeto = Split-Path -Parent $PSScriptRoot
$pastaDeploy = Join-Path $raizProjeto 'deploy'
$nomePacote = "loctubo-site-hostgator-v$Versao.zip"
$destinoPacote = Join-Path $pastaDeploy $nomePacote

$itensPublicacao = @(
    'index.html'
    'sobre.html'
    'locacao-andaimes-sao-paulo.html'
    'locacao-escoramento-metalico-sao-paulo.html'
    'locacao-martelete-rompedor-sao-paulo.html'
    'robots.txt'
    'sitemap.xml'
    'assets'
    'css'
    'js'
)

# A landing de concretagem permanece no repositório, mas está pausada e não
# integra o pacote até que uma versão futura a reative explicitamente.
$paginaPausada = 'locacao-betoneira-vibrador-concreto-sao-paulo.html'

foreach ($item in $itensPublicacao) {
    $caminhoItem = Join-Path $raizProjeto $item

    if (-not (Test-Path -LiteralPath $caminhoItem)) {
        throw "Item obrigatório do deploy não encontrado: $item"
    }
}

if (-not (Test-Path -LiteralPath (Join-Path $raizProjeto $paginaPausada))) {
    throw "Página pausada não encontrada no repositório: $paginaPausada"
}

if (-not (Test-Path -LiteralPath $pastaDeploy)) {
    New-Item -ItemType Directory -Path $pastaDeploy | Out-Null
}

Push-Location $raizProjeto

try {
    Compress-Archive -Path $itensPublicacao -DestinationPath $destinoPacote -Force
}
finally {
    Pop-Location
}

Write-Output "Pacote criado: $destinoPacote"
