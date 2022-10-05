# Mecanismo de busca de mangás BR

---
Um webapp que busca entre os leitores de mangá, anime, novel e webtoon mais populares do PT-BR/EN-US para encontrar o mais atualizado para uma série específica.
Feito por [Eduardo Henrique](https://github.com/ed-henrique) (BACKEND) e [Rosialdo Vidinho](https://github.com/Rosialdo) (FRONTEND).
Suporte de documentação e gerenciamento de projetos por [Guilherme Bernardo](https://github.com/GuilhermeBn198);

---

## Índice

- [Metas e Limitações](#goals-and-limitations)
- [Problemas encontrados](#problems-encountered)
- [Demo](#demo)

---

## Objetivos e Limitações

✅ significa feito.

🚧 significa há fazer.

❌ significa que não foi feito.



### [Relacionado ao projeto]

- 🚧 Migrando de JS para TS.
- 🚧 Adote a estratégia de micro commits.
  - Comprometa-se com mudanças atômicas para que erros e bugs possam ser resolvidos mais rapidamente.
- 🚧 Integrar backend e frontend.
- 🚧 Aplicativo separado em 3 containers Docker: um para o DB, um para a API e outro para os crawlers.
- 🚧 Criação de uma API RESTful usando Express para que o usuário possa ler do DB sem ter acesso a ele.



### [Relacionado ao proxy]

- ✅ Uso de proxies.
- ✅ Criando um pool de proxy com renovação automática.



### [Relacionado ao rastreador]

- 🚧 Crie rastreadores para os seguintes sites:
  - ✅ [BRMangas](https://brmangas.net).
  - ✅ [Manganato](https://manganato.com/).
- ✅ Envio de vários requests de uma só vez.
- ✅ Usando Puppeteer para JS Rendering.
- ✅ Criada lista de sites relevantes para uso.
- 🚧 Altere a estrutura do rastreador para adotar o rastreador.
- 🚧 Criando rastreadores para muitos sites.



### [Relacionado ao BD]

- ✅ Criado DB (MongoDB).
- 🚧 Criar banco de dados de backup.
- 🚧 Atualize o banco de dados sob demanda.

### [Relacionado ao front-end]

- 🚧 Crie uma barra de pesquisa para receber a entrada do usuário.
- 🚧 Criação de frontend para o site utilizando React.
- 🚧 Crie um menu suspenso responsivo para a seleção do tipo de série.



### [Limitações]

- ❌ Rastreie sites com recursos antibot da Cloudflare.
  - Sites como mangalivre não serão rastreados por enquanto.
- ❌ Leia séries pelo site.
  - Apenas redirecionará o usuário para um site com a referida série.
- ❌ Atualize o DB diariamente.
  - Estamos decidindo se isso é viável agora, mas, como está, atrapalhará nosso progresso, por isso adiaremos esse recurso.
  - Talvez isso seja possível, pois descobrimos uma maneira de solicitar várias páginas ao mesmo tempo.

---

## Problemas encontrados

### Problemas
1. Atualização diária do DB;
2. Atualizando o banco de dados sem reconstruí-lo do zero;
Soluções possíveis:
1. Tornar o processo de atualização mais rápido e com menos recursos;
2. Atualizar apenas séries que alteraram valores;

### Problemas resolvidos
1. apenas atualizar o BD depois de passar por todas as séries de um site;
2. Criar pool de proxy com renovação automática;

Soluções:

1. Atualização para cada página visitada no site;
2. Use a ferramenta de renovação de proxy integrada do Webshare;

---

## DEMO
WIP 😎

---

## Traduções
(tradução em português)