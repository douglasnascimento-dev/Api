# --- INÍCIO DA CONFIGURAÇÃO ---
# Altere estas variáveis com suas informações

$sshUser = "dougl"
$sshHost = "cursojsts.douglasnascimento.dev.br"
$branchName = "master" # Ou a branch que você usa

# Caminho para a pasta do projeto NO SERVIDOR
$serverProjectPath = "/home/dougl/api"

# Nome do processo no PM2
$pm2AppName = "api-rest"

# --- FIM DA CONFIGURAÇÃO ---


# Função para verificar se o último comando foi bem-sucedido
function Check-LastExitCode {
    param(
        [string]$ActionName
    )
    if ($LASTEXITCODE -ne 0) {
        # Lança um erro que pode ser capturado pelo bloco catch
        throw "ERRO: A ação '$ActionName' falhou. Abortando o deploy."
    }
}

# Função para executar comandos locais do Git
function Invoke-LocalGitCommands {
    param(
        [string]$commitMessage,
        [string]$branchName
    )

    Write-Host "--- ETAPA 1: Executando comandos locais ---" -ForegroundColor Cyan

    Write-Host "Executando 'npm run build'..."
    npm run build
    Check-LastExitCode -ActionName "npm run build"

    Write-Host "Adicionando arquivos ao Git..."
    git add .
    Check-LastExitCode -ActionName "git add"

    Write-Host "Realizando o commit..."
    git commit -m "$commitMessage"
    Check-LastExitCode -ActionName "git commit"

    Write-Host "Enviando para o repositório remoto ($branchName)..."
    git push origin $branchName
    Check-LastExitCode -ActionName "git push"

    Write-Host "Push para o repositório concluído com sucesso!" -ForegroundColor Green
}

# Função para executar comandos remotos via SSH
function Invoke-RemoteCommands {
    param(
        [string]$sshUser,
        [string]$sshHost,
        [string]$serverProjectPath,
        [string]$branchName,
        [string]$pm2AppName
    )

    Write-Host "--- ETAPA 2: Executando comandos no servidor via SSH ---" -ForegroundColor Cyan

    # O uso de '&&' garante que o próximo comando só executa se o anterior tiver sucesso.
    # Isso impede que o PM2 reinicie uma aplicação quebrada se o 'git pull' ou 'npm install' falhar.
    $remoteCommands = @"
cd $serverProjectPath && `
echo 'Executando git pull...' && git pull origin $branchName && `
echo 'Executando npm install...' && npm install --production && `
echo 'Reiniciando a aplicação com PM2...' && pm2 restart $pm2AppName
"@

    ssh "$sshUser@$sshHost" $remoteCommands
    Check-LastExitCode -ActionName "Comandos Remotos (SSH)"
}


# --- INÍCIO DA EXECUÇÃO DO SCRIPT ---

try {
    # 1. Pede a mensagem de commit ao usuário
    $commitMessage = Read-Host "Digite a mensagem para o commit"

    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        throw "A mensagem de commit não pode ser vazia."
    }

    # 2. Executa os comandos locais
    Invoke-LocalGitCommands -commitMessage $commitMessage -branchName $branchName

    # 3. Executa os comandos no servidor
    Invoke-RemoteCommands -sshUser $sshUser -sshHost $sshHost -serverProjectPath $serverProjectPath -branchName $branchName -pm2AppName $pm2AppName

    Write-Host "--- PROCESSO DE DEPLOY CONCLUÍDO COM SUCESSO ---" -ForegroundColor Green

}
catch {
    # Captura qualquer erro lançado durante o processo
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
