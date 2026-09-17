# Rust Country, vitrine digital

Site público + painel da loja para a **Rust Country** (@lojarustcountry_),
loja de calças country femininas bordadas: "moda country de respeito",
envio para todo o Brasil, atendente pelo WhatsApp. A conversão é pelo
WhatsApp: não existe carrinho, checkout nem login de cliente.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (opcional)
- **Catálogo:** 16 calças, todas com a foto do Instagram da loja, em quatro
  bordados (caveira longhorn, penas, asteca, linhas e riscos) e com a marca
  quando a foto ou a legenda mostra (Ariat, Texas Farm, Big Country, Bill
  Way, Real). Nenhuma foto é genérica e nenhum preço foi inventado: as
  legendas não trazem preço, o site também não.
- **Base:** duplicada da vitrine da Encanto Íntimo (que veio da Mimos da
  Mah, da Fantoche, da Picorelli). A lógica (dados, painel, menu com abas) é
  a mesma; identidade, textos e dados são desta loja.

## Modo prévia

Enquanto a vitrine é uma amostra, `PREVIA` em `data/site.config.ts` faz TODO
botão de WhatsApp apontar para o estúdio, com uma mensagem só. Quando a loja
contratar: `PREVIA = null`, e o número da loja (que a bio não revela: o link é
um QR `wa.me/qr/…`) entra em `site.whatsapp`.

## Como rodar

```bash
npm install
npx next dev -p 3150
```

Sem as chaves do Supabase o projeto roda em modo local: lê `data/catalogo.json`
e serve as fotos de `public/produtos`. A senha do painel nesse modo é
`PAINEL_SENHA_LOCAL` (padrão: `rust`).

## Trocar fotos e calças

`data/fonte.json` é a fonte: cada calça tem nome, categoria (o bordado),
`marca`, `linha` (o corte), `bordado` (uma linha), `foco` (onde o bolso está
na foto, fração da altura) e `zoom` (nas fotos de corpo inteiro, quanto
aproximar no quadrado do bolso), descrição e o arquivo da foto em
`_fonte/rust/` (a colheita do Instagram feita pela oficina do estúdio). Depois:

```bash
node scripts/montar-catalogo.mjs   # escreve data/catalogo.json e public/produtos
node scripts/gerar-icones.mjs      # favicon e imagem de compartilhamento
```

## A identidade, em uma linha

"O pesponto": a placa redonda da logo (ferrugem sobre madeira) dá o chão. A
madeira escura é o balcão (topo e rodapé, com as tábuas em fio claro), o
kraft é o papel de embrulho onde as calças deitam (com o grão em SVG), o
denim é a peça (hero, com a sarja em diagonal fina), a ferrugem é o único
acento (o botão que fecha, os ícones). A costura dupla em linha dourada que
todo bolso tem virou o `.pesponto`, desenhado onde a base punha um fio: sob
os títulos, no pé do hero, no topo do rodapé, separando foto e texto no
cartão. A etiqueta de couro do cós (`.couro`) leva o nome da marca. Alfa
Slab One nos títulos (a letra da placa) e Archivo no corpo, a itálica como
voz. O momento da casa é "Escolha pelo bolso": os 16 bolsos de perto, lado
a lado sobre a madeira, sem texto por cima.

## Capturas

```bash
npm i --no-save puppeteer-core
node scripts/capturar.mjs http://localhost:3150/ saida.png 390 844 full
```
