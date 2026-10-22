/* ============================================================================
 * SIMRAN — CENTRAL CONTENT FILE
 * ----------------------------------------------------------------------------
 * Every piece of copy, every number, every image and every link on the site
 * resolves from this file. To update the site, edit here and nowhere else.
 *
 * Fields marked TODO must be supplied before launch.
 *
 * NOTE ON CLAIMS: every figure below is one Simran supplied. Do not add
 * ratings, learner counts, completion rates or guarantees that aren't real —
 * they also feed the structured data in app/layout.tsx, where inventing them
 * is an SEO liability as well as a trust one.
 * ==========================================================================*/

const stock = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Img = { src: string; alt: string };

/* PLACEHOLDER IMAGERY — replace with Simran's own photography. Drop files into
 * /public/images/ and swap each `src` for a local path. The aspect ratios are
 * fixed by the components, so nothing else needs to change.
 *
 * Until then, alt text describes what the stock frame actually shows. None of
 * it is Simran, so none of it says so. Prefer shots of a 61-key keyboard over
 * acoustic pianos: that is the instrument the course is taught on. */
export const images = {
  /* Simran's own photograph, cut out and given a hand-torn cream paper edge.
   * Generated from the source PNG — see scripts/cutout.py. A replacement must
   * be run through that script too, or it will not match the collage. */
  heroPortrait: {
    src: "/images/simran-cutout.png",
    alt: "Simran playing a keyboard, smiling",
  },
  introPoster: {
    /* Only used as the video poster once `about.videoId` is set — ideally
     * swap it for a frame from the video itself at that point. */
    src: stock("1552422535-c45813c61732"),
    alt: "Hands playing an upright piano",
  },
  /* Simran's own image (IMG_7659.PNG), beside "Why it works". 16:9 with
   * text in the frame, so the slot is 16:9 and the alt repeats the words. */
  whyItWorks: {
    src: "/images/simran-play-piano.jpg",
    alt: "Simran smiling beside her keyboard, with the words: Everything you need to play piano — chords, scales, songs, improvisation",
  },
} satisfies Record<string, Img>;

/* --- Identity ------------------------------------------------------------ */
export const brand = {
  name: "Simran",
  fullName: "Simran Jassal",
  role: "Pianist & piano teacher",
  courseName: "Piano Made Easy for Beginners",
  tagline: "Piano Seekho – Zero Se, Bina Sheet Music",
  email: "learnwithpianowali@gmail.com",
  siteUrl: "https://pianowali.com",
  instagram: "simranj_musicc",
};

/* --- Calls to action -----------------------------------------------------
 * Enrolment will run through Razorpay (Simran is applying). Until that link
 * exists, `cta.primaryHref` opens WhatsApp as a stand-in for the demo. When
 * Razorpay is live, paste the payment link into `primaryHref` — every
 * "Enroll now" button (hero, course, pricing, closing band, nav, mobile menu,
 * sticky bar) reads from it, and nothing else needs to change.
 *
 * `contact.whatsappHref` is separate on purpose: it is for questions (FAQ,
 * mobile menu, footer) and keeps pointing at WhatsApp after enrolment moves.
 *
 * `whatsappNumber` is the same number shown on the policies page: country
 * code, digits only.
 * -----------------------------------------------------------------------*/
const whatsappNumber = "917428778446";
const whatsapp = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const contact = {
  whatsappHref: whatsapp(
    "Hi Simran! I have a question about the Piano Made Easy for Beginners course.",
  ),
};

export const cta = {
  /* TODO — the Razorpay payment link. WhatsApp is a demo stand-in until then. */
  primaryHref: whatsapp(
    "Hi Simran! I'd like to join the Piano Made Easy for Beginners course.",
  ),
  primaryLabel: "Enroll now",
  navLabel: "Enroll now",
  reassurance: "One-time payment · Lifetime access",
};

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "Course", href: "#course" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "For you", href: "#audience" },
    { label: "Pricing", href: "#pricing" },
  ],
};

/* --- §1 Hero ------------------------------------------------------------- */
export const hero = {
  eyebrow: "Online piano course",
  /* `emphasis` is a list of phrases. Each is kept whole: on a narrow screen
   * the line breaks between phrases, never inside one. */
  headline: {
    /* Title case, with an en dash (–) rather than the longer em dash */
    lead: "Piano Seekho –",
    emphasis: ["Zero Se,", "Bina Sheet Music"],
  },
  body:
    "Step-by-step piano course for absolute beginners. Learn Bollywood and " +
    "English songs without reading a single note.",
  /* Lucide icon names — see components/sections/Hero.tsx */
  badges: [
    { icon: "Piano", label: "8+ years playing" },
    { icon: "GraduationCap", label: "100+ students taught" },
    { icon: "Globe", label: "Students across the globe" },
  ],
};

/* --- §2 About Simran ----------------------------------------------------- */
export const about = {
  eyebrow: "Meet your teacher",
  heading: "Hi, I'm Simran",
  /* TODO — the YouTube ID of Simran's intro video */
  videoId: "",
  videoLabel: "Play Simran's introduction",
  /* The first paragraph shows; the rest open from "Read the full story", so
   * the section reaches the pull quote and the numbers quickly. */
  readMoreLabel: "Read the full story",
  bio: [
    "When I first started playing the piano, I was completely self-taught. I remember sitting at the keys, trying to figure things out on my own and wondering where to begin. There were moments when it felt confusing, but there was also something exciting about discovering a new song, a new chord, a new sound.",
    "Over the past 8 years I've kept learning and growing as a pianist. Along the way I began teaching, and that opened my eyes to how differently everyone experiences music. For more than 3 years I've taught students from 4 to 65 years old. Some came wanting to play their favourite songs. Others wanted to build confidence, or simply find out what they could do at the piano.",
    "That's why my lessons focus on making music feel simple, enjoyable and achievable. Instead of memorising notes without understanding them, you discover how the music works, build confidence, and develop the ear to figure songs out for yourself.",
  ],
  /* The closing line of the bio, set large */
  pullQuote:
    "Because learning piano shouldn't feel like homework. It should feel like making music.",
  signature: "— Simran",
  stats: [
    { value: 8, suffix: "+", label: "Years playing" },
    { value: 3, suffix: "+", label: "Years teaching" },
    { value: 100, suffix: "+", label: "Students taught" },
    { value: 23, suffix: "", label: "Video lessons" },
  ],
};

/* --- §3 About the course ------------------------------------------------- */
export const course = {
  eyebrow: "The course",
  heading: brand.courseName,
  intro:
    "Learn piano from absolute zero — no sheet music, no confusion — and play " +
    "popular Bollywood and English songs with both hands.",
  points: [
    "Play popular Hindi and English songs with both hands",
    "Understand scales, chords, and how they work together",
    "Use the secret chord progression that works for 90% of songs",
    "Figure out simple songs by ear",
  ],
  meta: [
    { label: "Format", value: "Self-paced video" },
    { label: "Lessons", value: "23 across 4 modules" },
    { label: "Level", value: "Absolute beginner" },
    { label: "Access", value: "Lifetime" },
  ],
  /* Simran's 8-second intro, shown as the course thumbnail. It plays muted on
   * a loop; the visitor can pause it or turn the sound on. Re-encoded for the
   * web (720p, ~1.9MB) from the original in "Video Assets.zip". */
  video: {
    src: "/videos/course-intro.mp4",
    poster: "/images/posters/course-intro.jpg",
    label: "Simran's course introduction",
  },
};

/* --- §4a What's included ------------------------------------------------- */
/* `icon` names one of the custom icons in components/ui/FeatureIcons.tsx */
export const inside = {
  eyebrow: "What's included",
  heading: "Everything you need, in one place",
  items: [
    {
      icon: "lessons",
      title: "23 video lessons",
      body: "Four modules that take you from your first key to playing full songs with both hands.",
    },
    {
      icon: "songs",
      title: "Hindi + English songs",
      body: "Bollywood and pop songs taught end to end, right hand first and then with chords.",
    },
    {
      icon: "live",
      title: "Sunday live doubt sessions",
      body: "Two months of live Sunday sessions where you can bring whatever you're stuck on.",
    },
    {
      icon: "community",
      title: "WhatsApp community",
      body: "A group of fellow students to share progress with and ask questions between lessons.",
    },
    {
      icon: "certificate",
      title: "Certificate of completion",
      body: "A downloadable PDF with your name, the course title and Simran's signature.",
    },
    {
      icon: "lifetime",
      title: "Lifetime access",
      body: "Watch anytime, anywhere, for as long as you like. No subscription, no renewal.",
    },
  ],
};

/* --- §4b Why it works ---------------------------------------------------- */
export const benefits = {
  eyebrow: "Why it works",
  heading: "Built for people starting from zero",
  items: [
    {
      icon: "Ear",
      title: "No sheet music required",
      body: "You learn by ear and by pattern, so you're never stuck decoding notation before you can play.",
    },
    {
      icon: "KeyRound",
      title: "The secret chord progression",
      body: "One progression — C, G, Am, F — that unlocks roughly 90% of the songs you already know.",
    },
    {
      icon: "Hand",
      title: "Both hands, properly",
      body: "Left and right hand coordination taught in steps small enough that they actually come together.",
    },
    {
      icon: "Route",
      title: "At your own pace",
      body: "Short, step-by-step lessons in simple Hinglish. Go as fast or as slowly as you like.",
    },
  ],
};

/* --- §4c Curriculum ------------------------------------------------------
 * A genuine sequence — modules build on each other — so the numbering carries
 * real information rather than decoration.
 * -----------------------------------------------------------------------*/
export const curriculum = {
  eyebrow: "Module by module",
  heading: "The curriculum",
  note: "Four modules, 23 lessons. Work through them in order the first time.",
  modules: [
    {
      title: "Getting started",
      count: "4 lessons",
      lessons: [
        "Which keyboard should you buy? Piano vs keyboard, plus a buying guide",
        "Know your keys: posture, finger numbers and hand position",
        "Black notes made easy — sharps and flats explained",
        "Left hand made easy — bass notes and your first chords",
      ],
    },
    {
      title: "Your first songs (C major)",
      count: "4 lessons",
      lessons: [
        "Your first scale: let's play C major",
        "Song time: Happy Birthday (right hand)",
        "Song time: Jingle Bells (right hand)",
        "Level up: Happy Birthday and Jingle Bells with chords",
      ],
    },
    {
      title: "Happy and sad scales (G, F, Am, Em)",
      count: "12 lessons",
      lessons: [
        "Next up: G major — your second happy scale",
        "Song time: Kuch Kuch Hota Hai (right hand)",
        "Level up: Kuch Kuch Hota Hai with chords",
        "F major scale — step-by-step",
        "Song time: Emptiness (right hand)",
        "Level up: Emptiness with chords",
        "Minor scales made simple — begin with A minor",
        "Song time: Pehle Bhi Main (right hand)",
        "Level up: Pehle Bhi Main with chords",
        "E minor — a beautiful sound with a sharp twist",
        "Song time: E minor song (right hand)",
        "Level up: E minor song with chords",
      ],
    },
    {
      title: "The secret sauce",
      count: "3 lessons",
      lessons: [
        "The secret chord progression that unlocks 90% of songs",
        "Ear training basics — find any song's home note",
        "Course outro — you did it",
      ],
    },
  ],
};

/* --- §5 Audience & outcomes ---------------------------------------------- */
export const audience = {
  eyebrow: "Is this for you",
  heading: "Who this course is for",
  forYou: {
    title: "This is for you if",
    items: [
      "You're an absolute beginner — there's no age limit to learning",
      "You tried YouTube tutorials and ended up confused",
      "You love Bollywood and English music",
      "You want to play without reading sheet music",
      "You want to play for friends and family",
    ],
  },
  outcomes: {
    title: "What you'll achieve",
    items: [
      "Play popular songs with both hands",
      "Understand scales and chords",
      "Figure out songs by ear",
      "Play at parties and family gatherings",
      "Build a strong musical foundation",
    ],
  },
};

/* --- §6 Social proof -----------------------------------------------------
 * TODO — Simran's written testimonials and video reviews are still to come.
 * Add them to `items` and the review grid appears automatically. Until then
 * the section falls back to her real Instagram and credentials. Do NOT add a
 * star rating or a learner count here unless it is real.
 * -----------------------------------------------------------------------*/
export const testimonials = {
  eyebrow: "The students",
  heading: "Students from 4 to 65, across the globe",
  body:
    "Over 3 years of teaching, students have come to learn a favourite song, " +
    "to build confidence, or simply to find out what they could do at the " +
    "piano. Covers, lesson clips and student progress go up on Instagram.",
  ctaLabel: `See @${brand.instagram}`,
  ctaHref: `https://instagram.com/${brand.instagram}`,
  /* Student progress videos, from "Video Assets.zip". Re-encoded for the web
   * (832×464, 30fps); the one vertical clip is cropped to the same 16:9 frame.
   * They load only when played. The first is shown large.
   *
   * TODO — several are children. Confirm a parent has agreed to each video
   * being on the site (and, for student-3, to the Instagram handle that is
   * burned into the clip) before launch. */
  videos: [
    { src: "/videos/students/student-1.mp4", poster: "/images/posters/student-1.jpg", duration: "1:13" },
    { src: "/videos/students/student-3.mp4", poster: "/images/posters/student-3.jpg", duration: "0:46" },
    { src: "/videos/students/student-2.mp4", poster: "/images/posters/student-2.jpg", duration: "1:42" },
    { src: "/videos/students/student-4.mp4", poster: "/images/posters/student-4.jpg", duration: "1:24" },
    { src: "/videos/students/student-5.mp4", poster: "/images/posters/student-5.jpg", duration: "0:56" },
  ],
  /* Written reviews, when there are some. Each appears as a quote card under
   * the videos. Shape: { name, role, avatar, quote }. Only with permission to
   * use the name. */
  items: [] as Array<{
    name: string;
    role: string;
    avatar: string;
    quote: string;
  }>,
};

/* --- §7a Pricing ---------------------------------------------------------
 * A single one-time plan. If tiers are introduced later, this object and
 * components/sections/Convert.tsx are the only places to change.
 * -----------------------------------------------------------------------*/
export const pricing = {
  eyebrow: "Enrolment",
  heading: "One course, one payment",
  note: "No subscription, no renewal. Pay once and it's yours.",
  currency: "₹",
  planName: "Full course",
  /* Launch offer. `price` is what people pay today; `originalPrice` is shown
   * struck through beside it. The offer must be real — once the first 100
   * enrollments are in, set `price` back to "1,499" and `offer` to null and
   * the page returns to a single price everywhere (card, sticky bar, and the
   * structured data in app/layout.tsx). */
  price: "999",
  originalPrice: "1,499" as string | null,
  offer: "Launch price for the first 100 enrollments" as string | null,
  offerLabel: "Launch offer",
  priceNote: "One-time payment",
  summary: "Full course, all bonuses, lifetime access.",
  features: [
    "All 4 modules — 23 video lessons",
    "Hindi + English songs, taught end to end",
    "2 months of Sunday live doubt sessions",
    "WhatsApp student community",
    "Certificate of completion",
    "Bonus: keyboard buying guide",
    "Lifetime access to everything",
  ],
  ctaLabel: "Enroll now",
};

/* --- Announcement bar ----------------------------------------------------
 * While the launch offer runs, the bar announces it: it is the first place a
 * visitor sees the price. With `pricing.offer` set to null it falls back to
 * the Sunday sessions. `short` is the one-line version for phones.
 * -----------------------------------------------------------------------*/
export const announcement = pricing.offer
  ? {
      text: `${pricing.offerLabel}: ${pricing.currency}${pricing.price} for the first 100 enrollments`,
      short: `${pricing.currency}${pricing.price} ${pricing.offerLabel.toLowerCase()}`,
      linkLabel: "See pricing",
      href: "#pricing",
    }
  : {
      text: "Includes 2 months of Sunday live doubt sessions",
      short: "2 months of live Sunday sessions",
      linkLabel: "What's included",
      href: "#included",
    };

/* --- §7b FAQ ------------------------------------------------------------- */
export const faq = {
  eyebrow: "Before you enroll",
  heading: "Questions, answered",
  contact: {
    title: "Still deciding?",
    body: "Send a message and Simran will reply herself.",
    ctaLabel: "Ask a question",
  },
  items: [
    {
      q: "Do I need a piano to start?",
      a: "You need a keyboard or piano to practise on. If you don't have one yet, the first module includes a video guide on exactly which keyboard to buy and what to look for at different budgets.",
    },
    {
      q: "What kind of keyboard do I need?",
      a: "Any 61-key keyboard or 88-key digital piano works for this course. You don't need an expensive instrument to start.",
    },
    {
      q: "What if I'm a complete beginner?",
      a: "Perfect — this course is designed for absolute beginners. No prior experience and no music theory background needed. It starts with the very basics: the keyboard, finger numbers and posture.",
    },
    {
      q: "Is there an age limit?",
      a: "No. Students have ranged from 4 to 65 years old. Younger children are welcome with a parent alongside them. If you have the will to learn, you can play.",
    },
    {
      q: "Will I learn Bollywood songs?",
      a: "Yes. The course covers popular Bollywood and English songs, including Kuch Kuch Hota Hai, Emptiness and Pehle Bhi Main, each taught right hand first and then with chords.",
    },
    {
      q: "How long do I have access?",
      a: "Lifetime access. Watch anytime, anywhere, as many times as you like.",
    },
    {
      q: "Is there a certificate?",
      a: "Yes. Once you complete the course you'll receive a certificate of completion with your name, the course title and Simran's signature, as a downloadable PDF.",
    },
  ],
};

/* --- Closing CTA --------------------------------------------------------- */
export const closing = {
  eyebrow: "One last thing",
  heading: "Start your piano journey today",
  body: "The keyboard is already in the room. Module one starts from the very first key.",
};

/* --- Footer -------------------------------------------------------------- */
export const footer = {
  blurb:
    "Online piano lessons for absolute beginners. Bollywood and English songs, " +
    "no sheet music required.",
  /* TODO — add YouTube here if Simran has a channel to link */
  socials: [
    {
      label: "Instagram",
      icon: "Instagram",
      href: `https://instagram.com/${brand.instagram}`,
    },
    { label: "WhatsApp", icon: "MessageCircle", href: contact.whatsappHref },
  ],
  /* Shown under the social icons, so the handle is readable, not just an icon */
  socialNote: `Covers, lesson clips and student progress: @${brand.instagram}`,
  columns: [
    { title: "Explore", links: nav.links },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "#faq" },
        { label: "Message on WhatsApp", href: contact.whatsappHref },
        /* TODO — confirm brand.email before launch */
        { label: "Email", href: `mailto:${brand.email}` },
      ],
    },
  ],
  /* One quiet link, bottom right, to the page holding every policy */
  legal: [{ label: "Terms & Policies", href: "/policies" as string | null }],
};
