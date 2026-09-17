import type { Metadata } from "next";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Todas as calças country femininas bordadas da Rust Country: Ariat, Texas Farm, Big Country, Bill Way. Atendente pelo WhatsApp, envio para todo o Brasil.",
  alternates: { canonical: "/catalogo" },
};

export default async function PaginaCatalogo({ searchParams }: { searchParams: Promise<{ busca?: string }> }) {
  const [{ categorias, produtos }, config, sp] = await Promise.all([carregarCatalogo(), obterConfig(), searchParams]);

  const pecas = produtos.filter((p) => p.ativo);
  const categoriasDaLoja = categorias.filter((c) => c.ativo);

  return (
    <>
      <header className="miolo pb-6 pt-8 lg:pb-8 lg:pt-12">
        <h1 className="manchete text-[clamp(1.75rem,4vw,2.75rem)] text-tinta">Todas as calças</h1>
        <p className="voz mt-2 text-[1.125rem] text-raia">{pecas.length} calças, as mesmas do Instagram. Toca numa para montar o pedido e falar com um atendente.</p>
      </header>
      <Catalogo produtos={pecas} categorias={categoriasDaLoja} buscaInicial={sp.busca ?? ""} linkWhats={linkGeral(config.whatsapp)} />
    </>
  );
}
