import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  Bird,
  Cat,
  ChevronLeft,
  ChevronRight,
  Dog,
  Fish,
  Heart,
  Menu,
  PawPrint,
  Rabbit,
  Search,
  ShieldCheck,
  Sparkles,
  Turtle,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import heroImage from "@/assets/petlush-hero.jpg";
import smallPetsImage from "@/assets/petlush-small-pets.jpg";
import birdsImage from "@/assets/petlush-birds.jpg";
import aquaticsImage from "@/assets/petlush-aquatics.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetLush — Elevating Pet Care with Love" },
      {
        name: "description",
        content:
          "A warm, practical pet-care guide for dogs, cats, rabbits, birds, fish, hamsters, turtles, and parrots.",
      },
      { property: "og:title", content: "PetLush — Elevating Pet Care with Love" },
      {
        property: "og:description",
        content: "Thoughtful everyday care guidance for every kind of companion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PetLushPage,
});

type Pet = {
  name: string;
  emoji: string;
  group: "Furry" | "Feathered" | "Aquatic";
  note: string;
  care: string;
};

const defaultPet: Pet = { name: "Dogs", emoji: "🐶", group: "Furry", note: "Loyal explorers", care: "Daily movement, enrichment, and routine" };

const pets: Pet[] = [
  defaultPet,
  { name: "Cats", emoji: "🐱", group: "Furry", note: "Curious companions", care: "Play, calm spaces, and clean essentials" },
  { name: "Rabbits", emoji: "🐰", group: "Furry", note: "Gentle grazers", care: "Hay-rich diets, room to hop, and company" },
  { name: "Birds", emoji: "🐦", group: "Feathered", note: "Bright little singers", care: "Social time, safe flight, and varied enrichment" },
  { name: "Fish", emoji: "🐠", group: "Aquatic", note: "Peaceful swimmers", care: "Stable water, suitable habitats, and observation" },
  { name: "Hamsters", emoji: "🐹", group: "Furry", note: "Tiny adventurers", care: "Deep bedding, hideaways, and safe activity" },
  { name: "Turtles", emoji: "🐢", group: "Aquatic", note: "Quiet characters", care: "Species-appropriate light, water, and basking" },
  { name: "Parrots", emoji: "🦜", group: "Feathered", note: "Social thinkers", care: "Daily interaction, foraging, and safe perches" },
];

const topics = [
  { icon: "🥕", title: "Food", text: "Build a consistent, species-appropriate feeding routine." },
  { icon: "🩺", title: "Health", text: "Notice everyday changes and keep routine veterinary visits." },
  { icon: "🫧", title: "Grooming", text: "Support comfort with gentle, pet-specific care habits." },
  { icon: "🎾", title: "Activities", text: "Make movement and enrichment part of every day." },
  { icon: "🛡️", title: "Safety", text: "Create calm spaces and remove avoidable household risks." },
];

const tips = [
  { label: "Small habit, big comfort", text: "Keep food, play, and rest times predictable. A steady rhythm helps many pets feel secure." },
  { label: "Enrichment can be simple", text: "Rotate a few safe toys instead of offering everything at once to keep familiar play feeling fresh." },
  { label: "Watch the everyday", text: "Changes in appetite, energy, movement, or behavior are useful observations to share with your veterinarian." },
  { label: "Let them choose", text: "Invite interaction and allow space to step away. Choice builds trust across species." },
];

const gallery = [
  { src: heroImage, alt: "A golden retriever and tabby cat sitting together", title: "Home is better together" },
  { src: smallPetsImage, alt: "A rabbit and hamster in an enriched play space", title: "Little lives, thoughtfully loved" },
  { src: birdsImage, alt: "A parrot and small bird on natural perches", title: "Room to sing and soar" },
  { src: aquaticsImage, alt: "A planted aquarium with fish and a basking turtle", title: "Calm worlds, carefully balanced" },
];

const faqs = [
  ["How do I choose the right care guide?", "Start with your pet, then use the five care topics to build a simple routine. Individual needs vary, so your veterinarian remains the best source for personal health advice."],
  ["Is PetLush veterinary advice?", "No. PetLush shares general education and everyday care ideas, not diagnosis or treatment. Contact a qualified veterinarian when you have a health concern."],
  ["How often should I refresh enrichment?", "Small, regular changes are often enough. Rotate safe items, observe what your pet enjoys, and avoid sudden changes that cause stress."],
  ["Can I use the same routine for every pet?", "No. Species, age, health, personality, and home environment all matter. Use these ideas as a starting point and adapt with professional guidance."],
];

const primaryNav: Array<[string, string]> = [["Pets", "pets"], ["Care", "care"], ["Services", "services"], ["Gallery", "gallery"], ["About", "about"]];
const mobileNav: Array<[string, string]> = [["All Pets", "pets"], ["Care Guide", "care"], ["Safety", "safety"], ["Services", "services"], ["Gallery", "gallery"], ["Pet Tips", "tips"], ["About", "about"], ["Contact", "contact"]];
const exploreLinks: Array<[string, string]> = [["All pets", "pets"], ["Care guide", "care"], ["Pet tips", "tips"], ["Gallery", "gallery"]];
const companyLinks: Array<[string, string]> = [["About", "about"], ["Safety", "safety"], ["FAQ", "faq"], ["Contact", "contact"]];

function PetIcon({ name }: { name: string }) {
  if (name === "Dogs") return <Dog aria-hidden="true" />;
  if (name === "Cats") return <Cat aria-hidden="true" />;
  if (name === "Rabbits") return <Rabbit aria-hidden="true" />;
  if (name === "Fish") return <Fish aria-hidden="true" />;
  if (name === "Turtles") return <Turtle aria-hidden="true" />;
  if (name === "Hamsters") return <PawPrint aria-hidden="true" />;
  return <Bird aria-hidden="true" />;
}

function PetLushPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState<Pet>(defaultPet);
  const [tipIndex, setTipIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTipIndex((current) => (current + 1) % tips.length), 6500);
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((lightbox + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((lightbox - 1 + gallery.length) % gallery.length);
    };
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  const visiblePets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return pets.filter(
      (pet) =>
        (filter === "All" || pet.group === filter) &&
        (!normalized || `${pet.name} ${pet.note} ${pet.care}`.toLowerCase().includes(normalized)),
    );
  }, [filter, query]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const activeTip = tips[tipIndex] ?? tips[0];
  const activeImage = lightbox === null ? null : gallery[lightbox] ?? gallery[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="site-header sticky-top">
        <div className="container-xl d-flex align-items-center justify-content-between gap-3 py-3">
          <button className="brand-lockup" onClick={() => scrollTo("home")} aria-label="PetLush home">
            <span className="brand-mark" aria-hidden="true">🐾</span>
            <span>PetLush</span>
          </button>
          <nav className="d-none d-lg-flex align-items-center gap-4" aria-label="Main navigation">
            {primaryNav.map(([label, id]) => (
              <button key={id} className="nav-link-soft" onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>
          <div className="d-flex align-items-center gap-2">
            <Button className="clay-button d-none d-sm-inline-flex" onClick={() => scrollTo("contact")}>Contact us <ArrowRight /></Button>
            <Button variant="ghost" size="icon" className="mobile-menu-button d-lg-none" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav d-lg-none" aria-label="Mobile navigation">
            {mobileNav.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="hero-section">
        <img src={heroImage} width={1536} height={1024} alt="A golden retriever and tabby cat relaxing together in a bright home" className="hero-image" />
        <div className="hero-wash" />
        <div className="container-xl hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles aria-hidden="true" /> Thoughtful care for every companion</div>
            <h1>Elevating Pet Care <em>with Love.</em></h1>
            <p>Practical guidance, joyful ideas, and a softer way to care for the animals who make life whole.</p>
            <div className="d-flex flex-wrap gap-3">
              <Button className="clay-button clay-button-lg" onClick={() => scrollTo("pets")}>Meet every pet <ArrowRight /></Button>
              <Button variant="outline" className="clay-button-secondary clay-button-lg" onClick={() => scrollTo("care")}>Explore care guides</Button>
            </div>
            <div className="hero-trust"><span>Made with</span><Heart fill="currentColor" aria-hidden="true" /><span>for curious pet people</span></div>
          </div>
        </div>
        <div className="hero-petal hero-petal-one" aria-hidden="true" />
        <div className="hero-petal hero-petal-two" aria-hidden="true" />
      </section>

      <section id="pets" className="section-space">
        <div className="container-xl">
          <div className="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4">
            <div><span className="kicker">Find your companion</span><h2>Care starts with <em>who they are.</em></h2></div>
            <p>Pick a pet to uncover a gentler starting point for their everyday routine.</p>
          </div>
          <div className="pet-tools row g-3 align-items-center">
            <div className="col-12 col-lg-5">
              <label className="search-box">
                <Search aria-hidden="true" />
                <span className="visually-hidden">Search pets</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pets or care needs…" />
              </label>
            </div>
            <div className="col-12 col-lg-7 d-flex flex-wrap gap-2 justify-content-lg-end" role="group" aria-label="Filter pet types">
              {["All", "Furry", "Feathered", "Aquatic"].map((item) => (
                <Button key={item} variant="ghost" className={`filter-pill ${filter === item ? "is-active" : ""}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</Button>
              ))}
            </div>
          </div>
          <div className="row g-4 mt-2">
            {visiblePets.map((pet) => (
              <div className="col-6 col-md-4 col-xl-3" key={pet.name}>
                <button className={`pet-card ${selectedPet.name === pet.name ? "is-selected" : ""}`} onClick={() => setSelectedPet(pet)} aria-pressed={selectedPet.name === pet.name}>
                  <span className="pet-emoji"><PetIcon name={pet.name} /></span>
                  <span className="pet-card-title">{pet.name}</span>
                  <span className="pet-card-note">{pet.note}</span>
                  <span className="pet-card-arrow"><ArrowRight aria-hidden="true" /></span>
                </button>
              </div>
            ))}
          </div>
          {visiblePets.length === 0 && <div className="empty-state">No pets match that search yet. Try a broader word.</div>}
          <div className="selected-pet-panel mt-4" aria-live="polite">
            <span className="selected-pet-icon"><PetIcon name={selectedPet.name} /></span>
            <div><span>Your care path</span><strong>{selectedPet.name}</strong><p>{selectedPet.care}</p></div>
            <Button className="clay-button ms-lg-auto" onClick={() => scrollTo("care")}>Start with {selectedPet.name.toLowerCase()} <ArrowRight /></Button>
          </div>
        </div>
      </section>

      <section id="care" className="section-space care-section">
        <div className="container-xl">
          <div className="section-heading text-center mx-auto"><span className="kicker">The everyday five</span><h2>A whole-life approach to <em>better care.</em></h2><p className="mx-auto">Five simple lenses help you notice what your pet needs and shape a routine that feels natural.</p></div>
          <div className="row g-4 mt-4">
            {topics.map((topic, index) => (
              <div className={index < 3 ? "col-12 col-md-4" : "col-12 col-md-6"} key={topic.title}>
                <article className={`care-card care-card-${index + 1}`}>
                  <span className="care-number">0{index + 1}</span><span className="care-icon" aria-hidden="true">{topic.icon}</span>
                  <h3>{topic.title}</h3><p>{topic.text}</p><button onClick={() => scrollTo("tips")} aria-label={`See ${topic.title} tips`}><ArrowRight /></button>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="safety" className="section-space">
        <div className="container-xl">
          <div className="safety-band row g-0 align-items-stretch">
            <div className="col-12 col-lg-5 safety-visual">
              <div className="safety-orbit"><span>🐶</span><span>🐱</span><span>🐰</span><ShieldCheck /></div>
            </div>
            <div className="col-12 col-lg-7 safety-copy">
              <span className="kicker">Safety, softly built in</span><h2>A calmer home begins with <em>small checks.</em></h2>
              <div className="row g-3 mt-3">
                {["Keep foods, plants, cords, and cleaners safely out of reach.", "Give every pet a quiet place to rest without interruption.", "Use secure habitats, carriers, gates, and species-safe toys.", "Know your nearest veterinary contact before you need it."].map((item, index) => (
                  <div className="col-12 col-sm-6" key={item}><div className="safety-point"><span>{index + 1}</span><p>{item}</p></div></div>
                ))}
              </div>
              <p className="medical-note"><ShieldCheck /> For urgent symptoms, suspected poisoning, or injury, contact a qualified veterinarian promptly.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-space services-section">
        <div className="container-xl">
          <div className="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4"><div><span className="kicker">Ways we help</span><h2>Guidance made <em>beautifully simple.</em></h2></div><p>Explore practical resources designed around real routines—not perfection.</p></div>
          <div className="row g-4 mt-3">
            {[
              ["01", "Starter routines", "Build a gentle daily rhythm around food, rest, activity, and connection."],
              ["02", "Habitat checklists", "Review the essentials that help each species feel secure and engaged."],
              ["03", "Seasonal care notes", "Adjust routines thoughtfully as temperatures, daylight, and schedules shift."],
            ].map(([number, title, text]) => (
              <div className="col-12 col-lg-4" key={title}><article className="service-card"><span>{number}</span><h3>{title}</h3><p>{text}</p><button onClick={() => scrollTo("contact")}>Ask a question <ArrowRight /></button></article></div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-space gallery-section">
        <div className="container-xl">
          <div className="section-heading text-center mx-auto"><span className="kicker">The PetLush gallery</span><h2>Life looks better <em>with pets in it.</em></h2></div>
          <div className="gallery-grid mt-5">
            {gallery.map((item, index) => (
              <button key={item.title} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setLightbox(index)} aria-label={`Open image: ${item.title}`}>
                <img src={item.src} alt={item.alt} width={index === 0 ? 1536 : 1024} height={index === 0 ? 1024 : 768} loading="lazy" />
                <span><small>PetLush stories</small><strong>{item.title}</strong></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="tips" className="section-space tips-section">
        <div className="container-xl">
          <div className="tip-stage">
            <div className="tip-label"><span className="tip-spark"><Sparkles /></span><span>Pet tip <b>{String(tipIndex + 1).padStart(2, "0")}</b></span></div>
            <div className="tip-content" aria-live="polite"><span className="kicker">{activeTip?.label}</span><blockquote>“{activeTip?.text}”</blockquote></div>
            <div className="tip-controls">
              <Button variant="ghost" size="icon" onClick={() => setTipIndex((tipIndex - 1 + tips.length) % tips.length)} aria-label="Previous tip"><ChevronLeft /></Button>
              <div className="tip-dots" aria-hidden="true">{tips.map((_, index) => <span key={index} className={index === tipIndex ? "is-active" : ""} />)}</div>
              <Button variant="ghost" size="icon" onClick={() => setTipIndex((tipIndex + 1) % tips.length)} aria-label="Next tip"><ChevronRight /></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-space about-section">
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6"><div className="about-collage"><img src={smallPetsImage} alt="A rabbit and hamster in a welcoming play area" width={1024} height={768} loading="lazy" /><div className="about-badge"><Heart fill="currentColor" /><strong>Care with heart</strong><span>Curiosity over judgment</span></div></div></div>
            <div className="col-12 col-lg-6 ps-lg-5"><span className="kicker">Why PetLush</span><h2>Because good care should feel <em>clear, warm, and possible.</em></h2><p className="lead-copy">PetLush turns broad pet-care principles into approachable ideas for everyday life. No overwhelm. No one-size-fits-all promises.</p><div className="about-values"><div><strong>Kind by design</strong><span>Respectful guidance for people and pets.</span></div><div><strong>Curious by nature</strong><span>Observe first, then adapt with care.</span></div><div><strong>Grounded in reality</strong><span>Simple steps that fit real homes.</span></div></div></div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-space faq-section">
        <div className="container-xl"><div className="row g-5"><div className="col-12 col-lg-4"><span className="kicker">Good questions</span><h2>A little more <em>clarity.</em></h2><p>Care grows through asking, noticing, and learning.</p></div><div className="col-12 col-lg-8"><div className="accordion">{faqs.map(([question, answer], index) => <div className="accordion-item" key={question}><h3 className="accordion-header"><button className={`accordion-button ${openFaq === index ? "" : "collapsed"}`} type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} aria-controls={`faq-${index}`}>{question}</button></h3><div id={`faq-${index}`} className={`accordion-collapse collapse ${openFaq === index ? "show" : ""}`}><div className="accordion-body">{answer}</div></div></div>)}</div></div></div></div>
      </section>

      <section id="contact" className="section-space contact-section">
        <div className="container-xl"><div className="contact-panel row g-0"><div className="col-12 col-lg-5 contact-intro"><span className="kicker">Say hello</span><h2>Let’s make care feel <em>lighter.</em></h2><p>Have a topic you would love to see covered? Send a note. We’ll never ask for sensitive or medical details.</p><div className="contact-pets" aria-hidden="true">🐶 🐱 🐰 🦜</div></div><div className="col-12 col-lg-7 contact-form-wrap"><form className="row g-3" onSubmit={(event) => event.preventDefault()}><div className="col-12 col-sm-6"><label htmlFor="name">Your name</label><input id="name" className="form-control" type="text" placeholder="First name" /></div><div className="col-12 col-sm-6"><label htmlFor="email">Email</label><input id="email" className="form-control" type="email" placeholder="you@example.com" /></div><div className="col-12"><label htmlFor="pet">Who is your pet?</label><select id="pet" className="form-select" defaultValue=""><option value="" disabled>Choose a companion</option>{pets.map((pet) => <option key={pet.name}>{pet.emoji} {pet.name}</option>)}</select></div><div className="col-12"><label htmlFor="message">What’s on your mind?</label><textarea id="message" className="form-control" rows={4} placeholder="Share a topic or general question…" /></div><div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3"><Button className="clay-button clay-button-lg" type="submit">Send your note <ArrowRight /></Button><small>This demo form does not send or store information.</small></div></form></div></div></div>
      </section>

      <footer className="site-footer">
        <div className="container-xl"><div className="row g-5 align-items-start"><div className="col-12 col-lg-5"><div className="brand-lockup"><span className="brand-mark" aria-hidden="true">🐾</span><span>PetLush</span></div><p>Elevating Pet Care with Love.</p><small>General education only—not a substitute for veterinary advice.</small></div><div className="col-6 col-md-3 col-lg-2"><strong>Explore</strong>{exploreLinks.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div className="col-6 col-md-3 col-lg-2"><strong>PetLush</strong>{companyLinks.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div className="col-12 col-md-6 col-lg-3"><strong>A softer inbox</strong><p>Occasional care ideas, no clutter.</p><div className="footer-signup"><input type="email" aria-label="Email for care ideas" placeholder="Email address" /><Button size="icon" aria-label="Join email list"><ArrowRight /></Button></div></div></div><div className="footer-bottom"><span>© 2026 PetLush</span><span>Made for happy tails, tiny paws, and bright feathers.</span></div></div>
      </footer>

      {lightbox !== null && activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Pet gallery image"><Button variant="ghost" size="icon" className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close gallery"><X /></Button><Button variant="ghost" size="icon" className="lightbox-prev" onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><ChevronLeft /></Button><figure><img src={activeImage.src} alt={activeImage.alt} /><figcaption>{activeImage.title}</figcaption></figure><Button variant="ghost" size="icon" className="lightbox-next" onClick={() => setLightbox((lightbox + 1) % gallery.length)} aria-label="Next image"><ChevronRight /></Button></div>}
      {showTop && <Button size="icon" className="back-to-top" onClick={() => scrollTo("home")} aria-label="Back to top"><ArrowUp /></Button>}
    </main>
  );
}