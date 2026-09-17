import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { Placa } from "./Marca";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura, no denim: à esquerda a placa da logo (o disco de
 * ferrugem, como na porta da loja), a manchete em slab (a linha da
 * bio, "moda country de respeito"), a linha de apoio com as marcas e
 * o envio, e os dois botões. À direita, a foto da cavalgada em pé, com
 * a etiqueta de couro da marca costurada no canto. O pesponto dourado
 * atravessa o pé do hero: é a costura do bolso, em tamanho de página.
 */
export function Hero({ frase, estrelas, linkWhats, totais }: { frase: string; estrelas: Produto[]; linkWhats: string; totais: { produtos: number; marcas: number } }) {
  const principal = estrelas.find((p) => p.slug.includes("caveira-rosa")) ?? estrelas[0];
  const capa = principal?.imagens[0];

  return (
    <section aria-labelledby="titulo-hero" className="agua relative">
      <div className="miolo relative grid gap-10 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:py-16">
        <div className="hero-texto">
          <div className="hero-placa inline-flex items-center gap-4">
            <Placa altura={88} priority className="lg:!h-[112px] lg:!w-[112px]" />
            <p className="max-w-[18ch] text-[0.9375rem] text-marfim-fraco">Calças country femininas bordadas, com envio para todo o Brasil</p>
          </div>
          <h1 id="titulo-hero" className="manchete mt-6 max-w-[12ch] text-[clamp(2.5rem,8.5vw,3.75rem)] text-branco lg:text-[clamp(3.25rem,5.4vw,5.25rem)]">
            {frase}
          </h1>
          <p className="falada mt-6 max-w-[40ch] text-[1.0625rem] text-white/85 lg:text-[1.125rem]">
            {totais.produtos} calças de {totais.marcas} marcas: Ariat, Texas Farm, Big Country, Bill Way. Caveira longhorn, penas, asteca ou pesponto colorido no bolso de trás. Escolhe aqui, fala com um atendente pelo WhatsApp, e chega em qualquer canto do Brasil.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#bolsos" className="btn btn--raia">
              Escolher pelo bolso
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--placa-fio">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Falar com um atendente
            </a>
          </div>
        </div>

        {principal && capa ? (
          <Link href={`/produto/${principal.slug}`} className="hero-foto group relative block lg:w-[min(100%,28rem)] lg:justify-self-end">
            <span className="foto block aspect-[4/5] rounded-[var(--raio)] bg-[var(--agua-clara)]">
              <Image src={capa.url} alt={capa.alt ?? principal.nome} fill priority sizes="(max-width: 1024px) 100vw, 28rem" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              {principal.marca ? <span className="couro absolute left-4 top-4 z-[1]">{principal.marca}</span> : null}
            </span>
            <span className="mt-3 flex items-center justify-between gap-3 text-[0.9375rem] text-marfim-fraco">
              <span>
                Na foto: <span className="font-bold text-branco group-hover:underline group-hover:decoration-white group-hover:underline-offset-4">{principal.nome}</span>
              </span>
              <Icone nome="seta" className="h-5 w-5 shrink-0 text-branco" peso={2} />
            </span>
          </Link>
        ) : null}
      </div>
      <span className="pesponto absolute bottom-3 left-0 right-0 [--ponto:14px] [--vao:8px]" aria-hidden="true" />
    </section>
  );
}
