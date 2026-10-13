import type { ArtRecipe, FolderFile } from "@/components/ui/glass-folder-cards"

const R = "/assets/reels/"
const ig = (code: string) => `https://www.instagram.com/reel/${code}/`

/** Clay marble: the brand orange folding through the warm slab. */
export const CLAY: ArtRecipe = {
  style: "marble",
  colors: ["#0b0908", "#1c1612", "#3b2a1f", "#7a3f20", "#d87943", "#f0a072", "#f5efe9"],
  scale: 0.66,
  warp: 3.2,
  angle: -0.5,
  gloss: 0.5,
  veins: 0.45,
}

/** A pale long exposure of the same palette, for light glass. */
export const CLAY_LIGHT: ArtRecipe = {
  style: "streak",
  colors: ["#f5efe9", "#efd5c0", "#e0a37c", "#d87943", "#5a4637", "#e9ddd2", "#f4f4f2"],
  scale: 0.7,
  warp: 1.5,
  angle: -0.6,
  gloss: 0.22,
  veins: 0,
}

export type Folder = { label: string; meta: string; seed: number; files: FolderFile[] }

// Files are listed back to front: the last one sits nearest the glass.
export const FOLDERS: Folder[] = [
  {
    label: "Desk mornings",
    meta: "Up to 304.2K plays",
    seed: 4,
    files: [
      { name: "Cruise and coffee", meta: "4.2K plays", image: R + "cruise-coffee.jpg", href: ig("Dcrcum-pZ1O") },
      { name: "Limit distractions", meta: "113.9K plays", image: R + "limit-distractions.jpg", href: ig("DB37zfxuWTs") },
      { name: "Coffee and Witchfire", meta: "304.2K plays", image: R + "witchfire-desk.jpg", href: ig("DAlWrrfuwZU") },
    ],
  },
  {
    label: "Product videos",
    meta: "Corsair, MSI, ASUS",
    seed: 9,
    files: [
      { name: "ASUS Prime RX 9070 EVO", meta: "3.9K plays", image: R + "asus-prime-rx9070.jpg", href: ig("DdwZdDsMKhj") },
      { name: "MSI VIXTA 300R PZ", meta: "15.3K plays", image: R + "msi-vixta.jpg", href: ig("DeHrkKFsD3M") },
      { name: "Corsair Warthog", meta: "32K plays", image: R + "corsair-warthog.jpg", href: ig("DdmwBYIp2SD") },
      { name: "Corsair Xeneon Edge", meta: "62.9K plays", image: R + "corsair-xeneon-edge.jpg", href: ig("DeKGDZwMaPJ") },
    ],
  },
  {
    label: "Gaming at the desk",
    meta: "Up to 266.2K plays",
    seed: 15,
    files: [
      { name: "Intel Gamer Days", meta: "1.9K plays", image: R + "intel-gamer-days.jpg", href: ig("DdZQuunxK0w") },
      { name: "Gaming as a reset", meta: "2.4K plays", image: R + "gaming-reset.jpg", href: ig("Dcjbq0TpLoV") },
      { name: "Helldivers, Liberty Day", meta: "266.2K plays", image: R + "helldivers-desk.jpg", href: ig("DBl8GaqOcnm") },
    ],
  },
]

export type Work = { title: string; img: string; alt: string; date: string; ig: string; short?: string }

export const WORK: Work[] = [
  { title: "Corsair Xeneon Edge", img: "corsair-xeneon-edge.jpg", alt: "Corsair Xeneon Edge box", date: "Oct 2026", ig: "DeKGDZwMaPJ", short: "eYazWuWvYXk" },
  { title: "MSI MPG VIXTA 300R PZ", img: "msi-vixta.jpg", alt: "MSI VIXTA 300R PZ case with green lighting", date: "Oct 2026", ig: "DeHrkKFsD3M", short: "smf2uwtOknI" },
  { title: "ASUS Prime RX 9070 EVO", img: "asus-prime-rx9070.jpg", alt: "ASUS Prime RX 9070 EVO graphics card", date: "Sep 2026", ig: "DdwZdDsMKhj", short: "56RYrfvynmM" },
  { title: "Corsair Warthog", img: "corsair-warthog.jpg", alt: "Corsair Warthog case with orange lighting", date: "Sep 2026", ig: "DdmwBYIp2SD" },
  { title: "MSI Codex R2 AI, Intel Gamer Days", img: "intel-gamer-days.jpg", alt: "MSI gaming PC interior for Intel Gamer Days", date: "Sep 2026", ig: "DdZQuunxK0w", short: "tBlp6vTwVRU" },
  { title: "amaran Mic", img: "amaran-mic.jpg", alt: "amaran Mic on a desk", date: "Sep 2026", ig: "DdCDo5Az5Jy" },
].map((w) => ({ ...w, img: R + w.img }))

export const COUNTS = [
  { n: "41.0K", label: "Instagram followers" },
  { n: "6.5K", label: "TikTok followers" },
  { n: "1.2K", label: "YouTube subscribers" },
  { n: "304.2K", label: "Plays on the top reel" },
]

export const COZY = [
  { img: R + "cruise-coffee.jpg", alt: "Sim racing wheel at the desk with coffee", caption: "Cruise and coffee Sunday", href: ig("Dcrcum-pZ1O") },
  { img: R + "gaming-reset.jpg", alt: "Gaming at the desk in a dark room", caption: "Gaming as a reset", href: ig("Dcjbq0TpLoV") },
  { img: R + "limit-distractions.jpg", alt: "Top-down view of the desk", caption: "Setting goals for the day", href: ig("DB37zfxuWTs") },
]

export const LINKS = [
  { name: "Instagram", sub: "@avrgtech", href: "https://www.instagram.com/avrgtech/" },
  { name: "TikTok", sub: "@avrgtech", href: "https://www.tiktok.com/@avrgtech" },
  { name: "YouTube", sub: "@AvrgTech", href: "https://www.youtube.com/@AvrgTech" },
  { name: "Gear links", sub: "Everything on the desk, on Beacons", href: "https://beacons.ai/avrgtech" },
]

export const DELIVERABLES = [
  "Instagram Reel",
  "TikTok",
  "YouTube Short",
  "Dedicated YouTube video",
  "YouTube integration",
  "Stories",
  "UGC for our channels",
  "Local business video",
]
export const SOCIAL = ["Instagram Reel", "TikTok", "YouTube Short"]
export const LEADS = ["Brief-led", "Creative freedom"]
export const ADS = [
  { value: "Organic only", label: "Organic only" },
  { value: "30 days, one platform", label: "30 days · 1 platform" },
  { value: "30 days, every platform", label: "30 days · all" },
  { value: "90 days, every platform", label: "90 days" },
  { value: "6 months or longer", label: "6 months +" },
]
