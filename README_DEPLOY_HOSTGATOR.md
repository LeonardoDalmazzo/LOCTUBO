# Deploy na HostGator via ZIP

Este passo a passo serve para publicar o site estatico da LOCTUBO pelo Gerenciador de Arquivos da HostGator/cPanel.

## Resumo rapido

- Arquivo de deploy recomendado: `deploy/loctubo-site-hostgator-v1.0.0.zip`
- Pasta correta na hospedagem: `/home1/loctub90/public_html`
- O zip deve ser extraido dentro de `public_html`
- Os arquivos do site precisam ficar diretamente em `public_html`, sem uma pasta extra por cima

Estrutura correta depois da extracao:

```text
/home1/loctub90/public_html/
|-- index.html
|-- sobre.html
|-- locacao-andaimes-sao-paulo.html
|-- locacao-escoramento-metalico-sao-paulo.html
|-- locacao-martelete-rompedor-sao-paulo.html
|-- robots.txt
|-- sitemap.xml
|-- assets/
|-- css/
|   |-- landing-pages.css
|   `-- styles.css
`-- js/
    |-- about.js
    |-- landing-pages.js
    |-- main.js
    `-- third-party.js
```

Estrutura errada:

```text
/home1/loctub90/public_html/loctubo-site-hostgator-v1.0.0/
|-- index.html
|-- sobre.html
|-- locacao-andaimes-sao-paulo.html
|-- locacao-escoramento-metalico-sao-paulo.html
|-- locacao-martelete-rompedor-sao-paulo.html
|-- robots.txt
|-- sitemap.xml
|-- assets/
|-- css/
`-- js/
```

Se ficar assim, o dominio nao vai abrir o site novo corretamente, porque o `index.html` ficou dentro de uma subpasta.

## Itens que nao entram no ZIP

### Preserve no servidor

Dentro de `public_html`, nao inclua estes itens no ZIP do projeto:

- `.well-known/`
- `cgi-bin/`
- `BingSiteAuth.xml`
- `google9cdc32375c8a1b46.html`
- `googleaedc1ca54f347ed7.html`

As pastas podem ser usadas pelo SSL/cPanel. Os arquivos Google e Bing devem permanecer ate a propriedade do dominio ser confirmada ou migrada para outra forma de validacao.

Os arquivos `robots.txt` e `sitemap.xml` pertencem ao projeto atual e serao substituidos pela extracao do novo ZIP.

## O que apagar ou substituir

Antes de extrair o novo zip, apague ou substitua somente os arquivos antigos do site:

- `assets/`
- `css/`
- `js/`
- `index.html`
- `sobre.html`
- `locacao-andaimes-sao-paulo.html`
- `locacao-escoramento-metalico-sao-paulo.html`
- `locacao-martelete-rompedor-sao-paulo.html`
- `locacao-betoneira-vibrador-concreto-sao-paulo.html`
- `robots.txt`
- `sitemap.xml`

Na release `v1.0.0`, remova a landing de concretagem do servidor. Ela permanece no repositorio, mas esta pausada e nao sera reposta pelo novo ZIP.

Nao apague a pasta `public_html` e nao mexa nas pastas fora dela, como `.cpanel`, `mail`, `ssl`, `tmp`, `logs` ou outras pastas da conta.

## Passo a passo no cPanel/HostGator

1. Entre no cPanel da HostGator.
2. Abra o **Gerenciador de Arquivos**.
3. Clique em `public_html`.
4. Confirme que o caminho exibido e:

```text
/home1/loctub90/public_html
```

5. Faca um backup antes de alterar:
   - selecione os arquivos atuais de `public_html`;
   - clique em **Compactar**;
   - crie um zip de backup;
   - baixe esse backup para o computador;
   - depois remova o zip de backup de `public_html` para ele nao ficar publico.

6. Selecione e apague apenas estes itens antigos:

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

A landing de concretagem aparece nessa lista somente para apagar a copia publicada pelo pacote anterior.

7. Ainda dentro de `public_html`, clique em **Carregar**.
8. Envie este arquivo do computador:

```text
C:\Users\ADML\Desktop\repositories\onGitHub\LocTubo\deploy\loctubo-site-hostgator-v1.0.0.zip
```

9. Volte para o Gerenciador de Arquivos e clique em **Recarregar**.
10. Selecione o zip enviado.
11. Clique em **Extrair**.
12. Quando o cPanel pedir o destino da extracao, use exatamente:

```text
/home1/loctub90/public_html
```

13. Confirme a extracao.
14. Depois de extrair, confira se estes itens apareceram diretamente dentro de `public_html`:

```text
assets/
css/
js/
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
robots.txt
sitemap.xml
```

15. Apague o arquivo `.zip` de dentro de `public_html` depois da extracao.

## Como conferir se ficou certo

Abra o site no navegador e teste:

- pagina inicial: `https://loctubo.com.br/`
- pagina sobre: `https://loctubo.com.br/sobre.html`
- campanha de andaimes: `https://loctubo.com.br/locacao-andaimes-sao-paulo.html`
- campanha de escoramento: `https://loctubo.com.br/locacao-escoramento-metalico-sao-paulo.html`
- campanha de demolição: `https://loctubo.com.br/locacao-martelete-rompedor-sao-paulo.html`
- regras de rastreamento: `https://www.loctubo.com.br/robots.txt`
- sitemap: `https://www.loctubo.com.br/sitemap.xml`

A URL `https://loctubo.com.br/locacao-betoneira-vibrador-concreto-sao-paulo.html` deve ficar indisponivel nesta release. Se ela ainda abrir, remova manualmente o arquivo antigo de `public_html`.

Use `Ctrl + F5` para forcar atualizacao sem cache.

Confira tambem se:

- as imagens carregam;
- o CSS aparece corretamente;
- o menu funciona;
- os arquivos PDF dos manuais abrem;
- a pagina `sobre.html` abre sem erro 404.
- as tres paginas de campanha publicadas abrem sem erro 404.
- os CTAs e formularios das paginas de campanha abrem o WhatsApp correto.
- o `robots.txt` referencia `https://www.loctubo.com.br/sitemap.xml`.

## Se o zip extrair em uma pasta errada

Se aparecer uma pasta assim dentro de `public_html`:

```text
loctubo-site-hostgator-v1.0.0/
```

faca isto:

1. Abra essa pasta.
2. Selecione tudo dentro dela:

```text
assets/
css/
js/
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
robots.txt
sitemap.xml
```

3. Clique em **Mover**.
4. Mova para:

```text
/home1/loctub90/public_html
```

5. Confirme a substituicao se o cPanel perguntar.
6. Volte para `public_html`.
7. Apague a pasta vazia `loctubo-site-hostgator-v1.0.0/`.
8. Apague tambem o arquivo `.zip` enviado.

## Permissoes esperadas

As permissoes normais sao:

- pastas: `0755`
- arquivos: `0644`

Na sua tela, as permissoes ja aparecem nesse padrao. Em geral, nao precisa alterar.

## Se os manuais PDF derem erro 403

Se o site abrir, mas os manuais em PDF mostrarem **Erro 403 - Acesso negado**, o arquivo existe no servidor, mas o Apache/cPanel nao esta permitindo leitura publica.

URL de teste:

```text
https://loctubo.com.br/assets/docs/manual-instrucoes/manual_placa-vibratoria.pdf
```

No cPanel, corrija assim:

1. Abra o **Gerenciador de Arquivos**.
2. Entre em:

```text
/home1/loctub90/public_html/assets/docs/manual-instrucoes
```

3. Confira se estes arquivos existem:

```text
manual_andaime.pdf
manual_placa-vibratoria.pdf
```

4. Ajuste as permissoes das pastas:

```text
assets/              0755
assets/docs/         0755
assets/docs/manual-instrucoes/ 0755
```

5. Ajuste as permissoes dos PDFs:

```text
manual_andaime.pdf             0644
manual_placa-vibratoria.pdf    0644
```

6. Teste novamente a URL direta do PDF.

Se continuar com 403 mesmo com permissoes corretas, verifique o arquivo `.htaccess` dentro de `public_html`. Procure regras parecidas com estas:

```apache
Deny from all
Require all denied
<FilesMatch "\.(pdf)$">
```

Se existir alguma regra bloqueando PDF, remova apenas essa regra ou fale com o suporte da HostGator antes de apagar o `.htaccess` inteiro.

Como teste controlado, tambem da para criar um arquivo `.htaccess` dentro de `assets/docs/` com:

```apache
AddType application/pdf .pdf
<FilesMatch "\.pdf$">
  Require all granted
</FilesMatch>
```

Depois teste de novo. Se o site der erro 500, remova esse `.htaccess` novo e acione o suporte da hospedagem.

## Favicon na aba, URL e Google

O favicon do site ja esta configurado no HTML:

```html
<link rel="icon" type="image/png" sizes="32x32" href="assets/logos/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/logos/apple-touch-icon-180.png">
```

Os arquivos de favicon foram reduzidos para os tamanhos usados pelo navegador, evitando baixar a arte original de alta resolução na primeira visita.

Importante:

- O Chrome mostra o favicon na aba, mas a barra de endereco pode mostrar apenas o icone de informacoes/configuracoes do site.
- O Google nao atualiza o favicon das pesquisas imediatamente.
- Segundo a documentacao do Google, o recrawl pode levar de varios dias a algumas semanas.
- Para acelerar, use o Google Search Console e solicite indexacao da pagina inicial `https://loctubo.com.br/` pela ferramenta **Inspecao de URL**.
- O Google tambem exige que a home e o arquivo do favicon possam ser rastreados pelo Googlebot e pelo Googlebot-Image.
- Mesmo com tudo certo, o Google informa que o favicon nao e garantido nos resultados de pesquisa.

Links uteis:

- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Problemas comuns

### O site continua antigo

- Use `Ctrl + F5`.
- Teste em uma aba anonima.
- Confira se o novo `index.html` esta diretamente em `public_html`.
- Confira se o zip foi extraido no lugar certo.

### O site abre sem estilo ou sem imagens

Provavel causa: os arquivos ficaram em uma subpasta errada.

O correto e:

```text
/home1/loctub90/public_html/css/styles.css
/home1/loctub90/public_html/js/main.js
/home1/loctub90/public_html/js/about.js
/home1/loctub90/public_html/js/landing-pages.js
/home1/loctub90/public_html/js/third-party.js
/home1/loctub90/public_html/assets/
```

### Erro 403 ou 500

- Confira permissoes: pastas `0755`, arquivos `0644`.
- Nao apague o `.htaccess`; se suspeitar dele, renomeie temporariamente para `.htaccess.bak` apenas para teste.
- Depois do teste, restaure o nome `.htaccess`.

## Versionamento dos pacotes

Cada publicacao usa versionamento semantico no formato `vMAJOR.MINOR.PATCH`. O commit final, a tag anotada e o ZIP devem compartilhar exatamente a mesma versao:

```text
Commit: chore(release): publica vX.Y.Z
Tag: vX.Y.Z
ZIP: deploy/loctubo-site-hostgator-vX.Y.Z.zip
```

Use `PATCH` para correcoes, `MINOR` para funcionalidades compativeis e `MAJOR` para mudancas incompativeis ou um novo ciclo principal. Os pacotes antigos com data sao apenas historico legado e nao devem servir de modelo para novas releases.

Consulte [`CHANGELOG.md`](CHANGELOG.md) antes de publicar para conferir o escopo e os commits da versao.

## Como gerar um novo zip no futuro

Quando precisar criar outro zip de deploy, compacte apenas estes itens da raiz do projeto:

```text
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
robots.txt
sitemap.xml
assets/
css/
js/
```

Nao compacte a pasta `LOCTUBO` inteira e nao inclua:

- `.git/`
- `.agents/`
- `.vscode/`
- `deploy/`
- arquivos de backup
- `.well-known/`
- `cgi-bin/`
- `.htaccess`

Enquanto estiver pausada, `locacao-betoneira-vibrador-concreto-sao-paulo.html` deve permanecer fora dessa lista, do ZIP e do sitemap.

Com PowerShell, rode na raiz do projeto e informe a versao sem o prefixo `v`:

```powershell
.\scripts\gerar-deploy.ps1 -Versao 1.0.0
```

O comando cria `deploy\loctubo-site-hostgator-v1.0.0.zip`. Nas proximas releases, substitua `1.0.0` pela nova versao SemVer.

Antes de enviar para a HostGator, abra o zip e confira se ele comeca assim:

```text
index.html
sobre.html
locacao-andaimes-sao-paulo.html
locacao-escoramento-metalico-sao-paulo.html
locacao-martelete-rompedor-sao-paulo.html
robots.txt
sitemap.xml
assets/
css/
js/
```

Se o zip comecar com uma pasta `LOCTUBO/`, ele foi compactado do jeito errado.
