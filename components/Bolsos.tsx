import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

/**
 * "Escolha pelo bolso": o momento da casa. Numa loja de calça country
 * a cliente escolhe pelo bordado do bolso de trás, e é assim que a Rust
 * fotografa: o bolso de perto. Então cada calça vira o quadrado do
 * bolso, todos lado a lado sobre a madeira, sem texto por cima. O
 * `foco` de cada foto diz onde o bolso está (a foto da cavalgada tem
 * o bolso mais embaixo) e o `zoom`, nas fotos de corpo inteiro,
 * aproxima até o bolso. Quadrados iguais: 8 por fila no desktop (as
 * 16 calças fecham duas filas), 4 no tablet, 2 no celular. No hover
 * sobe a etiqueta com o nome e a marca; no toque ela fica à mostra.
 */
export function Bolsos({ produtos }: { produtos: Produto[] }) {
  const comFoto = produtos.filter((p) => p.imagens[0]);
  if (comFoto.length < 6) return null;

  return (
    <section id="bolsos" aria-labelledby="titulo-bolsos" className="mt-14 scroll-mt-24 lg:mt-20">
      <div className="miolo">
        <div className="regua flex-wrap gap-y-3">
          <div>
            <h2 id="titulo-bolsos" className="secao">
              Escolha pelo bolso
            </h2>
            <p className="voz mt-2 text-[1.125rem] text-raia">O bordado de trás é o que a cliente olha primeiro. Aqui estão os {comFoto.length}, de perto.</p>
            <span className="raia raia--curta mt-3" aria-hidden="true" />
          </div>
          <Link href="/catalogo" className="btn btn--texto shrink-0">
            Ver as calças inteiras
          </Link>
        </div>
      </div>

      <ul className="bolsos mt-6 lg:mx-[var(--sangria)] lg:rounded-[var(--raio)]">
        {comFoto.map((p) => {
          const capa = p.imagens[0];
          const foco = p.foco ?? 0.5;
          return (
            <li key={p.id}>
              <Link href={`/produto/${p.slug}`} className="bolso" aria-label={`${p.nome}${p.marca ? `, ${p.marca}` : ""}`}>
                <span className="bolso-zoom" style={{ "--zoom": p.zoom ?? 1, "--foco": `${Math.round(foco * 100)}%` } as React.CSSProperties}>
                  <Image src={capa.url} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} style={{ objectPosition: `50% ${Math.round(foco * 100)}%` }} className="object-cover" />
                </span>
                <span className="bolso-nome" aria-hidden="true">
                  <span className="min-w-0 truncate">{p.nome.replace(/^Calça /, "")}</span>
                  {p.marca ? <span className="shrink-0 text-[0.6875rem] font-bold text-ouro">{p.marca}</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
