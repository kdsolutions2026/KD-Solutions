# KD-Solutions Website

Site institucional da KD-Solutions, desenvolvido para apresentar serviços, portfólio, diferenciais da empresa e canais de contato em uma experiência moderna, responsiva e orientada à conversão.

## Visão geral

Este projeto é uma landing page institucional com foco em:

- apresentação da marca KD-Solutions
- geração de leads via formulário e WhatsApp
- exibição de portfólio e serviços
- presença profissional da empresa na web
- base técnica leve, sem dependência de framework

O site está publicado em:

`https://kdsolutionsweb.com.br/`

## Principais recursos

- Layout responsivo com experiência ajustada para desktop e mobile
- Menu mobile com animações e tratamento visual otimizado para legibilidade
- Seção de serviços com posicionamento comercial claro
- Portfólio dinâmico renderizado via JavaScript
- Blocos de diferenciais e apresentação dos fundadores
- Formulário de contato integrado com Web3Forms
- CTA direto para WhatsApp
- SEO técnico com `meta description`, Open Graph, Twitter Card, `robots.txt`, `sitemap.xml` e dados estruturados `Organization`
- Efeitos visuais com partículas, blur, glow, reveal on scroll e interações 3D controladas por contexto de dispositivo

## Stack e bibliotecas

- HTML5
- CSS3
- JavaScript Vanilla
- [GSAP](https://gsap.com/) + ScrollTrigger
- [tsParticles](https://particles.js.org/)
- [Lenis](https://lenis.darkroom.engineering/)
- [Font Awesome](https://fontawesome.com/)
- [Web3Forms](https://web3forms.com/)

## Estrutura do projeto

```text
kdsolutions.com.br/
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- images/
|   |   |-- favicons/
|   |   `-- arquivos visuais do site e portfólio
|   `-- js/
|       |-- form-config.js
|       `-- main.js
|-- docs/
|   `-- materiais de apoio e arquivos não usados em produção
|-- favicon.ico
|-- index.html
|-- robots.txt
`-- sitemap.xml
```

## Seções do site

- Hero principal
- Serviços
- Portfólio
- Diferenciais
- Sobre os fundadores
- Contato
- Rodapé com canais de atendimento

## Como executar localmente

Como o projeto é estático, você pode abrir o `index.html` diretamente no navegador. Para uma experiência melhor de desenvolvimento, recomenda-se usar um servidor local simples, como:

- extensão Live Server no VS Code
- `python -m http.server`
- qualquer servidor estático equivalente

## Configuração do formulário

O formulário usa Web3Forms e a chave é configurada em:

`assets/js/form-config.js`

Se for trocar a conta ou a chave de envio, atualize esse arquivo antes do deploy.

## SEO e indexação

O projeto já inclui:

- `canonical`
- Open Graph
- Twitter Card
- `robots.txt`
- `sitemap.xml`
- `schema.org` no formato `Organization`

Após publicar novas alterações, é recomendável:
