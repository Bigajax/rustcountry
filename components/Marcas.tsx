import Link from "next/link";
import { site } from "@/data/site.config";
import type { Produto } from "@/lib/tipos";

/**
 * As marcas, como etiquetas de couro penduradas numa linha: as seis que
 * as legendas citam (Ariat, Texas Farm, Big Country, Bill Way, Real,
 * Zens). As que têm calça na vitrine levam para o catálogo filtrado;
 * as outras (Zens, por enquanto) ficam só na etiqueta, sem link, com
 * "sob encomenda" em vez de prometer o que não tem foto.
 */
export function Marcas({ produtos }: { produtos: Produto[] }) {
  const conta = (m: string) => produtos.filter((p) => p.ativo && p.marca === m).length;

  return (
    <section id="marcas" aria-labelledby="titulo-marcas" className="miolo scroll-mt-24 pt-14 lg:pt-20">
      <div className="regua flex-wrap gap-y-3">
        <div>
          <h2 id="titulo-marcas" className="secao">
            As marcas da casa
          </h2>
          <p className="voz mt-2 text-[1.125rem] text-raia">As melhores marcas de calça country feminina, como diz o post.</p>
          <span className="raia raia--curta mt-3" aria-hidden="true" />
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap gap-3 sm:gap-4">
        {site.marcas.map((m) => {
          const n = conta(m);
          const etiqueta = (
            <>
              <span className="couro couro--grande">{m}</span>
              <span className="mt-2 block text-[0.8125rem] text-tinta-fraca">{n ? `${n} na vitrine` : "pergunte no WhatsApp"}</span>
            </>
          );
          return (
            <li key={m} className="min-w-[8.5rem]">
              {n ? (
                <Link href={`/catalogo?busca=${encodeURIComponent(m)}`} className="group block hover:[&>.couro]:brightness-110">
                  {etiqueta}
                </Link>
              ) : (
                <div className="opacity-80">{etiqueta}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
