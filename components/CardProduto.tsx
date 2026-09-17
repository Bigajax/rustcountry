import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { linkPeca } from "@/lib/whatsapp";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão da calça: a foto em pé sobre o kraft claro, a etiqueta de
 * couro com a marca costurada no canto da foto (quando a marca é
 * conhecida), a costura dourada separando foto e texto, o bordado em
 * uma linha, o nome em slab e o botão "Falar com um atendente" preso
 * no pé, com a mensagem já montada. Sem preço no Instagram, sem preço
 * aqui: é o atendente que passa o valor.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigenteNumero = produto.preco_promocional ?? produto.preco;
  const vigente = precoBRL(vigenteNumero);
  const href = `/produto/${produto.slug}`;
  const pedir = linkPeca(produto, { preco: vigenteNumero ?? null });
  const foco = produto.foco ?? 0.5;

  return (
    <article className="peca group">
      <Link href={href} className="peca-foto" aria-label={produto.nome}>
        {produto.marca ? <span className="couro absolute left-3 top-3 z-[2]">{produto.marca}</span> : null}
        {vigente ? (
          <span className="placa-etiqueta absolute right-3 top-3 z-[2] !flex items-baseline gap-2">
            <span className="preco text-[1rem]">{vigente}</span>
            {promo && cheio ? <span className="text-[0.75rem] font-normal line-through opacity-70">{cheio}</span> : null}
          </span>
        ) : null}
        {capa ? (
          <Image src={capa.url} alt={capa.alt ?? produto.nome} fill sizes={tamanhos} placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} priority={prioridade} style={{ objectPosition: `50% ${Math.round(foco * 100)}%` }} className="object-cover" />
        ) : null}
      </Link>
      <span className="pesponto peca-costura mt-3" aria-hidden="true" />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
        <p className="min-h-[1.25rem] truncate text-[0.8125rem] text-tinta-fraca">{produto.bordado ?? categoria?.nome ?? ""}</p>
        <h3 className="titulo-cartao mt-1 line-clamp-2 min-h-[2.5em] text-tinta">
          <Link href={href} className="hover:text-raia">
            {produto.nome}
          </Link>
        </h3>
        <p className="mt-1 min-h-[1.25rem] truncate text-[0.8125rem] text-tinta-fraca">{produto.linha ?? (vigente ? "Em até 3x sem juros" : "Tamanho e valor na conversa")}</p>

        <div className="mt-auto pt-3">
          <a href={pedir} target="_blank" rel="noreferrer" className="btn btn--raia btn--pequeno w-full !px-3">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem] shrink-0" />
            <span className="sm:hidden">Pedir</span>
            <span className="hidden sm:inline">Pedir no WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
