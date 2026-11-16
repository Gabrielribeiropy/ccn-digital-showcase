# CCN Digital — public showcase

[Português](#português) · [English](#english)

## Português

Esta é uma **demonstração técnica independente**, criada para apresentar decisões de interface e organização de conteúdo do projeto CCN Digital. Todos os textos são fictícios. A vitrine não é um serviço oficial da UFPI e não se conecta ao sistema real.

### O que você pode experimentar

- Buscar e filtrar recursos, serviços e notícias de exemplo.
- Alternar entre português e inglês.
- Usar uma prévia de painel para mostrar ou ocultar itens. As alterações ficam apenas na memória da página e desaparecem ao recarregar.
- Ler o código de interface, dados simulados e regras de filtro sem precisar de credenciais.

### Executar localmente

Requisitos: Python 3 para servir arquivos estáticos e Node.js 20+ para executar os testes. Não há dependências para instalar.

```bash
python -m http.server 4173
```

Abra `http://localhost:4173`. Em outro terminal, execute `npm test`.

### Limite da demonstração

Este repositório **não contém** API, banco de dados, autenticação, integrações, configuração de implantação, credenciais, dados reais ou código operacional do serviço. O painel é apenas uma simulação local. Ele demonstra uma parte da experiência e algumas decisões de organização; não é uma cópia do produto completo nem uma indicação de que o sistema institucional está publicado.

## English

This is an **independent technical showcase** for the CCN Digital project. It presents interface and content organization decisions using entirely fictional text. It is not an official UFPI service and does not connect to the real system.

### What you can try

- Search and filter sample resources, services and news.
- Switch between Portuguese and English.
- Use a panel preview to show or hide items. Changes only live in page memory and reset on reload.
- Read the interface code, mock data and filtering rules without credentials.

### Run locally

You need Python 3 to serve static files and Node.js 20+ to run tests. There are no packages to install.

```bash
python -m http.server 4173
```

Open `http://localhost:4173`. In another terminal, run `npm test`.

### Scope

This repository contains **no** API, database, authentication, integrations, deployment configuration, credentials, real data or operational service code. The panel is a local simulation. It demonstrates part of the experience and some organization decisions; it is neither a full product copy nor a claim that the institutional system is live.
