Guia de Configuração do Projeto
Este guia servirá para que todos tenham o ambiente de desenvolvimento funcionando exatamente igual em suas máquinas usando Docker e VS Code.

1. Pré-requisitos
Antes de começar, você precisa ter instalado:

-Git

-VS Code

-Docker Desktop

Nota: Após instalar o Docker, é necessário reiniciar o computador.

2. Passo a Passo para Rodar o Projeto
Passo 1: Clonar o Repositório no VScode
Passo 2: Subir os Containers
Certifique-se de que o Docker Desktop está aberto e rodando. No terminal do VS Code, digite o comando abaixo. Ele vai baixar as imagens, instalar as dependências do Node e do React, e configurar o banco de dados sozinho:

docker-compose up --build

3. Como acessar as ferramentas?
Após o terminal mostrar que o banco está pronto e o backend está rodando, acesse pelos links:

🌐 Frontend (Interface do Usuário): http://localhost:5173 / https://pi1-atualizado-1.onrender.com/ na nuvem

⚙️ Backend (API): http://localhost:3001 / `${API_URL}/api/solicitacoes` no render

🗄️ pgAdmin (Gerenciar o Banco): http://localhost:8080

Usuário: admin@admin.com

Senha: admin

4. Versão web do programa foi publicada na plataforma Render.

frontend: https://pi1-atualizado-1.onrender.com/

