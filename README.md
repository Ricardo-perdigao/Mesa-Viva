# Mesa Viva

## Integrantes

    Ricardo de Carles Perdigão


## Sobre o produto

Mesa Viva é a apresentação de um clube de comida caseira de estação, feito com ingredientes frescos de pequenos produtores e entregue pronto para aquecer. A ideia conversa com pessoas que têm uma rotina corrida, mas querem comer bem sem abrir mão de sabor, cuidado e variedade. A página apresenta o cardápio semanal, explica a experiência, mostra avaliações fictícias e simula uma oferta de primeira semana.

## Jornada de construção

### Ideia inicial

A ideia surgiu da vontade de aproximar a praticidade da entrega de comida do cuidado de uma refeição feita em casa. Em vez de criar mais um restaurante genérico, pensamos em uma marca com identidade própria e foco em comida de verdade, ingredientes sazonais e relação com produtores locais.

Consideramos três caminhos: uma página para um restaurante de bairro, um serviço de marmitas por assinatura e um clube de descoberta gastronômica. Escolhemos o clube de refeições porque permite comunicar uma proposta clara, apresentar pratos variados e criar uma jornada simples de experimentação.

### Pesquisa e referências

Usamos como referência padrões comuns de páginas de restaurantes, clubes de assinatura de alimentos e marcas de produtos artesanais: fotografia de comida em destaque, cardápio organizado em cartões, depoimentos, oferta objetiva e perguntas frequentes.

A direção visual combina tons naturais de verde, creme e terracota, tipografia editorial nos títulos e imagens de ingredientes e pratos. A intenção foi transmitir acolhimento e qualidade sem deixar a navegação pesada. As fotografias são imagens demonstrativas carregadas por URL do Unsplash; não há integração com APIs de dados.

### Ferramentas utilizadas

    React
    Vite
    JavaScript (ES Modules)
    CSS Modules
    VS Code / OpenCode
    Unsplash (fotografias demonstrativas)

### Uso de IA

O OpenCode, utilizando o modelo GPT-6 Luna, foi usado como apoio na organização da proposta, na criação da estrutura da landing page, na implementação da interface React e na redação inicial deste README.

O modelo ajudou especialmente a transformar os requisitos em uma jornada de página completa e a separar os dados, o estado/interações e a interface seguindo MVVM. As sugestões de cardápio sazonal, avaliações demonstrativas, FAQ e cadastro simulado foram aproveitadas.

As sugestões foram adaptadas para manter a comunicação em português, explicitar que preço e avaliações são fictícios e dar ao CTA um resultado visível: o formulário mostra uma confirmação após o envio. A escolha de nomes, conteúdo e identidade Mesa Viva foi feita para dar unidade à solução. Não foram usados outros modelos nesta versão.

### Evolução da solução

A proposta evoluiu de uma página de refeições práticas para um clube de comida de estação que valoriza produtores locais. A partir dessa mudança, organizamos a comunicação em uma sequência: apresentação da marca, pratos da semana, explicação do funcionamento, avaliações, oferta e FAQ.

O CTA foi definido como um cadastro demonstrativo em modal. Essa escolha mantém toda a experiência no navegador, sem backend, banco de dados ou integração com APIs. Também adicionamos navegação por âncoras, FAQ expansível e menu adaptado para telas pequenas. A paleta terrosa e a combinação de imagem editorial com textos curtos reforçam a ideia de comida feita com cuidado.

### Resultado final

O resultado é uma landing page responsiva com identidade visual consistente, conteúdo demonstrativo e interações funcionais no cliente. O projeto separa os dados em `src/models/content.js`, estado e ações em `src/viewmodels/useLandingViewModel.js` e a interface em `src/views/App.jsx`, estilizada por `src/views/App.module.css`.

Se tivéssemos mais tempo, substituiríamos as imagens de referência por fotografia própria, testaríamos a página com usuários, incluiríamos validações e estados adicionais no formulário e desenvolveríamos uma área de escolha de pratos com atualização do resumo do pedido.

## Como executar

É necessário ter Node.js instalado. Na pasta do projeto, execute:

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
