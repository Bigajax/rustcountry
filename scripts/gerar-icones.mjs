/**
 * Gera o favicon e a imagem de compartilhamento da Rust Country a
 * partir da placa da logo em public/marca/disco.png (o avatar do
 * Instagram recortado em círculo): app/icon.png (512) e
 * app/apple-icon.png (180) com a placa sobre a madeira; public/og/site.jpg
 * (1200x630) com a placa, o nome em slab e o pesponto dourado, o que
 * aparece quando alguém manda o link no WhatsApp.
 *
 *   node scripts/gerar-icones.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

const MADEIRA = "#2a1b11";
const LINHA = "#d9a441";
const PAPEL = "#fbf6ea";

async function icone(tamanho, destino) {
  const fundo = Buffer.from(`<svg width="${tamanho}" height="${tamanho}" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="${MADEIRA}"/></svg>`);
  const placa = await sharp("public/marca/disco.png").resize(Math.round(tamanho * 0.84)).toBuffer();
  const m = await sharp(placa).metadata();
  await sharp(fundo)
    .composite([{ input: placa, left: Math.round((tamanho - m.width) / 2), top: Math.round((tamanho - m.height) / 2) }])
    .png()
    .toFile(destino);
  console.log(destino, tamanho);
}

async function og() {
  const L = 1200, A = 630;
  const pesponto = (y) => `<g stroke="${LINHA}" stroke-width="3" stroke-dasharray="16 9"><path d="M0 ${y}H${L}"/><path d="M8 ${y + 9}H${L}"/></g>`;
  const fundo = Buffer.from(`<svg width="${L}" height="${A}">
    <style>text{font-family:"Alfa Slab One","Rockwell","Arial Black",sans-serif}</style>
    <rect width="${L}" height="${A}" fill="${MADEIRA}"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M0 ${i * 96 + 48}H${L}" stroke="rgba(255,240,210,0.07)" stroke-width="2"/>`).join("")}
    ${pesponto(40)}${pesponto(A - 52)}
    <text x="470" y="290" font-size="76" fill="${PAPEL}">Rust Country</text>
    <text x="470" y="350" font-size="30" fill="${LINHA}" font-family="Arial, sans-serif" font-style="italic">Moda country de respeito.</text>
    <text x="470" y="400" font-size="24" fill="${PAPEL}" font-family="Arial, sans-serif" opacity=".8">Calças country femininas bordadas · envio para todo o Brasil</text>
  </svg>`);
  const placa = await sharp("public/marca/disco.png").resize(340).toBuffer();
  fs.mkdirSync("public/og", { recursive: true });
  await sharp(fundo)
    .composite([{ input: placa, left: 90, top: Math.round((A - 340) / 2) }])
    .jpeg({ quality: 88 })
    .toFile("public/og/site.jpg");
  console.log("public/og/site.jpg", `${L}x${A}`);
}

await icone(512, "app/icon.png");
await icone(180, "app/apple-icon.png");
await og();
