# Historico de versoes

Todas as mudancas relevantes deste projeto sao registradas neste arquivo. O projeto usa SemVer, e os commits de cada versao ficam agrupados pelo tipo do Conventional Commit, do mais recente para o mais antigo.

## Nao publicado

- Nenhuma mudanca versionada.

## v1.0.0 - 2026-08-25

### Metadados

- Tag sugerida: `v1.0.0`
- Artefato: `deploy/loctubo-site-hostgator-v1.0.0.zip`
- Corte historico catalogado: `2d27e48`
- Commits catalogados: 88

O commit que atualiza este proprio changelog e o commit final de release nao podem listar os proprios hashes sem criar uma autorreferencia. Ambos podem ficar identificados pela tag sugerida `v1.0.0` no fechamento da versao.

### Destaques e decisoes de escopo

- Primeira versao estavel, encerrando o escopo do primeiro orcamento avulso contratado.
- Site institucional responsivo com catalogo, busca, filtros, configuradores e integracao com WhatsApp.
- Landing pages de campanha, acompanhamento de conversoes, Google Ads, `robots.txt` e sitemap.
- Labels de conversao ativados para formulario, WhatsApp e telefone nas landing pages.
- Documentacao e fluxo de publicacao por ZIP na HostGator.
- Pacotes de deploy passam a usar a mesma versao SemVer do commit final e da tag.
- `Proposta de Orçamento.html` foi removida do workspace. Como o arquivo nao era rastreado pelo Git, sua remocao nao possui commit nem historico versionado.
- `locacao-betoneira-vibrador-concreto-sao-paulo.html` permanece no repositorio para o proximo ciclo de trabalho, mas nao integra o ZIP nem o sitemap da `v1.0.0`.

### Funcionalidades (feat) - 37

- `ed8c138` - feat(ads): ativa conversoes das landing pages
- `7b3f076` - feat(landings): atualiza catalogos de locacao
- `606d94d` - feat(documento): adiciona termo de manutenção avulsa
- `5128177` - feat(seo): adiciona robots e sitemap
- `943aef6` - feat(marketing): prepara campanhas e conversões
- `f2f2fd1` - feat(ads): adiciona tag do Google Ads
- `bd81882` - feat(catalogo): adiciona mangueira flat azul
- `835cc8f` - feat(catalogo): amplia destaques de produtos disponiveis
- `036b626` - feat(catalogo): adiciona triturador de entulho
- `ab69d09` - feat(catalogo): adiciona produtos e tamanhos ao catalogo
- `764279d` - feat(catalogo): adiciona imagens de novos produtos
- `85867f4` - feat(catalogo): prioriza itens em destaque na listagem
- `6709baf` - feat(catalogo): detalha itens de andaime e escoramento
- `c2b0d21` - feat(sobre): exibe logos das marcas parceiras
- `0abd5e0` - feat(catalogo): amplia equipamentos de limpeza e acabamento
- `941ba6e` - feat(catalogo): detalha escoramento por componentes
- `11c58f5` - feat(catalogo): adiciona categoria de drenagem de agua
- `75c00c2` - feat(catalogo): adiciona itens de acesso e elevacao
- `ee9221e` - feat(catalogo): amplia equipamentos de concretagem
- `0621264` - feat(orcamento): sincroniza configuracao no formulario
- `d78b4b3` - feat(sobre): cria pagina institucional dedicada
- `d987717` - feat(catalogo): atualiza imagens dos equipamentos
- `72bafca` - feat(catalogo): melhora configurador e manuais
- `0da7e0b` - feat(catalogo): atualiza equipamentos para locacao
- `7c2e791` - feat(site): adiciona sobre e configuradores do catalogo
- `0a937e7` - feat(catalogo): reorganiza midias de equipamentos
- `f7753cd` - feat(catalogo): adiciona imagens de equipamentos
- `5df4f91` - feat(site): atualiza hero e secoes institucionais
- `04b3583` - feat(assets): adiciona imagens institucionais do site
- `0b54d86` - feat(orcamento): adiciona reveal lateral ao scroll
- `aa6a336` - feat(catalogo): aprimora experiencia de busca e orcamento
- `24152b3` - feat(catalogo): melhora visualizacao dos itens
- `3676a4a` - feat(footer): profissionaliza rodape institucional
- `658009c` - feat(site): refina catalogo contato e interacoes
- `c404702` - feat(visual): adiciona parallax em vantagens e orcamento
- `e524ef7` - feat(navegacao): adiciona contato localizacao e menu com icones
- `868ec7c` - feat(site): cria catalogo responsivo da loctubo

### Correcoes (fix) - 19

- `2cb23da` - fix(seo): retira landing pausada do sitemap
- `b2ab383` - fix(landings): ajusta altura dos heroes
- `1e9ecf7` - fix: paths para teste do deploy
- `f1911e4` - fix(catalogo): marca cortadora como indisponivel
- `e74b71c` - fix(brand): atualiza favicon e isotipo
- `07f4843` - fix(responsivo): ajusta hero em telas pequenas
- `6de67e6` - fix(catalogo): corrige imagens de equipamentos
- `08e8af2` - fix(catalogo): prioriza produtos disponiveis na listagem
- `1ff1959` - fix(catalogo): marca produtos sem tabela como indisponiveis
- `1478e06` - fix(responsividade): evita overflow horizontal no site
- `7272aed` - fix(catalogo): ajusta layout do configurador no drawer
- `6713879` - fix: ajustes imgs size
- `eabf7a7` - fix: img path to escada_extensivel_37degraus.svg
- `ff53542` - fix(catalogo): corrige manual da placa vibratoria
- `58777d4` - fix(catalogo): ajusta paginacao responsiva
- `16012ec` - fix(responsivo): ajusta layout mobile e menu
- `d6fba8e` - fix(hero): melhora quebra do texto principal
- `94bff0c` - fix: rmv README.md
- `8c67607` - fix(footer): ajusta copyright final

### Desempenho (perf) - 2

- `7bcfcb3` - perf(catalogo): atualiza dimensoes das imagens
- `cb946a7` - perf(assets): adiciona backgrounds avif

### Refatoracoes (refactor) - 4

- `187634a` - refactor(catalogo): remove categoria ferramentas a bateria
- `a878cfc` - refactor(catalogo): usa imagens png nos produtos
- `1bbd35b` - refactor(orcamento): troca reveal por entrada unica
- `d106761` - refactor(vantagens): separa conteudo do parallax

### Estilo (style) - 2

- `6429973` - style(secoes): ajusta identidade de vantagens e orcamento
- `d6f5562` - style(identidade): atualiza marca e paleta visual

### Documentacao (docs) - 5

- `a1f8268` - docs(deploy): documenta release e pacote por versao
- `f0f90ad` - docs(readme): adiciona documentacao principal do projeto
- `7be612e` - docs(deploy): adiciona guia de publicacao na HostGator
- `be5ea11` - docs(manuais): organiza arquivos de instrucoes
- `2b7ef6b` - docs(manuais): adiciona arquivos tecnicos

### Build (build) - 1

- `d5e0ae6` - build(deploy): adiciona gerador de pacotes versionados

### Manutencao e entrega (chore) - 14

- `2d27e48` - chore(deploy): atualiza pacote v1.0.0
- `434b19a` - chore(deploy): gera pacote v1.0.0
- `202a1b5` - chore(site): remove pagina de manutencao avulsa
- `a6e5029` - chore(deploy): atualiza pacote da HostGator
- `85433f0` - chore(release): integra atualizações de marketing
- `ceb17a6` - chore(deploy): prepara pacote de campanhas
- `c1c6324` - chore(deploy): gera pacote HostGator atualizado
- `0608154` - chore(deploy): adiciona backups de publicacao
- `10de7bd` - chore(deploy): prepara versionamento dos pacotes de backup
- `592a366` - chore(deploy): confirma estado atual do site
- `11f26c8` - chore(cache): versiona assets estaticos
- `21141af` - chore(repo): ignora pasta de deploy
- `a40dd9a` - chore(assets): remove midias legadas
- `cbcc0ed` - chore(assets): adiciona imagens do catalogo loctubo

### Legado e outros - 4

- `4e69f08` - Merge pull request #3 from LeonardoDalmazzo/feature/teste-sobre-spa-pagina
- `bf45ee1` - Merge pull request feature/teste-sobre-spa-pagina
- `d34839e` - Catalogo v2
- `1f23b5c` - Catalogo v1
