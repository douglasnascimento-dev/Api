# --- INÍCIO DA CONFIGURAÇÃO ---
# Altere estas variáveis com suas informações

$sshUser = "dougl"
$sshHost = "cursojsts.douglasnascimento.dev.br"
$branchName = "master" # Ou "master", dependendo da sua branch

# Caminho para a pasta do projeto NO SERVIDOR (onde o código é executado)
$serverProjectPath = "/home/dougl/api"

# Nome do processo no PM2
$pm2AppName = "api-rest"

# --- FIM DA CONFIGURAÇÃO ---


# 1. Pede a mensagem de commit ao usuário
$commitMessage = Read-Host "Digite a mensagem para o commit"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    Write-Host "ERRO: A mensagem de commit não pode ser vazia. Abortando." -ForegroundColor Red
    exit
}

# 2. Executa os comandos Git locais
Write-Host "--- ETAPA 1: Executando comandos locais ---" -ForegroundColor Cyan
npm run build
git add .
git commit -m "$commitMessage"
git push origin $branchName

# Verifica se o push falhou
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: O comando 'git push' falhou. O script foi interrompido." -ForegroundColor Red
    exit
}

Write-Host "Push para o repositório remoto concluído com sucesso!" -ForegroundColor Green


# 3. Executa os comandos no servidor via SSH
Write-Host "--- ETAPA 2: Executando comandos no servidor ---" -ForegroundColor Cyan

# Monta a sequência de comandos a serem executados no servidor
$remoteCommands = "cd $serverProjectPath; git pull origin $branchName; echo 'Executando npm install...'; npm install; echo 'Reiniciando a aplicação com PM2...'; pm2 restart $pm2AppName"

# Executa os comandos remotamente
ssh "$sshUser@$sshHost" $remoteCommands


Write-Host "--- PROCESSO DE DEPLOY CONCLUÍDO ---" -ForegroundColor Green
