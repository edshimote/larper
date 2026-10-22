# DEPLOYMENT — Eduardo.dev

Status: código pronto para deploy na Vercel. **Nenhum deploy foi realizado** — este sandbox não
teve acesso de rede em nenhuma etapa (1–6), então `npm install`/`next build`/deploy real nunca
puderam ser executados aqui. Isso é documentado com honestidade desde a Etapa 1.

## 1. Pré-requisitos
- Conta na [Vercel](https://vercel.com) (ou outra plataforma compatível com Next.js 15 App Router).
- Repositório Git com este código (GitHub/GitLab/Bitbucket).
- Node.js 20+ se for rodar localmente antes do deploy.

## 2. Primeiro build local (fazer antes do deploy)
```bash
npm install
npm run lint     # tsc --noEmit
npm run build    # next build
npm run start    # testa o build de produção localmente
```
Corrigir qualquer erro de tipo/lint que aparecer — nunca verificado neste sandbox (sem rede).

## 3. Variáveis de ambiente
Copiar `.env.example` → configurar no dashboard da Vercel (Project Settings → Environment Variables):

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL final do site (ex: `https://eduardo.dev` ou o domínio `*.vercel.app`). Usada em canonical, sitemap, robots, Open Graph. |
| `CONTACT_FORM_WEBHOOK_URL` | Não | Endpoint que recebe o POST do formulário de contato (Formspree, Make, n8n, etc). Sem ela, o formulário mostra o estado "não configurado" (nunca finge sucesso). |
| `CONTACT_FORM_WEBHOOK_TOKEN` | Não | Bearer token opcional enviado ao webhook acima. Fica só no servidor. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Não | Ativa analytics leve (Plausible, sem cookies). Sem ela, nenhum script de analytics carrega. |

Nenhuma chave/API privada deve ter o prefixo `NEXT_PUBLIC_` — apenas `CONTACT_FORM_WEBHOOK_URL`/`TOKEN` ficam server-side.

## 4. Deploy na Vercel
```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # produção
```
Ou via dashboard: Import Git Repository → framework detectado automaticamente como Next.js → adicionar env vars → Deploy.

## 5. Domínio personalizado
Vercel → Project → Settings → Domains → adicionar domínio → configurar DNS (CNAME/A conforme instruções da Vercel) → atualizar `NEXT_PUBLIC_SITE_URL` para o domínio final e redeployar.

## 6. Rotas e páginas de erro
- `/` — homepage.
- `/projects/<slug>` — 7 demos de projeto (`noindex`, mas acessíveis via link).
- `/api/contact` — endpoint do formulário (POST apenas).
- `src/app/not-found.tsx` — 404 customizado.
- `src/app/error.tsx` — boundary de erro global.
- `src/app/sitemap.ts` / `robots.ts` — gerados dinamicamente, servidos em `/sitemap.xml` e `/robots.txt`.
- `src/app/icon.tsx` / `opengraph-image.tsx` — favicon e imagem OG gerados em runtime (sem assets externos).

## 7. Pós-deploy — checklist manual (não verificável sem build/browser real)
- [ ] `npm run build` sem erros.
- [ ] Navegação entre todas as seções e as 7 rotas de projeto.
- [ ] Visualizador 3D (`/projects/beyond-the-screen`) carrega WebGL.
- [ ] Terminal interativo (`#terminal`) responde a todos os comandos.
- [ ] Formulário de contato envia (com `CONTACT_FORM_WEBHOOK_URL` configurado).
- [ ] Toggle EN/PT funciona e persiste.
- [ ] Responsividade mobile/tablet/desktop.
- [ ] Lighthouse: Performance, SEO, Acessibilidade, Best Practices.
- [ ] `https://seu-dominio/sitemap.xml` e `/robots.txt` acessíveis.
- [ ] Open Graph renderiza corretamente (testar em https://cards-dev.twitter.com ou debugger do Facebook).

## 8. Manutenção
- Novo projeto/case study real: adicionar em `src/lib/projects.ts` (`CASE_STUDIES`), nunca inventar dados.
- Novas chaves i18n: sempre em `src/lib/i18n.ts`, nos dois idiomas (`en` e `pt`) — o tipo `Dictionary` quebra o build se faltar uma.
- Trocar provedor do formulário: só mexer em `CONTACT_FORM_WEBHOOK_URL`, nenhum componente muda.
- GitHub/LinkedIn do Eduardo: preencher `src/lib/contact.ts` (`CONTACT.github`/`linkedin`) quando houver URL real — hoje `null` de propósito.
