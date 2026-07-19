/* =====================================================
   PRODUCTS.JS
   =====================================================
   This is the ONLY file you need to edit to add, remove,
   or change products. See README.md for step-by-step
   instructions.

   Quick rules:
   - Every product needs a unique "id" (just count up: 1, 2, 3…)
   - "code" is the short reference customers can mention in DM,
     e.g. "ZT001", "ZT002" — just keep counting up.
   - "sold" is either true or false (no quotes)
   - "images" is a list of file paths inside the /images folder
   - Don't delete the commas between fields
   ===================================================== */

/* ---- Shop-wide settings ---- */
/* Change these to point "Reserve on Instagram" and the
   Contact page at YOUR real Instagram account and email. */
const SHOP_SETTINGS = {
  instagramUsername: "zoku.thrift", // no @ symbol, no spaces
  contactEmail: "zokuthrift@gmail.com",
  // Latest Drops section — replace with your real Reel links.
  // The thumbnails live in images/reels/reel1.jpg, reel2.jpg, reel3.jpg
  reels: [
    { image: "images/reels/reel1.jpg", url: "https://www.instagram.com/zoku.thrift/" },
    { image: "images/reels/reel2.jpg", url: "https://www.instagram.com/zoku.thrift/" },
    { image: "images/reels/reel3.jpg", url: "https://www.instagram.com/zoku.thrift/" }
  ]
};

/* ---- Product catalogue ---- */
const products = [
  {
    id: 1,
    code: "ZT001",
    name: "501 Original",
    price: 1299,
    waist: 32,
    length: 34,
    size: "M",
    brand: "Levi's",
    description: "Classic straight fit in rigid mid-blue denim. Light fading at the knee, no repairs needed.",
    sold: false,
    dateAdded: "2026-07-01",
    images: [
      "images/levis-501/front.jpg",
      "images/levis-501/back.jpg"
      // "images/levis-501/detail.jpg"
    ]
  },
  {
    id: 2,
    code: "ZT002",
    name: "874 Original Fit Work Pant",
    price: 899,
    waist: 34,
    length: 32,
    size: "L",
    brand: "Dickies",
    description: "Twill work trouser in faded khaki. Straight through the leg, roomy through the seat.",
    sold: false,
    dateAdded: "2026-06-28",
    images: [
      "images/dickies-874/front1.jpg",
      "images/dickies-874/back1.jpg"
    ]
  },
  {
    id: 3,
    code: "ZT003",
    name: "Double Knee Carpenter",
    price: 1499,
    waist: 32,
    length: 32,
    size: "M",
    brand: "Carhartt",
    description: "Reinforced double-knee carpenter pant in duck canvas. Hammer loop intact, minor paint marks on the left thigh.",
    sold: false,
    dateAdded: "2026-06-25",
    images: [
      "images/carhartt-carpenter/front2.jpg",
      "images/carhartt-carpenter/back2.jpg"
    ]
  },
  {
    id: 4,
    code: "ZT004",
    name: "Cone Mills Selvedge 511",
    price: 1899,
    waist: 30,
    length: 32,
    size: "S",
    brand: "Levi's",
    description: "Slim straight fit, deadstock Cone Mills selvedge denim. Unwashed, tags removed only.",
    sold: false,
    dateAdded: "2026-06-20",
    images: [
      "images/levis-511-selvedge/front3.jpg",
      "images/levis-511-selvedge/back3.jpg"
    ]
  },
  {
    id: 5,
    code: "ZT005",
    name: "Cowboy Cut Regular Fit",
    price: 999,
    waist: 33,
    length: 34,
    size: "M",
    brand: "Wrangler",
    description: "Five-pocket regular fit in a warm indigo wash. Slight taper added at the ankle by a previous owner.",
    sold: false,
    dateAdded: "2026-06-18",
    images: [
      "images/wrangler-cowboy-cut/front4.jpg",
      "images/wrangler-cowboy-cut/back4.jpg",
      "images/wrangler-cowboy-cut/details4.jpg"

    ]
  },
  {
    id: 6,
    code: "ZT006",
    name: "M-65 Field Trouser",
    price: 1699,
    waist: 31,
    length: 33,
    size: "S",
    brand: "Alpha Industries",
    description: "Olive cotton-nylon field trouser with cargo pockets and drawstring cuffs. Faded to a soft sage.",
    sold: false,
    dateAdded: "2026-06-15",
    images: [
      "images/alpha-m65/front5.jpg",
      "images/alpha-m65/back5.jpg"
    ]
  },
  {
    id: 7,
    code: "ZT007",
    name: "550 Relaxed Fit",
    price: 799,
    waist: 36,
    length: 30,
    size: "L",
    brand: "Levi's",
    description: "Relaxed through the hip and thigh, stonewashed medium blue. Well broken-in, no thin spots.",
    sold: false,
    dateAdded: "2026-06-10",
    images: [
      "images/levis-550/front6.jpg",
      "images/levis-550/back6.jpg",
      "images/levis-550/details6.jpg"
    ]
  },
  {
    id: 8,
    code: "ZT008",
    name: "Painter Pant Straight Leg",
    price: 1099,
    waist: 30,
    length: 30,
    size: "S",
    brand: "Dickies",
    description: "Off-white painter pant with hammer loop and rule pocket. Light paint speckling, part of the character.",
    sold: false,
    dateAdded: "2026-06-05",
    images: [
      "images/dickies-painter/front7.jpg",
      "images/dickies-painter/back7.jpg",
      "images/dickies-painter/details7.jpg"

    ]
  },
  {
    id: 9,
    code: "ZT009",
    name: "Ripstop Cargo Trouser",
    price: 1399,
    waist: 33,
    length: 32,
    size: "M",
    brand: "Carhartt",
    description: "Six-pocket ripstop cargo in stone grey. Straight leg, sits at the natural waist.",
    sold: false,
    dateAdded: "2026-05-30",
    images: [
      // "images/carhartt-cargo/front8.jpg",
      "images/carhartt-cargo/back8.jpg",
      "images/carhartt-cargo/details8.jpg"

    ]
  },
  {
    id: 10,
    code: "ZT010",
    name: "Corduroy Trouser Wide Wale",
    price: 1199,
    waist: 32,
    length: 31,
    size: "M",
    brand: "Wrangler",
    description: "Wide-wale corduroy in a deep rust brown. Soft, worn-in hand feel with a slight flare at the hem.",
    sold: false,
    dateAdded: "2026-05-22",
    images: [
      "images/wrangler-cord/front9.jpg",
      // "images/wrangler-cord/back9.jpg",
      "images/wrangler-cord/details9.jpg"
    ]
  }
];
