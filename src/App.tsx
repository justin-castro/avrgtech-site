import * as React from "react"
import GlassFolder, { ArtCanvas, type ArtRecipe } from "@/components/ui/glass-folder-cards"
import { ADS, CLAY, CLAY_LIGHT, COUNTS, COZY, DELIVERABLES, FOLDERS, LEADS, LINKS, SOCIAL, WORK } from "@/content"

const ADDRESS = "avrg.tech@gmail.com"
const BLANK = "(not set)"
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Folder width that keeps the hero on one desktop screen and scrolls sideways on phones. */
function useFolderWidth() {
  const pick = () => {
    if (typeof window === "undefined") return 300
    const w = window.innerWidth
    const h = window.innerHeight
    if (w <= 820) return Math.min(280, Math.round(w * 0.72))
    const byHeight = Math.round(((h - 520) / 326) * 340)
    return Math.max(220, Math.min(300, byHeight, Math.round((w - 160) / 3.4)))
  }
  const [width, setWidth] = React.useState(pick)
  React.useEffect(() => {
    const on = () => setWidth(pick())
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return width
}

function ArtField({ art, seed, w, h, density = 0.6 }: { art: ArtRecipe; seed: number; w: number; h: number; density?: number }) {
  return (
    <div className="art-field" aria-hidden="true">
      <ArtCanvas art={art} seed={seed} w={w} h={h} density={density} priority={2} />
    </div>
  )
}

const Dot = () => <span className="dot">.</span>

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

type Brief = {
  brand: string
  name: string
  product: string
  email: string
  when: string
  notes: string
  deliverables: string[]
  lead: string
  ads: string
}

export default function App() {
  const folderWidth = useFolderWidth()
  const foldersRef = React.useRef<HTMLDivElement>(null)

  // Reel links leave the site, so open them in a new tab.
  React.useEffect(() => {
    foldersRef.current?.querySelectorAll<HTMLAnchorElement>("a.gf-sheet").forEach((a) => {
      a.target = "_blank"
      a.rel = "noopener"
    })
  })

  const [brief, setBrief] = React.useState<Brief>({
    brand: "",
    name: "",
    product: "",
    email: "",
    when: "",
    notes: "",
    deliverables: [...SOCIAL],
    lead: "Brief-led",
    ads: "30 days, one platform",
  })
  const set = (patch: Partial<Brief>) => setBrief((b) => ({ ...b, ...patch }))
  const toggle = (value: string) =>
    set({
      deliverables: brief.deliverables.includes(value)
        ? brief.deliverables.filter((d) => d !== value)
        : [...brief.deliverables, value],
    })

  const text = React.useMemo(() => {
    const lines = [
      "Brand: " + (brief.brand.trim() || BLANK),
      "Contact: " + ([brief.name.trim(), brief.email.trim()].filter(Boolean).join(", ") || BLANK),
      "Product: " + (brief.product.trim() || BLANK),
      "Deliverables: " + (brief.deliverables.length ? DELIVERABLES.filter((d) => brief.deliverables.includes(d)).join(", ") : BLANK),
      "Who leads: " + brief.lead,
      "Ads on the post: " + brief.ads,
      "Go-live: " + (brief.when.trim() || BLANK),
    ]
    if (brief.notes.trim()) lines.push("", "Notes: " + brief.notes.trim())
    return "Hi Justin,\n\nWe would like to work with avrgtech. Here is our brief:\n\n" + lines.join("\n") + "\n\nPlease send scope and rates."
  }, [brief])

  const subject = "Campaign brief: " + (brief.brand.trim() || "new brand") + (brief.product.trim() ? " x " + brief.product.trim() : "")
  const mailto = "mailto:" + ADDRESS + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text)

  const [status, setStatus] = React.useState("")
  const outRef = React.useRef<HTMLPreElement>(null)
  const copy = () => {
    const fallback = () => {
      const range = document.createRange()
      if (outRef.current) range.selectNodeContents(outRef.current)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
      setStatus("Brief selected. Press Ctrl+C or Cmd+C to copy it.")
    }
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => setStatus("Brief copied. Paste it into an email to " + ADDRESS + "."), fallback)
      } else fallback()
    } catch {
      fallback()
    }
  }

  // Hero starter bar
  const [starterProduct, setStarterProduct] = React.useState("")
  const [starterPicks, setStarterPicks] = React.useState<string[]>(["sponsored"])
  const brandRef = React.useRef<HTMLInputElement>(null)
  const startBrief = (e: React.FormEvent) => {
    e.preventDefault()
    const keep = brief.deliverables.filter((d) => !SOCIAL.includes(d) && d !== "UGC for our channels" && d !== "Local business video")
    const picked = [
      ...(starterPicks.includes("sponsored") ? SOCIAL : []),
      ...starterPicks.filter((p) => p !== "sponsored"),
    ]
    set({ product: starterProduct.trim() || brief.product, deliverables: [...picked, ...keep] })
    document.getElementById("book")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" })
    window.setTimeout(() => brandRef.current?.focus({ preventScroll: true }), 400)
  }
  const starterToggle = (v: string) =>
    setStarterPicks((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))

  return (
    <>
      <header className="top">
        <div className="wrap">
          <nav className="nav" aria-label="Main">
            <a className="mark" href="#">
              avrg<b>tech</b>
            </a>
            <ul>
              <li className="hide-sm"><a href="#work">Work</a></li>
              <li className="hide-sm"><a href="#formats">Formats</a></li>
              <li className="hide-sm"><a href="#watch">Watch</a></li>
              <li><a className="pill" href="#book">Start a campaign</a></li>
            </ul>
          </nav>

          <div className="hero">
            <div className="hero-head">
              <h1>
                Your product, on the<br className="br-lg" /> <em>setup people want<Dot /></em>
              </h1>
              <p className="hero-lead">
                Cinematic tech and desk-setup videos, made in-house from concept to final cut. Sponsored posts, UGC and local
                business video, <strong>for brands that care how their product looks.</strong>
              </p>
            </div>

            <div className="folders" ref={foldersRef} aria-label="avrgtech reels, grouped in folders">
              {FOLDERS.map((f, i) => (
                <GlassFolder
                  key={f.label}
                  label={f.label}
                  meta={f.meta}
                  tone="dark"
                  art="none"
                  seed={f.seed}
                  files={f.files}
                  action="none"
                  labelPlacement="bottom-left"
                  width={folderWidth}
                  appearDelay={i * 140}
                />
              ))}
            </div>
            <p className="label folder-hint">Open a folder to see the reels</p>
          </div>
        </div>

        <div className="starter">
          <div className="wrap">
            <form onSubmit={startBrief} aria-label="Start a campaign">
              <span className="label">Start a campaign</span>
              <input
                className="field"
                type="text"
                placeholder="What are you launching?"
                autoComplete="off"
                aria-label="Product you are launching"
                value={starterProduct}
                onChange={(e) => setStarterProduct(e.target.value)}
              />
              <div className="chips" role="group" aria-label="What you need">
                {[
                  { v: "sponsored", l: "Sponsored post" },
                  { v: "UGC for our channels", l: "UGC" },
                  { v: "Local business video", l: "Local video" },
                ].map((c) => (
                  <label className="chip" key={c.v}>
                    <input type="checkbox" checked={starterPicks.includes(c.v)} onChange={() => starterToggle(c.v)} />
                    <span>{c.l}</span>
                  </label>
                ))}
              </div>
              <button className="btn btn-primary" type="submit">Build the brief</button>
            </form>
          </div>
        </div>
      </header>

      <main>
        <section id="reach" aria-labelledby="reach-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="reach-title">An audience that's already watching<Dot /></h2>
              <p>People follow avrgtech for calm desk mornings, coffee and the gear on the desk. The most-played reel passed 304K plays.</p>
            </div>
            <div className="counts">
              {COUNTS.map((c) => (
                <div className="count" key={c.label}>
                  <b>{c.n}</b>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
            <p className="label source">Plays as shown on Instagram, October 2026</p>
          </div>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="work-title">Recent product videos<Dot /></h2>
              <p>PC builds, cases, monitors and desk audio, filmed on the same desk the audience already knows. Tap any video to watch it where it was posted.</p>
            </div>
            <div className="work-row">
              {WORK.map((w) => (
                <article className="tile" key={w.title}>
                  <a href={`https://www.instagram.com/reel/${w.ig}/`} target="_blank" rel="noopener" aria-label={"Watch the " + w.title + " video on Instagram"}>
                    <img src={w.img} alt={w.alt} loading="lazy" width={203} height={360} />
                  </a>
                  <div className="cap glass">
                    <h3>{w.title}</h3>
                    <div className="meta label">
                      <span>{w.date}</span>
                      {w.short ? (
                        <a href={`https://www.youtube.com/shorts/${w.short}`} target="_blank" rel="noopener">
                          Short
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="formats" aria-labelledby="formats-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="formats-title">Pick who leads the creative<Dot /></h2>
              <p>Every video is filmed and edited by avrgtech. Rates come back with your brief, sized to the campaign you describe.</p>
            </div>
            <div className="lead-choice">
              <article className="choice dark">
                <ArtField art={CLAY} seed={31} w={900} h={460} density={0.7} />
                <div className="pane glass">
                  <h3>Built to your brief<Dot /></h3>
                  <p>Your talking points, script approval and direction. Includes 30 days of ads on the published post, on the platform you choose.</p>
                </div>
              </article>
              <article className="choice light">
                <ArtField art={CLAY_LIGHT} seed={8} w={900} h={460} density={0.7} />
                <div className="pane glass">
                  <h3>avrgtech's idea, your product<Dot /></h3>
                  <p>avrgtech's own concept and edit, with your key features worked in naturally. One round of changes, organic post.</p>
                </div>
              </article>
            </div>
            <div className="formats">
              <div className="panel">
                <h3>Formats</h3>
                {[
                  ["Reel + TikTok + YouTube Short", "One video, cut for all three feeds", "Most reach"],
                  ["Dedicated YouTube video", "8 to 12 minutes"],
                  ["YouTube integration", "A product segment inside a video"],
                  ["Instagram Reel or feed post", "Single platform"],
                  ["Instagram and TikTok Stories", "With a link to your product"],
                  ["UGC for your channels", "Filmed by avrgtech, posted and run by your brand"],
                  ["Local business video", "Your shop, space or product, filmed in the same cinematic style"],
                ].map(([t, s, tag]) => (
                  <div className="row" key={t}>
                    <div>
                      <strong>{t}</strong>
                      <small>{s}</small>
                    </div>
                    {tag ? <span className="label">{tag}</span> : null}
                  </div>
                ))}
              </div>
              <div className="panel">
                <h3>Add to any campaign</h3>
                {[
                  ["Longer ad windows", "30 days to 12 months, on every platform in the package"],
                  ["Organic reposting", "Share the video on your brand's channels"],
                  ["Category exclusivity", "No competing brands for a set window"],
                  ["Product photos", "Stills shot on the same set"],
                ].map(([t, s]) => (
                  <div className="row" key={t}>
                    <div>
                      <strong>{t}</strong>
                      <small>{s}</small>
                    </div>
                  </div>
                ))}
                <p className="note">
                  <strong>How ads run:</strong> your team runs the published @avrgtech post from your own ad account, as an Instagram
                  Partnership Ad, a TikTok Spark Code or a YouTube ad.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="book" aria-labelledby="book-title">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="book-title">Build your brief<Dot /></h2>
              <p>Answer a few questions and the brief writes itself. Send it to avrgtech and you'll get scope and rates back.</p>
            </div>
            <div className="book-grid">
              <form className="brief-form" noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="pair">
                  <div className="group">
                    <label className="label" htmlFor="b-brand">Brand</label>
                    <input ref={brandRef} className="field" id="b-brand" type="text" autoComplete="organization" placeholder="Your brand" value={brief.brand} onChange={(e) => set({ brand: e.target.value })} />
                  </div>
                  <div className="group">
                    <label className="label" htmlFor="b-name">Your name</label>
                    <input className="field" id="b-name" type="text" autoComplete="name" placeholder="Name" value={brief.name} onChange={(e) => set({ name: e.target.value })} />
                  </div>
                </div>
                <div className="group">
                  <label className="label" htmlFor="b-product">Product</label>
                  <input className="field" id="b-product" type="text" placeholder="What are you launching?" value={brief.product} onChange={(e) => set({ product: e.target.value })} />
                </div>
                <fieldset className="group">
                  <legend className="label">What you need</legend>
                  <div className="chips">
                    {DELIVERABLES.map((d) => (
                      <label className="chip" key={d}>
                        <input type="checkbox" checked={brief.deliverables.includes(d)} onChange={() => toggle(d)} />
                        <span>{d === "UGC for our channels" ? "UGC" : d === "Dedicated YouTube video" ? "YouTube video" : d}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="group">
                  <legend className="label">Who leads</legend>
                  <div className="chips">
                    {LEADS.map((l) => (
                      <label className="chip" key={l}>
                        <input type="radio" name="lead" checked={brief.lead === l} onChange={() => set({ lead: l })} />
                        <span>{l}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="group">
                  <legend className="label">Ads on the post</legend>
                  <div className="chips">
                    {ADS.map((a) => (
                      <label className="chip" key={a.value}>
                        <input type="radio" name="ads" checked={brief.ads === a.value} onChange={() => set({ ads: a.value })} />
                        <span>{a.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="pair">
                  <div className="group">
                    <label className="label" htmlFor="b-when">Go-live date</label>
                    <input className="field" id="b-when" type="text" placeholder="e.g. mid November" value={brief.when} onChange={(e) => set({ when: e.target.value })} />
                  </div>
                  <div className="group">
                    <label className="label" htmlFor="b-email">Your email</label>
                    <input className="field" id="b-email" type="email" autoComplete="email" placeholder="you@brand.com" value={brief.email} onChange={(e) => set({ email: e.target.value })} />
                  </div>
                </div>
                <div className="group">
                  <label className="label" htmlFor="b-notes">Anything else</label>
                  <textarea className="field" id="b-notes" placeholder="Key features, exclusivity, reposting, product photos..." value={brief.notes} onChange={(e) => set({ notes: e.target.value })} />
                </div>
              </form>

              <aside className="output" aria-labelledby="out-title">
                <span className="label" id="out-title">Your brief</span>
                <pre ref={outRef} aria-live="polite">{text}</pre>
                <div className="actions">
                  <a className="btn btn-primary" href={mailto} onClick={() => setStatus("If your email app did not open, copy the brief and send it to " + ADDRESS + ".")}>
                    Email the brief
                  </a>
                  <button className="btn btn-ghost" type="button" onClick={copy}>Copy brief</button>
                </div>
                <p className="status" role="status">{status}</p>
                <div className="contact">
                  <strong>Justin, Creator &amp; Owner</strong>
                  <span className="addr">{ADDRESS}</span>
                </div>
                <ul className="terms">
                  <li>Payment is due 14 days after the post goes live. Transfer fees are covered by the brand.</li>
                  <li>Product needed for the video is supplied by the brand.</li>
                  <li>Ads run on the original published video. No raw footage or edits.</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="watch" aria-labelledby="watch-title">
          <div className="wrap">
            <div className="watch-grid">
              <div>
                <div className="sec-head">
                  <h2 id="watch-title">Here for the setups?</h2>
                  <p>Calm desk mornings, PC builds and the gear on the desk. Follow along wherever you watch.</p>
                </div>
                <div className="links">
                  {LINKS.map((l) => (
                    <a key={l.name} href={l.href} target="_blank" rel="noopener">
                      <span>
                        <strong>{l.name}</strong>
                        <small>{l.sub}</small>
                      </span>
                      <Arrow />
                    </a>
                  ))}
                </div>
              </div>
              <div className="cozy">
                {COZY.map((c) => (
                  <a className="reel" key={c.caption} href={c.href} target="_blank" rel="noopener">
                    <figure>
                      <img src={c.img} alt={c.alt} loading="lazy" width={203} height={360} />
                    </figure>
                    <p>{c.caption}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <a className="mark" href="#">
            avrg<b>tech</b>
          </a>
          <span className="label">Partnerships: {ADDRESS}</span>
        </div>
      </footer>
    </>
  )
}
