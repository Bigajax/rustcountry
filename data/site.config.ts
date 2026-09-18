/**
 * Dados fixos do negócio. O que a dona da loja edita no dia a dia
 * (aviso do topo, frase do hero, WhatsApp) vive na tabela `config` e é
 * editável em /painel/config, não aqui.
 */

function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3150";
}

export const site = {
  nome: "Rust Country",
  marca: "Rust Country",
  /* a linha da bio, palavra por palavra */
  posicionamento: "Moda country de respeito",
  /* a bio não diz a cidade e o Google não achou a loja */
  cidade: "",
  /* a bio manda para um QR do WhatsApp (wa.me/qr/…), que não revela o
     número. Enquanto a loja não passar o número, fica vazio. */
  whatsapp: "",
  linkQr: "https://wa.me/qr/PZ3SEQKZQUJQD1",
  instagram: "lojarustcountry_",
  url: resolverUrl(),
  endereco: "",
  maps: "",
  /* o que a bio e as legendas prometem, palavra por palavra */
  entrega: "Envio para todo o Brasil",
  marcas: ["Ariat", "Texas Farm", "Big Country", "Bill Way", "Real", "Zens"],
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem. Quando a loja contratar:
 * PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544991246187",
  mensagem: "Oi! Vi a prévia da vitrine da Rust Country e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  /* frases separadas por "|": o cabeçalho reveza uma de cada vez */
  aviso_topo: "Calças country femininas bordadas | Ariat, Texas Farm, Big Country, Bill Way | Envio para todo o Brasil | Atendente pelo WhatsApp",
  frase_hero: "Moda country de respeito.",
  endereco: "",
  horario: "",
};
