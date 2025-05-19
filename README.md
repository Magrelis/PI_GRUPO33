# PI_GRUPO33  
**PROJETO INTEGRADOR: DESENVOLVIMENTO DE SISTEMAS ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADOS NA WEB**

---

# TaskFlow 📝🚀

**TaskFlow** é um aplicativo de gerenciamento de tasks para equipes remotas. Ele ajuda as equipes a organizar, priorizar e acompanhar o trabalho facilmente, tanto no mobile quanto na web.

---

## 📌 Objetivo

* Fornecer uma interface simples e intuitiva para criação e atribuição de tasks.  
* Permitir integração com ferramentas populares (como Slack, Google Drive e Zoom).  
* Oferecer relatórios de progresso em tempo real.  
* Garantir acessibilidade multiplataforma (mobile e web).

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**  
- HTML5  
- CSS3  
- JavaScript (Vanilla)

**Backend:**  
- Python 3.11  
- Socket.IO  
- Eventlet

**Integrações:**  
- **WebSocket** para comunicação cliente-servidor em tempo real  
- **Webhook do Slack** para notificações de tasks

---

## ✅ Funcionalidades Demonstradas

- **Interface Kanban** com quatro colunas:  
  `To Do, Doing, Finished ✅, and Canceled ❌`

- **Criar Tasks**  
  Com campos para **título** e link opcional do **Google Drive**

- **Atualizar Status da Task**  
  Arrastar e soltar tasks entre as colunas

- **Comentários nas Tasks**  
  Adicionar e remover comentários em tasks individuais para melhorar a colaboração e o compartilhamento de contexto

- **Atualizações em Tempo Real**  
  Via conexão WebSocket entre cliente e servidor

- **Notificações no Slack**  
  Mensagens automáticas no Slack quando novas tasks são criadas

---

## 🚀 Como Executar

Siga os passos abaixo para rodar o TaskFlow localmente:

#### 1. Clone o repositório  

Siga os passos abaixo para rodar o TaskFlow localmente::


#### 1. Clone o repositório
```
gh repo clone Magrelis/PI_GRUPO33
```

#### 2. Crie e ative um ambiente virtual
```
cd PI_GRUPO33/taskflow

python3.11 -m venv venv

source venv/bin/activate       # On Windows use: venv\Scripts\activate
```

#### 3. Navegue até a pasta do backend e instale as dependências
```
cd backend 

pip install -r requirements.txt
```

#### 4. Run the server
```
python server.py
```

#### 5. In a new terminal, navigate to the frontend folder and open index.html in your browser
```
cd ../frontend

open index.html           # macOS
xdg-open index.html       # Linux
start index.html          # Windows
```

## 👥 Contribuidores

- Caio Moreira Santos Oliveira  
- Davi Anastacio Santos 
- Gabriel Passos de Melo Silva   
- João Antonio Dalpiva
