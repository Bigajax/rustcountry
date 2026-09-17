import { Bolsos } from "@/components/Bolsos";
import { FaixaWhats } from "@/components/FaixaWhats";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Marcas } from "@/components/Marcas";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { PORTAS as PORTAS_MENU } from "@/lib/menu";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao, site } from "@/data/site.config";

/* a ordem e a cara das portas na home */
const PORTAS = PORTAS_MENU.map((p) => ({ slug: p.slug, nome: p.nome, icone: p.icone, linha: p.linha }));

/**
 * A home: o hero no denim com a placa e a foto da cavalgada, as três
 * garantias da bio, as quatro portas (os bordados), "escolha pelo
 * bolso" (o momento da casa: os 16 bolsos de perto sobre a madeira),
 * os lançamentos em cartão, as marcas em etiqueta de couro e a faixa
 * do pedido. Tudo montado do catálogo.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);
  const marcas = new Set(ativos.map((p) => p.marca).filter(Boolean));

  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 8);
  const estrelaDe = (slug: string) => destaques.find((p) => p.categoria_slug === slug && !p.zoom) ?? destaques.find((p) => p.categoria_slug === slug) ?? da(slug)[0] ?? null;

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} totais={{ produtos: ativos.length, marcas: marcas.size }} />

      <Garantias linkWhats={whats} />

      <Portas portas={PORTAS.map((p) => ({ nome: p.nome, href: `/catalogo/${p.slug}`, icone: p.icone, peca: estrelaDe(p.slug), total: da(p.slug).length, linha: p.linha }))} />

      <Bolsos produtos={ativos} />

      <Prateleira id="lancamentos" titulo="Os lançamentos" subtitulo="As que o post chamou de lançamento, com a foto inteira" href="/catalogo" verTudo="Ver todas as calças" produtos={destaques} categorias={porSlug} prioridade total={ativos.length} nomeDaPorta="calças" feminino limite={4} />

      <Marcas produtos={ativos} />

      <FaixaWhats linkWhats={whats} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Rust Country",
            url: site.url,
            areaServed: "BR",
            brand: site.marcas.map((m) => ({ "@type": "Brand", name: m })),
          }),
        }}
      />
    </>
  );
}
