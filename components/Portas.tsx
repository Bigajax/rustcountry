import Image from "next/image";
import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import type { Produto } from "@/lib/tipos";

export type Porta = {
  nome: string;
  href: string;
  icone: NomeIcone;
  peca?: Produto | null;
  total: number;
  linha: string;
};

/**
 * As quatro portas da loja são os BORDADOS (caveira, penas, asteca,
 * linhas): a foto da estrela da categoria ocupa o azulejo, e por cima,
 * no pé, a faixa de madeira com o ícone, o nome em slab e quantas
 * calças tem. No hover a foto cresce e a faixa vira ferrugem. No
 * celular rolam de lado, duas por tela.
 */
export function Portas({ portas }: { portas: Porta[] }) {
  return (
    <section aria-labelledby="titulo-portas" className="miolo pt-12 lg:pt-16">
      <div className="regua flex-wrap gap-y-3">
        <div>
          <h2 id="titulo-portas" className="secao">
            Escolha pelo bordado
          </h2>
          <span className="raia raia--curta mt-3" aria-hidden="true" />
        </div>
        <Link href="/catalogo" className="btn btn--texto shrink-0">
          Ver todas
        </Link>
      </div>
      <ul className="faixa-scroll sangra mt-5 flex gap-3 overflow-x-auto pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
        {portas.map((p) => {
          const capa = p.peca?.imagens[0];
          const foco = p.peca?.foco ?? 0.5;
          return (
            <li key={p.nome} className="w-[58vw] shrink-0 sm:w-[16rem] lg:w-auto">
              <Link href={p.href} className="azulejo group">
                <span className="foto block aspect-[4/5] rounded-none">
                  {capa ? (
                    <Image src={capa.url} alt="" fill sizes="(max-width: 640px) 58vw, (max-width: 1024px) 30vw, 24vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} style={{ objectPosition: `50% ${Math.round(foco * 100)}%` }} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  ) : null}
                </span>
                <span className="azulejo-faixa">
                  <Icone nome={p.icone} className="h-7 w-7 shrink-0 text-ouro" peso={1.5} />
                  <span className="min-w-0">
                    <span className="romana block text-[1.125rem] leading-none">{p.nome}</span>
                    <span className="block text-[0.8125rem] opacity-85">
                      {p.total} {p.total === 1 ? "calça" : "calças"}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
