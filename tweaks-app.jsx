// Optiiimum Tweaks panel — brand gradient palette, hero variant, font pairing.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "signature",
  "fontPair": "inter-instrument",
  "heroVariant": "showreel"
}/*EDITMODE-END*/;

const PALETTES = {
  signature: { label: "Signature",  stops: ["#ffd07a","#ffa48c","#ff4fa3","#9a6fff","#5cd1ff","#c9b6ff"] },
  sunset:    { label: "Sunset",     stops: ["#fff1a8","#ffb37a","#ff6b6b","#c63b8b","#7b3ad6","#3a2a8c"] },
  citrus:    { label: "Citrus",     stops: ["#fffd86","#d6ff3f","#7af0a8","#3ad6c6","#5cd1ff","#9a6fff"] },
  monochrome:{ label: "Mono",       stops: ["#f2f2f2","#cfcfcf","#9a9a9a","#5e5e5e","#2e2e2e","#0a0a0a"] },
};

const FONT_PAIRS = {
  "inter-instrument": {
    label: "Inter + Instrument Serif",
    sans: "Inter, system-ui, sans-serif",
    serif: "\"Instrument Serif\", Georgia, serif",
  },
  "manrope-fraunces": {
    label: "Manrope + Fraunces",
    sans: "Manrope, system-ui, sans-serif",
    serif: "Fraunces, Georgia, serif",
  },
  "inter-mono": {
    label: "Inter + JetBrains Mono",
    sans: "Inter, system-ui, sans-serif",
    serif: "\"JetBrains Mono\", ui-monospace, monospace",
  },
};

function applyTweaks(t){
  const root = document.documentElement;
  const pal = PALETTES[t.palette] || PALETTES.signature;
  const [g1,g2,g3,g4,g5,g6] = pal.stops;
  root.style.setProperty('--g1', g1);
  root.style.setProperty('--g2', g2);
  root.style.setProperty('--g3', g3);
  root.style.setProperty('--g4', g4);
  root.style.setProperty('--g5', g5);
  root.style.setProperty('--g6', g6);
  root.style.setProperty('--accent', g3);
  root.style.setProperty('--accent-2', g5);
  root.style.setProperty('--grad-brand', `linear-gradient(115deg, ${g1} 0%, ${g2} 22%, ${g3} 48%, ${g4} 68%, ${g5} 86%, ${g6} 100%)`);

  const pair = FONT_PAIRS[t.fontPair] || FONT_PAIRS["inter-instrument"];
  root.style.setProperty('--sans', pair.sans);
  root.style.setProperty('--serif', pair.serif);

  // Hero variant (only on home, only if elements exist)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.dataset.variant = t.heroVariant;
    const reel = document.querySelector('.reel');
    const headline = document.querySelector('.hero-headline');
    if (reel && headline) {
      if (t.heroVariant === "split") {
        reel.style.aspectRatio = "16/9";
        headline.style.fontSize = "clamp(48px,8vw,128px)";
      } else if (t.heroVariant === "stacked") {
        reel.style.aspectRatio = "21/6";
        headline.style.fontSize = "clamp(64px,14vw,220px)";
      } else {
        reel.style.aspectRatio = "16/7";
        headline.style.fontSize = "";
      }
    }
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t.palette, t.fontPair, t.heroVariant]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand gradient" />
      <TweakSelect
        label="Palette"
        value={t.palette}
        options={Object.entries(PALETTES).map(([k,v]) => ({ value:k, label:v.label }))}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Typography" />
      <TweakSelect
        label="Font pairing"
        value={t.fontPair}
        options={Object.entries(FONT_PAIRS).map(([k,v]) => ({ value:k, label:v.label }))}
        onChange={(v) => setTweak('fontPair', v)}
      />

      <TweakSection label="Hero" />
      <TweakRadio
        label="Layout"
        value={t.heroVariant}
        options={[
          { value: "showreel", label: "Reel" },
          { value: "split",    label: "Split" },
          { value: "stacked",  label: "Stack" },
        ]}
        onChange={(v) => setTweak('heroVariant', v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
