import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * As garantias: três placas de kraft claro logo abaixo do hero. Só o
 * que a bio e as legendas prometem, palavra por palavra: envio para
 * todo o Brasil, as melhores marcas de calça country feminina, e um
 * atendente pelo WhatsApp.
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string; href: string; externa?: boolean }[] = [
  { icone: "caminhao", titulo: site.entrega, texto: "frete combinado no pedido", href: "/#pedido" },
  { icone: "etiqueta", titulo: "As melhores marcas", texto: site.marcas.join(", "), href: "/#marcas" },
  { icone: "conversa", titulo: "Atendente pelo WhatsApp", texto: "tamanho, valor e envio na conversa", href: "", externa: true },
];

export function Garantias({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-label="Como a loja funciona" className="miolo relative z-10 pt-6 lg:pt-8">
      <ul className="garantias sangra faixa-scroll lg:!mx-0 lg:!grid-cols-3">
        {ITENS.map((i) => {
          const href = i.href || linkWhats;
          const conteudo = (
            <>
              <span className="garantia-icone">
                <Icone nome={i.icone} className="h-7 w-7" peso={1.4} />
              </span>
              <span className="min-w-0">
                <span className="garantia-titulo">{i.titulo}</span>
                <span className="block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
              </span>
            </>
          );
          return (
            <li key={i.titulo}>
              {i.externa ? (
                <a href={href} target="_blank" rel="noreferrer" className="garantia">
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className="garantia">
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
