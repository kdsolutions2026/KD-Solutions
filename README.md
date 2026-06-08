# KD-Solutions

Site institucional da KD-Solutions, pronto para publicar no GitHub e fazer deploy na Vercel.

## Estrutura do projeto

```text
.
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   |-- form-config.js
|   |   `-- main.js
|   `-- images/
|       `-- favicons/
|-- docs/
|-- robots.txt
|-- sitemap.xml
|-- vercel.json
`-- README.md
```

## Arquivos principais

- `index.html`: pagina principal do site.
- `assets/css/styles.css`: estilos da interface.
- `assets/js/main.js`: interacoes, portfolio e efeitos.
- `assets/js/form-config.js`: configuracao do formulario.
- `assets/images/`: imagens usadas diretamente pelo site.
- `assets/images/favicons/`: favicons usados na aba do navegador e pelo Google.
- `docs/`: materiais de apoio e arquivos editaveis que nao sao carregados pelo site.
- `robots.txt` e `sitemap.xml`: arquivos para SEO e Google Search Console.
- `vercel.json`: configuracao simples para deploy na Vercel.

## Como subir no GitHub

1. Crie um repositorio no GitHub.
2. Envie o conteudo desta pasta como a raiz do repositorio.
3. Confirme que `index.html` esta na raiz, nao dentro de outra pasta.
4. Depois de publicar, conecte o repositorio na Vercel.

## Deploy na Vercel

1. Importe o repositorio na Vercel.
2. Use a raiz do repositorio como `Root Directory`.
3. Nao precisa configurar build command.
4. Depois do deploy, conecte o dominio:

```text
https://kdsolutionsweb.com.br/
```

## Favicon no Google

O projeto inclui favicons em tamanhos aceitos pelo navegador e pelo Google:

- `favicon-32x32.png`
- `favicon-48x48.png`
- `favicon-96x96.png`
- `favicon.ico`
- `favicon.svg`

Depois do deploy, teste:

```text
https://kdsolutionsweb.com.br/assets/images/favicons/favicon-48x48.png
```

Se a logo aparecer, solicite indexacao da pagina inicial no Google Search Console. O Google pode levar alguns dias ou semanas para trocar o icone nos resultados.

## Observacao sobre dominio

O SEO tecnico esta preparado para:

```text
https://kdsolutionsweb.com.br/
```

Se o dominio mudar, atualize `index.html`, `robots.txt` e `sitemap.xml`.
