# Relatório de Auditoria de Segurança — CCN Digital Showcase

**Data:** 16/11/2026
**Branch e commit:** `main`, `da6836fc47df5b0b8ac686f7f4bb3c33ffa48986`
**Escopo:** novo repositório de demonstração pública, antes da primeira publicação.
**Veredito pré-publicação:** **APTO para publicar como demonstração estática**, limitado a este repositório. Não é um veredito sobre o sistema real ou a futura VM da UFPI.

## Resumo executivo

Achados confirmados: **0 críticos, 0 altos, 0 médios, 0 baixos**. O projeto não contém servidor, banco, contas, segredos ou integração externa. O painel simulado modifica somente estado em memória. Quatro testes passaram. A consulta `npm audit --omit=dev` retornou `ENOLOCK` porque o projeto tem zero dependências e não possui lockfile; isso não é um alerta de vulnerabilidade.

## Stack detectada

| Categoria | Tecnologia e adaptação da análise |
| --- | --- |
| Frontend | HTML, CSS e módulos JavaScript nativos; conteúdo criado com `textContent` e `replaceChildren`. |
| Backend e rotas | Inexistentes; hospedagem estática. Não há API nem server actions. |
| Banco e isolamento | Inexistentes; seis itens fictícios em `data.mjs`, sem persistência. |
| Autenticação e autorização | Inexistentes; o painel é uma prévia sem poder operacional. |
| Infraestrutura | Nenhum arquivo de deploy ou domínio real no repositório; o HTML define CSP local. |
| Dependências | Nenhuma dependência npm; Node.js 20+ é usado somente nos testes. |
| Git e ambiente | Um commit; `.gitignore` cobre `.env*`, logs e `node_modules/`. |

## Cinco categorias profundas

1. **Banco e isolamento:** não se aplica. Não existem tabelas, queries, dados pessoais ou tenants.
2. **Permissão no navegador:** a alternância em `app.mjs:116` modifica apenas uma cópia em memória; não existe endpoint privilegiado. A página declara explicitamente que não possui contas nem conexão com o sistema real (`index.html:31`).
3. **IDOR/BOLA:** não se aplica. Os IDs em `data.mjs` identificam somente itens fictícios locais; `toggleItem` valida se o ID existe (`logic.mjs:14-16`).
4. **Segredos:** nenhum arquivo de ambiente, chave, senha ou URL de produção foi encontrado nos nove arquivos rastreados nem no único commit. `.gitignore:3-5` exclui logs e arquivos `.env*`. O único URL encontrado no texto do projeto é `localhost`, usado na instrução de desenvolvimento.
5. **Entradas/XSS/arquivos:** a busca é limitada a 80 caracteres no HTML (`index.html:35`) e na regra (`logic.mjs:6`); o texto é inserido com `textContent` (`app.mjs:55,85-87`). Não há `innerHTML`, `eval`, upload, SQL, shell ou requisições de rede. A CSP em `index.html:7` bloqueia conexões externas.

## Checklist dos 20 controles

| Nº | Controle | Resultado |
| --- | --- | --- |
| 1 | MFA | ◻️ Não se aplica: sem contas. |
| 2 | RBAC | ◻️ Não se aplica: sem API privilegiada. |
| 3 | Limite por IP | ◻️ Não se aplica: sem servidor. |
| 4 | HTTPS | ❓ Depende da hospedagem; não verificável no repositório. |
| 5 | Dados sensíveis em repouso | ◻️ Não se aplica: sem dados reais/persistência. |
| 6 | WAF | ❓ Depende da hospedagem; não verificável no repositório. |
| 7 | Logs de acesso/auditoria | ◻️ Não se aplica ao código estático; logs da hospedagem não verificáveis. |
| 8 | Ambiente privado | ✅ `.gitignore` exclui `.env*`; nenhum arquivo de ambiente rastreado. |
| 9 | Backup | ◻️ Não se aplica: dados só em memória e código versionado. |
| 10 | Segredo exposto | ✅ Nenhum segredo encontrado nos arquivos e commit revisados. |
| 11 | Autorização por ID | ◻️ Não se aplica: não há recurso privado. |
| 12 | Rotas admin | ◻️ Não se aplica: a prévia do painel não tem servidor. |
| 13 | Segredo no frontend | ✅ Não há segredo nem chamada a endpoint sensível. |
| 14 | RLS | ◻️ Não se aplica: sem banco. |
| 15 | Rate limit de endpoints | ◻️ Não se aplica: sem endpoint. |
| 16 | Chamadas sensíveis no frontend | ✅ Não há chamadas de rede. |
| 17 | Limite de custos externos | ◻️ Não se aplica: sem serviços externos. |
| 18 | IP de origem | ◻️ Não se aplica: sem origem própria. |
| 19 | IDs previsíveis | ◻️ Não se aplica: IDs locais fictícios sem privilégio. |
| 20 | Recuperação de senha | ◻️ Não se aplica: sem contas. |

## Checklist das 11 práticas

| Nº | Prática | Resultado |
| --- | --- | --- |
| 1 | Segredos e ambiente | ✅ Sem segredos; `.gitignore` adequado ao escopo. |
| 2 | API no frontend | ✅ Não há API ou chave. |
| 3 | Validação de input | ✅ Categoria/idioma validados; busca limitada. |
| 4 | Autenticação/autorização | ◻️ Não se aplica: nenhuma ação protegida. |
| 5 | Injeção/XSS/CSRF/SSRF | ✅ Dados entram no DOM por `textContent`; sem rede, banco ou formulários enviados. |
| 6 | Logging sensível | ◻️ Não se aplica: sem logs ou dados sensíveis. |
| 7 | Senhas | ◻️ Não se aplica. |
| 8 | Backup/restore | ◻️ Não se aplica à página sem persistência. |
| 9 | Dependências | ✅ Zero dependências; `npm audit` não executa sem lockfile, limitação documentada. |
| 10 | Transporte/headers | ⚠️ CSP no HTML; HTTPS e headers HTTP finais dependem da hospedagem. |
| 11 | Não confiar no frontend | ✅ A interface não toma decisões de segurança nem alcança o sistema real. |

## Pontos fortes e limites

- `index.html:7` define CSP que restringe scripts e estilos à própria origem e bloqueia conexões.
- `app.mjs:49,116` mantém a prévia do painel em memória e não persiste alterações.
- `README.md:7,28,33,53` identifica a vitrine como independente, com dados fictícios e sem sistema real.
- `npm run check`: sintaxe válida e quatro testes aprovados.

**Não verificável pelo repositório:** configuração de HTTPS, headers da hospedagem, proteção de conta GitHub e operação do sistema real. Publicar esta vitrine não autoriza afirmar que a implantação institucional foi homologada.

## Recomendações priorizadas

**P1 — Publicação:** hospedar apenas estes arquivos estáticos e conferir que o site entregue preserva a CSP, usa HTTPS e não carrega recursos externos.
**P2 — Manutenção:** repetir a revisão ao adicionar dependências, formulários, APIs, dados reais ou integrações.

## ISSUES PARA O GITHUB

Nenhum achado acionável confirmado nesta demonstração. Não há issue de segurança a abrir.

Nenhuma linha do código-fonte foi alterada durante esta auditoria. Somente os artefatos em `docs/security-audit/` foram criados.
