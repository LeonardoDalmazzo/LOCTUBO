# LOCTUBO - Site institucional e catalogo

<p align="center">
  <img src="assets/logos/loctubo-logo.png" alt="Logo LOCTUBO" width="180">
</p>

<p align="center">
  Site institucional e catalogo digital da <strong>LOCTUBO</strong>, empresa de comercio e locacao de equipamentos para construcao civil em Sao Paulo.
</p>

<p align="center">
  <a href="https://loctubo.com.br/">Site em producao</a>
  |
  <a href="README_DEPLOY_HOSTGATOR.md">Guia de deploy HostGator</a>
</p>

## Sumario

- [Sobre o projeto](#sobre-o-projeto)
- [Principais recursos](#principais-recursos)
- [Stack tecnica](#stack-tecnica)
- [Estrutura do repositorio](#estrutura-do-repositorio)
- [Como rodar localmente](#como-rodar-localmente)
- [Manutencao do catalogo](#manutencao-do-catalogo)
- [Paginas de campanha e conversoes](#paginas-de-campanha-e-conversoes)
- [SEO e presenca local](#seo-e-presenca-local)
- [Deploy na HostGator](#deploy-na-hostgator)
- [Backups e Git LFS](#backups-e-git-lfs)
- [Fluxo Git e commits](#fluxo-git-e-commits)
- [Checklist antes de publicar](#checklist-antes-de-publicar)
- [Contatos configurados](#contatos-configurados)

## Sobre o projeto

Este repositorio contem o site estatico da LOCTUBO. O projeto foi construido com HTML, CSS e JavaScript puro, sem etapa de build, para facilitar a publicacao em hospedagem compartilhada como HostGator/cPanel.

O site apresenta a empresa, seus diferenciais, marcas parceiras, localizacao, canais de atendimento e um catalogo de equipamentos para locacao. O formulario de orcamento monta uma mensagem e encaminha o cliente para o WhatsApp da empresa.

Endereco de producao:

```text
https://loctubo.com.br/
```

Paginas principais:

- `index.html`: pagina inicial, catalogo, localizacao, contato e formulario de orcamento.
- `sobre.html`: pagina institucional com historia, missao, visao, valores, diferenciais e marcas.
- `locacao-andaimes-sao-paulo.html`: landing page de campanha para locacao de andaimes, com cotacao pelo WhatsApp.
- `locacao-escoramento-metalico-sao-paulo.html`: landing page de campanha para escoramento metalico, com envio de medidas pelo WhatsApp.
- `locacao-martelete-rompedor-sao-paulo.html`: landing page de campanha para demolição, com cotacao de martelete pelo WhatsApp.
- `locacao-betoneira-vibrador-concreto-sao-paulo.html`: landing page de campanha para concretagem, com cotacao de betoneira e vibrador pelo WhatsApp.
- `robots.txt`: regras de rastreamento do site publico e referencia ao sitemap.
- `sitemap.xml`: lista das seis paginas publicas canonicas.
- `README_DEPLOY_HOSTGATOR.md`: manual operacional para publicar o ZIP de deploy na HostGator.

## Principais recursos

- Site estatico responsivo e mobile-first.
- Hero com imagens de destaque e carrossel.
- Catalogo dinamico gerado pelo JavaScript.
- Filtros por categoria de equipamento.
- Paginacao do catalogo.
- Busca de equipamento na primeira dobra.
- Drawer lateral com detalhes do equipamento.
- Visualizador de fotos dos produtos.
- Itens indisponiveis com estado visual e botao desabilitado.
- Configuradores simples para itens com variacoes de tamanho.
- Links para manuais em PDF.
- Formulario de orcamento com validacao basica.
- Envio do orcamento pelo WhatsApp.
- Mapa incorporado do Google Maps.
- Dados estruturados `LocalBusiness` para SEO local.
- Favicon e metadados Open Graph.
- Landing pages leves para campanhas de Google Ads, sem carrossel, mapa ou catalogo completo.
- Eventos de intencao de conversao para WhatsApp, telefone e formulario.
- Guia de deploy para HostGator/cPanel.
- Backups de publicacao versionados com Git LFS.

## Stack tecnica

| Camada | Tecnologia |
| --- | --- |
| Marcacao | HTML5 semantico |
| Estilos | CSS3 mobile-first |
| Comportamento | JavaScript vanilla |
| Hospedagem | HostGator/cPanel |
| Deploy | ZIP extraido em `public_html` |
| Backups grandes | Git LFS |
| SEO local | Schema.org `LocalBusiness`, canonical, Open Graph |

Nao ha dependencias de Node.js, bundler, framework ou banco de dados para executar o site atual.

## Estrutura do repositorio

```text
.
|-- index.html
|-- sobre.html
|-- locacao-andaimes-sao-paulo.html
|-- locacao-escoramento-metalico-sao-paulo.html
|-- locacao-martelete-rompedor-sao-paulo.html
|-- locacao-betoneira-vibrador-concreto-sao-paulo.html
|-- robots.txt
|-- sitemap.xml
|-- README.md
|-- README_DEPLOY_HOSTGATOR.md
|-- .gitattributes
|-- assets/
|   |-- backgrounds/
|   |-- docs/
|   |   `-- manual-instrucoes/
|   |-- imagens-catalogo/
|   |   `-- otimizadas/
|   `-- logos/
|-- css/
|   |-- landing-pages.css
|   `-- styles.css
|-- js/
|   |-- about.js
|   |-- landing-pages.js
|   |-- main.js
|   `-- third-party.js
`-- deploy/
    |-- loctubo-site-hostgator-2026-07-09.zip
    |-- loctubo-site-hostgator.zip
    `-- backup site antigo loctubo/
```

### Pastas importantes

- `assets/backgrounds/`: imagens de fundo e slides do hero.
- `assets/imagens-catalogo/`: fotos originais dos equipamentos usados no catalogo.
- `assets/imagens-catalogo/otimizadas/`: versoes JPEG responsivas de 480 px e 960 px usadas nos cards e galerias.
- `assets/logos/`: logos da LOCTUBO e marcas exibidas na pagina Sobre.
- `assets/docs/manual-instrucoes/`: PDFs de manuais vinculados a itens do catalogo.
- `css/styles.css`: todos os estilos do site.
- `css/landing-pages.css`: estilos complementares e responsivos das landing pages de campanha.
- `js/main.js`: comportamento da pagina inicial, incluindo menu, carrossel, catalogo, visualizador, formulario e WhatsApp.
- `js/about.js`: comportamento leve da pagina institucional (menu, botao de topo e revelacao de secoes).
- `js/landing-pages.js`: menu, validacao do formulario e abertura do WhatsApp nas landing pages.
- `js/third-party.js`: carregamento adiado da tag do Google Ads e emissao de eventos sem dados pessoais.
- `deploy/`: pacotes ZIP e backups para publicacao e recuperacao.

## Como rodar localmente

Como o site e estatico, existem duas formas simples.

### Opcao 1: abrir direto no navegador

Abra o arquivo `index.html` no navegador.

Essa opcao funciona para uma conferencia rapida, mas alguns comportamentos podem variar por causa de restricoes do navegador com arquivos locais.

### Opcao 2: servidor local simples

Na raiz do projeto, rode:

```powershell
py -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080/
```

Para parar o servidor, use `Ctrl + C` no terminal.

## Manutencao do catalogo

O catalogo fica centralizado em `js/main.js`.

### Adicionar ou editar equipamento

Procure por:

```js
const catalogCategories = [
```

Cada categoria possui uma lista `items`. Um item pode conter:

```js
{
  name: "Nome do equipamento",
  description: "Descricao curta do equipamento.",
  manual: "assets/docs/manual-instrucoes/manual_arquivo.pdf",
  images: [
    { src: "assets/imagens-catalogo/nome-da-imagem.png", alt: "Descricao da imagem" }
  ]
}
```

Boas praticas:

- Use nomes de arquivos sem acentos sempre que possivel.
- Mantenha o caminho da imagem exatamente igual ao arquivo em `assets/imagens-catalogo/`.
- Preencha `alt` com descricao objetiva da imagem.
- Quando houver manual, coloque o PDF em `assets/docs/manual-instrucoes/`.
- Teste o link direto do manual depois do deploy.

### Marcar equipamento como indisponivel

Procure por:

```js
const unavailableEquipmentNames = new Set([
```

Adicione o nome exato do item nessa lista. O nome precisa bater com o campo `name` do equipamento.

Tambem e possivel usar `available: false` diretamente no item, quando fizer sentido manter a disponibilidade junto do proprio cadastro.

### Adicionar imagem nova

1. Coloque a imagem em `assets/imagens-catalogo/`.
2. Referencie a imagem no item do catalogo.
3. Se necessario, atualize o objeto `imageSizes` em `js/main.js` para melhorar carregamento e evitar layout shift.
4. Gere tambem as variantes JPEG correspondentes em `assets/imagens-catalogo/otimizadas/` com os sufixos `-480.jpg` e `-960.jpg`; se elas ainda nao existirem, o site volta automaticamente para a imagem original.
5. Teste em desktop e mobile.

### Atualizar telefone ou WhatsApp

O WhatsApp atual aparece em links e no envio do formulario. Procure por:

```text
5511986740961
```

Formato correto para link:

```text
https://wa.me/5511986740961
```

Use sempre codigo do pais, DDD e numero, sem `+`, espacos, parenteses ou hifen.

### Cache de CSS e JS

As paginas carregam CSS e JS com query string:

```html
css/styles.css?v=20260701
js/main.js?v=20260701
js/about.js?v=20260701
css/landing-pages.css?v=20260701
js/landing-pages.js?v=20260701
```

Ao publicar mudancas importantes, atualize o valor `v=` em todas as paginas que carregam o arquivo alterado para reduzir cache antigo no navegador.

## Paginas de campanha e conversoes

As landing pages de campanha sao curtas e foram feitas para trafego pago: CTA de WhatsApp acima da dobra, provas objetivas, formulario enxuto e FAQ. Elas nao carregam o catalogo completo, mapa ou carrossel.

- `locacao-andaimes-sao-paulo.html`: CTA principal `Cotar andaime pelo WhatsApp`.
- `locacao-escoramento-metalico-sao-paulo.html`: CTA principal `Enviar medidas para cotar`.
- `locacao-martelete-rompedor-sao-paulo.html`: CTA principal `Cotar martelete pelo WhatsApp`.
- `locacao-betoneira-vibrador-concreto-sao-paulo.html`: CTA principal `Cotar betoneira e vibrador pelo WhatsApp`.

Os eventos abaixo sao emitidos sem nome, telefone, endereco, texto do formulario ou outros dados pessoais:

- `whatsapp_click`: clique em um CTA direto de WhatsApp.
- `click_to_call`: clique em um telefone `tel:`.
- `generate_lead`: envio valido do formulario que abre o WhatsApp.

No formulario, apenas `generate_lead` e disparado para evitar contabilizar duas conversoes para a mesma solicitacao. Os campos preenchidos seguem somente na mensagem que o usuario escolhe enviar no WhatsApp.

Para que um evento conte como conversao no Google Ads, crie a acao correspondente no Google Ads e preencha o label fornecido no objeto `googleAdsConversionLabels` de `js/third-party.js`. Enquanto os labels estiverem vazios, os eventos ficam disponiveis para a Google tag/dataLayer, mas nao sao conversoes de Ads configuradas. Sugestao: usar `generate_lead` como primaria e `whatsapp_click`/`click_to_call` como secundarias.

## SEO e presenca local

O projeto ja inclui elementos importantes para busca e compartilhamento:

- `title` e `meta description` por pagina.
- `canonical` apontando para o dominio de producao.
- Open Graph para compartilhamento.
- Favicon em PNG quadrado.
- Schema.org `LocalBusiness` em `index.html`.
- Endereco, telefones e links sociais no conteudo.
- Link direto para Google Maps.

### Google Maps e Perfil da Empresa

A aparicao por buscas como `LOCTUBO`, `Loctubo` e `Loc Tubo` depende principalmente do Perfil da Empresa no Google:

```text
https://business.google.com/
```

Recomendacoes:

- Use o nome real da empresa.
- Mantenha endereco, telefone, site e horario consistentes.
- Adicione fotos reais da fachada, entrada, equipamentos e atendimento.
- Cadastre servicos coerentes com locacao de equipamentos para construcao civil.
- Solicite verificacao do perfil.
- Use o Google Search Console para solicitar recrawl da home quando publicar mudancas.

### Favicon no Google

O favicon pode aparecer rapidamente na aba do navegador, mas demorar mais para aparecer nos resultados de pesquisa. O Google pode levar varios dias ou semanas para rastrear e processar a alteracao.

Documentacao:

- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Deploy na HostGator

O deploy e feito por ZIP no Gerenciador de Arquivos do cPanel.

Guia detalhado:

```text
README_DEPLOY_HOSTGATOR.md
```

Resumo operacional:

1. Entrar no cPanel da HostGator.
2. Abrir o Gerenciador de Arquivos.
3. Entrar em:

```text
/home1/loctub90/public_html
```

4. Fazer backup dos arquivos atuais.
5. Remover/substituir somente os arquivos do site:

```text
assets/
css/
js/
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
locacao-betoneira-vibrador-concreto-sao-paulo.html
robots.txt
sitemap.xml
```

6. Enviar o ZIP mais recente de `deploy/`.
7. Extrair diretamente em `public_html`.
8. Garantir que os seis arquivos HTML, `robots.txt`, `sitemap.xml`, `assets/`, `css/` e `js/` fiquem diretamente dentro de `public_html`.
9. Apagar o ZIP do servidor depois da extracao.
10. Testar home, pagina Sobre, paginas de campanha, imagens, formularios, WhatsApp e manuais em PDF.

### Itens que permanecem somente no servidor

No `public_html`, nao inclua no ZIP nem remova sem revisao:

- `.well-known/`
- `cgi-bin/`
- `.htaccess`
- arquivos de validacao do Google/Bing

Os arquivos `robots.txt` e `sitemap.xml` pertencem ao projeto atual e devem ser substituidos pela extracao do ZIP.

### Permissoes esperadas

```text
Pastas:   0755
Arquivos: 0644
```

Se os PDFs dos manuais retornarem erro `403`, verifique as permissoes da pasta `assets/docs/manual-instrucoes/` e dos arquivos `.pdf`.

## Backups e Git LFS

A pasta `deploy/` foi versionada para manter os pacotes de publicacao e backups na nuvem do repositorio privado.

Como alguns ZIPs passam de 100 MB, o repositorio usa Git LFS.

Arquivo de configuracao:

```text
.gitattributes
```

Regras atuais:

```text
deploy/*.zip filter=lfs diff=lfs merge=lfs -text
deploy/**/*.zip filter=lfs diff=lfs merge=lfs -text
```

### Ao clonar em outra maquina

Instale Git LFS e baixe os objetos:

```powershell
git lfs install
git lfs pull
```

### Cuidados

- Mantenha o repositorio privado enquanto houver backups e SQLs em `deploy/`.
- Evite publicar `deploy/` em servidores publicos.
- Nao envie arquivos `.zip` grandes fora do LFS.
- Antes de adicionar novos backups, confirme:

```powershell
git check-attr filter -- deploy\nome-do-arquivo.zip
```

O retorno esperado e:

```text
filter: lfs
```

## Fluxo Git e commits

Use commits pequenos, claros e no padrao Conventional Commits, com texto em pt-BR.

Exemplos:

```text
feat(catalogo): adiciona novo equipamento
fix(deploy): corrige instrucao de permissao dos manuais
docs(readme): documenta fluxo de publicacao
chore(deploy): adiciona backup da hospedagem
refactor(css): organiza tokens de espacamento
```

Recomendacoes:

- Um commit por assunto.
- Evite misturar mudanca visual, conteudo e backup no mesmo commit.
- Rode `git status` antes de commitar.
- Revise `git diff --check` para detectar espacos ou problemas simples.
- Para publicar:

```powershell
git push origin main
```

## Checklist antes de publicar

Antes de gerar ou enviar um ZIP de deploy:

- Conferir `index.html`, `sobre.html` e as quatro paginas de campanha no navegador.
- Testar menu mobile.
- Testar busca do catalogo.
- Testar filtros e paginacao.
- Abrir detalhes de equipamentos.
- Abrir visualizador de fotos.
- Testar formulario de orcamento.
- Conferir se o WhatsApp abre com mensagem correta.
- Testar links de telefone.
- Testar links para Google Maps.
- Testar PDFs dos manuais.
- Conferir imagens do catalogo.
- Validar se `css/styles.css`, `css/landing-pages.css`, `js/main.js`, `js/about.js`, `js/landing-pages.js` e `js/third-party.js` carregam sem cache antigo.
- Atualizar `README_DEPLOY_HOSTGATOR.md` se o fluxo de hospedagem mudar.
- Criar backup antes de substituir arquivos no cPanel.

## Gerar novo ZIP de deploy

Na raiz do projeto, compacte somente os arquivos necessarios para producao:

```powershell
Compress-Archive -Path index.html,sobre.html,locacao-andaimes-sao-paulo.html,locacao-escoramento-metalico-sao-paulo.html,locacao-martelete-rompedor-sao-paulo.html,locacao-betoneira-vibrador-concreto-sao-paulo.html,robots.txt,sitemap.xml,assets,css,js -DestinationPath deploy\loctubo-site-hostgator-NOVA-DATA.zip -Force
```

O ZIP deve abrir com esta estrutura:

```text
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
locacao-betoneira-vibrador-concreto-sao-paulo.html
robots.txt
sitemap.xml
assets/
css/
js/
```

Se o ZIP criar uma pasta `LOCTUBO/` por cima, ele foi compactado no nivel errado.

## Contatos configurados

Dados exibidos atualmente no site:

```text
Telefone: (11) 3746-8886
Telefone: (11) 3746-8893
WhatsApp: (11) 98674-0961
Endereco: Rua Manoel de Afonseca, 61 - Jardim das Vertentes, Sao Paulo - SP
Site: https://loctubo.com.br/
```

Antes de alterar dados de contato, procure a informacao em:

- `index.html`
- `sobre.html`
- `js/main.js`

## Licenca e uso

Este e um projeto proprietario da LOCTUBO. O repositorio deve permanecer privado enquanto contiver backups, dados internos ou arquivos de publicacao nao destinados ao publico.
