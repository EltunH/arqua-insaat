export default function Home() {
  return (
    <main className="min-h-screen px-8 py-16">
      <section className="mx-auto max-w-5xl space-y-16">
        <header className="space-y-4">
          <p className="text-gold text-sm uppercase tracking-[0.25em]">
            Architecture · Interior Design · Construction
          </p>
          <h1 className="font-heading text-5xl md:text-7xl leading-none tracking-tight">
            Designing Spaces
            <br />
            Beyond Expectations
          </h1>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            We create architecture, interiors and spaces that combine aesthetics,
            functionality and timeless value.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="font-heading text-3xl">Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Swatch name="Background" value="#030f02" className="bg-background border border-border" />
            <Swatch name="Surface (proposed)" value="#0a3406" className="bg-surface" />
            <Swatch name="Elevated (proposed)" value="#0f4209" className="bg-elevated" />
            <Swatch name="Foreground" value="#ffffff" className="bg-foreground text-background" />
            <Swatch name="Muted (proposed)" value="#8c8c8c" className="bg-muted text-background" />
            <Swatch name="Subtle (proposed)" value="#5a5a5a" className="bg-subtle" />
            <Swatch name="Gold" value="#af9270" className="bg-gold text-background" />
            <Swatch name="Gold light (proposed)" value="#c4a987" className="bg-gold-light text-background" />
            <Swatch name="Gold dark (proposed)" value="#8d7457" className="bg-gold-dark" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-heading text-3xl">Typography</h2>
          <div className="space-y-4">
            <p className="font-heading text-6xl">Playfair Display — Heading</p>
            <p className="font-heading text-2xl text-muted">
              Şəkərbura, çörək, Azərbaycan dili — Cyrillic Русский язык — Türkçe çorba
            </p>
            <p className="font-body text-base">
              Inter — body text. The quick brown fox jumps over the lazy dog. 0123456789.
            </p>
            <p className="text-gold text-xs uppercase tracking-[0.25em]">
              Small uppercase label — Inter
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function Swatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`${className} rounded-md p-4 h-24 flex flex-col justify-between border border-border/30`}
    >
      <span className="text-xs uppercase tracking-wider">{name}</span>
      <span className="text-xs font-mono opacity-80">{value}</span>
    </div>
  );
}
