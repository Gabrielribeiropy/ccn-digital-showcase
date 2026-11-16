# Inventário de cobertura — CCN Digital Showcase

Data: 16/11/2026. Branch `main`, HEAD `da6836fc47df5b0b8ac686f7f4bb3c33ffa48986`. Árvore limpa antes da auditoria. O projeto foi criado como uma demonstração estática isolada, sem servidor ou dados reais.

| Arquivo | Área revisada |
| --- | --- |
| `index.html` | Estrutura da página, CSP, links, formulário de busca, atributos de acessibilidade |
| `app.mjs` | Todos os pontos de entrada de usuário (busca, filtros, idioma, simulação do painel), criação de DOM, estado em memória |
| `logic.mjs` | Filtro, validação de categoria e idioma, alternância de visibilidade |
| `data.mjs` | Todos os seis registros de dados fictícios |
| `styles.css` | Responsividade, ausência de imports de recursos externos |
| `package.json` | Scripts, runtime e ausência de dependências |
| `tests/logic.test.mjs` | Quatro testes de visibilidade, filtros, alternância e entradas inválidas |
| `README.md` | Escopo declarado, modo de execução e limites |
| `.gitignore` | Exclusão de ambientes, dependências e logs |

Não há handlers backend, IDs de recursos privados, banco, autenticação, upload, integração, serviço externo ou arquivo de infraestrutura no repositório. A auditoria percorreu os nove arquivos rastreados e o único commit disponível. O fluxo operacional do CCN Digital e sua infraestrutura estão fora deste repositório e não são cobertos por este veredito; foram objeto de relatórios separados.
