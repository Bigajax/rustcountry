import Image from "next/image";

/**
 * A marca é a placa de verdade: o disco de ferrugem do avatar do
 * Instagram (chapéu, RUST COUNTRY, estrelas e ferradura), recortado em
 * círculo com alfa (`public/marca/disco.png`, 454px). Ela é laranja e
 * preta e funciona sobre a madeira, o denim e o kraft; por isso entra
 * como imagem, não como máscara. Ao lado, o nome em slab na cor do
 * texto, para o cabeçalho.
 */
export function Placa({ altura, className = "", priority = false }: { altura: number; className?: string; priority?: boolean }) {
  return <Image src="/marca/disco.png" alt="Rust Country" width={altura} height={altura} priority={priority} className={`shrink-0 rounded-full ${className}`} />;
}

export function Logo({ className = "", altura = 44, nome = true }: { className?: string; altura?: number; nome?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Placa altura={altura} priority />
      {nome ? (
        <span className="romana leading-none" style={{ fontSize: altura * 0.42 }} aria-hidden="true">
          Rust Country
        </span>
      ) : null}
    </span>
  );
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
