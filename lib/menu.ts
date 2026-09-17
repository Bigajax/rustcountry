import type { Produto } from "./tipos";
import { site } from "@/data/site.config";

/**
 * O menu das portas, montado do catálogo: cada porta do cabeçalho abre
 * uma aba ao passar o mouse, e o que está na aba vem dos produtos (os
 * atalhos só aparecem se acham algo) e do WhatsApp. Assim a aba nunca
 * promete o que a vitrine não tem. As portas são os BORDADOS, porque é
 * o bordado do bolso que a cliente escolhe; a marca é filtro.
 */
export type NomeIconeMenu = "caveira" | "pena" | "asteca" | "pesponto" | "chapeu" | "bota" | "ferradura" | "calca" | "etiqueta" | "conversa" | "caminhao";

export type ItemMenu = {
  nome: string;
  href: string;
  icone?: NomeIconeMenu;
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: NomeIconeMenu;
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
  total?: number;
  nota?: string;
};

export const PORTAS: { slug: string; nome: string; tudo: string; icone: NomeIconeMenu; linha: string; atalhos: string[] }[] = [
  { slug: "caveira-longhorn", nome: "Caveira longhorn", tudo: "Todas as caveiras", icone: "caveira", linha: "o crânio de chifres no bolso, em rosa, branco ou com flores", atalhos: ["Texas Farm", "Ariat"] },
  { slug: "penas", nome: "Penas", tudo: "Todas as penas", icone: "pena", linha: "penas coloridas descendo do bolso", atalhos: [] },
  { slug: "asteca", nome: "Asteca", tudo: "Todas as astecas", icone: "asteca", linha: "losangos em dourado e branco", atalhos: ["Ariat", "Real"] },
  { slug: "linhas-e-riscos", nome: "Linhas e riscos", tudo: "Todas as de linhas", icone: "pesponto", linha: "chevron, contornos, triângulos e pespontos coloridos", atalhos: ["Ariat", "Big Country", "Bill Way", "Texas Farm"] },
];

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;
  const busca = (cat: string, termo: string) => `/catalogo/${cat}?busca=${encodeURIComponent(termo)}`;
  const existe = (cat: string, termo: string) => ativos.some((p) => p.categoria_slug === cat && `${p.nome} ${p.marca ?? ""}`.toLowerCase().includes(termo.toLowerCase()));

  return [
    ...PORTAS.map((porta): Aba => {
      const total = conta(porta.slug);
      return {
        chave: porta.slug,
        nome: porta.nome,
        href: `/catalogo/${porta.slug}`,
        icone: porta.icone,
        total,
        titulo: `${total} ${total === 1 ? "calça" : "calças"}: ${porta.linha}`,
        colunas: 2,
        itens: [
          ...porta.atalhos.filter((t) => existe(porta.slug, t)).map((t) => ({ nome: t, href: busca(porta.slug, t) })),
          { nome: porta.tudo, href: `/catalogo/${porta.slug}`, icone: porta.icone },
        ],
      };
    }),
    {
      chave: "marcas",
      nome: "Marcas",
      href: "/#marcas",
      icone: "etiqueta",
      nota: site.marcas.slice(0, 3).join(", "),
      colunas: 2,
      itens: [
        ...site.marcas.filter((m) => ativos.some((p) => p.marca === m)).map((m) => ({ nome: m, href: `/catalogo?busca=${encodeURIComponent(m)}`, nota: `${ativos.filter((p) => p.marca === m).length} na vitrine` })),
        { nome: "Todas as marcas", href: "/#marcas", icone: "etiqueta" },
      ],
    },
    {
      chave: "pedido",
      nome: "Como pedir",
      href: "/#pedido",
      icone: "conversa",
      nota: "pelo WhatsApp",
      colunas: 1,
      itens: [
        { nome: "Falar com um atendente", href: linkWhats, icone: "conversa", nota: "tamanho, valor e envio", externa: true },
        { nome: site.entrega, href: "/#pedido", icone: "caminhao", nota: "combinado no pedido" },
        { nome: "Escolher pelo bolso", href: "/#bolsos", icone: "calca", nota: "os 16 bolsos lado a lado" },
      ],
    },
  ];
}
