require("dotenv").config();
/* TAKEN FROM https://firebase.google.com/docs/firestore/quickstart#web_2 */
/* Set up your development environment */
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

/* Initialize Cloud Firestore */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function populateData(data = mockedData) {
  const batch = db.batch();
  data.forEach(category => {
    // Create category
    const categoriesRef = db.collection("categories").doc();
    batch.set(categoriesRef, {
      key: category.key,
      description: category.description
    });

    // Populate category
    category.products.forEach(product => {
      const itemsRef = db.collection("items").doc();
      batch.set(itemsRef, {
        idCategory: categoriesRef.id, ...product
      });
    });
  });

  batch.commit()
    .then(r => console.log("Done!, Data was populated in firestore."))
    .catch(e => console.error(e))
}

function createProduct(title, photo, description, price, stock) {
  return { title, photo, price, description, stock }
}
/**
 * Creates a new category
 * @param {*} key Name to access in url.
 * @param {*} description Name to display in nav bar.
 * @param  {...any} products List of products that belongs to this category.
 */
function createCat(key, description, ...products) {
  return { key, description, products }
}

// Data was taken from the site https://www.chewy.com/ (thank you!)
const mockedData = [
  createCat("food", "Food",
    createProduct(
      "Fancy Feast Gravy Lovers Poultry & Beef Feast Variety Pack Canned Cat Food",
      "http://img.chewy.com/is/image/catalog/75978_MAIN._AC_SL400_V1584020009_.jpg",
      "Make dinner a black tie optional affair with the Fancy Feast Gravy Lovers Poultry & Beef Feast Variety Pack. With a delicious combo of your cat’s favorite flavors—chicken, turkey and beef—this gourmet food features small, delicate bites that are slow-cooked and served in a thick gourmet gravy. The added vitamins and minerals offer complete and balanced nutrition, making every mealtime a nutritious and delicious occasion. And since variety is the spice of life, the selection of flavors will keep him interested, with an even mix of Turkey Feast, Chicken Feast and Beef Feast to keep his tummy happy.",
      14.88,
      8),
    createProduct(
      "Meow Mix Original Choice Dry Cat Food",
      "https://img.chewy.com/is/catalog/99967_MAIN._AC_SS190_V1462999359_.jpg",
      "Meow Mix Original Choice Dry Cat Food is specially formulated to help adult cats stay healthy and happy. To maintain wellness throughout adulthood, fully grown cats need the proper nutrition to keep them in top shape as they age. Meow Mix Original Choice provides all the essential nutrients they need, including high-quality protein and essential fatty acids to help support strong muscles and keep their coat looking its best. It’s packed with tons of wholesome ingredients and the irresistible flavors of chicken, turkey, salmon and ocean fish. This tasty food is complete and balanced for adult cats with all the vitamins and minerals they need for optimal health.",
      15.18,
      12),
    createProduct(
      "Friskies Indoor Variety Pack Canned Cat Food, 5.5-oz, case of 24",
      "https://img.chewy.com/is/image/catalog/76219_MAIN._AC_SS190_V1544036515_.jpg",
      "Give your pal a bowlful of kitty-approved flavor and nutrition with the Friskies Indoor Variety Pack Canned Cat Food. These tasty recipes feature nutritious real meat, and are packed with everything your cat needs to stay looking and feeling his best, like protein, antioxidants and healthy omegas. Plus, the formula is enhanced with vitamins, minerals and essential taurine for nose-to-tail well-being in every bite. Since it’s made with plenty of moisture, it also provides essential hydration to help support urinary health. So open up the easy pull tab and turn mealtime into yum time.",
      12.96,
      5),
  ),
  createCat("toys", "Toys",
    createProduct(
      "Frisco Plush Mouse Cat Toy, 3 count",
      "https://img.chewy.com/is/image/catalog/161262_MAIN._AC_SS190_V1568240250_.jpg",
      "This mousy crew packs triple the fun for cats everywhere—a fuzzy texture to grab and bite, string tails to chase, and an infusion of Canadian catnip to go wild over! Toss these around to get cats chasing and batting after them, or carrying them around as their playtime “prey”. By stimulating their natural hunting instincts, it’s the perfect way to provide cats with the daily exercise they need. Playing together also helps strengthen the bond between you and your cat, on the daily.",
      2.18,
      22),
    createProduct(
      "Frisco Cat Tracks Butterfly Cat Toy",
      "https://img.chewy.com/is/image/catalog/161805_MAIN._AC_SS190_V1565736428_.jpg",
      "If there was an amusement park for kitties, this toy would be the main attraction. That’s because these tracks have everything cats love—a ball to bat and chase around the tracks, the excitement of the rolling sound, and even a fluttery butterfly on top! There are three levels for even more play, each with its own rolling ball, so even more than one kitty can get in on the fun. Go ahead, let them go wild. The nonskid pads keep the track from sliding around when playtime goes into overtime.",
      9.18,
      9),
    createProduct(
      "Frisco 21-in Sisal Cat Scratching Post with Toy",
      "https://img.chewy.com/is/image/catalog/140149_MAIN._AC_SS190_V1584450984_.jpg",
      "From frisky kittens to spunky senior cats, felines love to scratch—and the Frisco 21-Inch Cat Scratching Post gives your furry friend a place where she can claw to her heart’s content. This vertical scratching post is great for nuzzling and playing with the attached toy. A layer of durable, woven sisal covers all four sides to entice your kitty to sink her claws right in. It’s sure to save your furniture from becoming a favorite scratching spot. This post even has a hanging ball toy for batting around when it’s time to play. Not only does it take care of the instinctual need to scratch, but this tall post is the perfect place for a full-body stretch. Frisco’s 21-Inch Cat Scratching Post with Toy comes with all the tools you need and an instruction manual so you can assemble it quickly and let your cat get to scratching.",
      13.99,
      1),
  ),
  createCat("flea-trick", "Flea & Tick",
    createProduct(
      "Advantage II Flea Treatment for Large Cats Over 9 lbs",
      "https://img.chewy.com/is/image/catalog/73927_MAIN._AC_SS190_V1533759718_.jpg",
      "Help protect your feline friend from parasitic pests and the potentially harmful diseases they can transmit with Advantage II Flea Treatment for Large Cats. This highly-effective, veterinarian-recommended treatment is specifically formulated to kill all life stages of fleas on contact with no painful biting required. With three-way protection that kills the eggs, larvae and adults, it breaks the flea life-cycle to help prevent re-infestation of your pet and your home. The waterproof formula for kittens and cats 8 weeks or older and weighing over 9 pounds continues working for up to four weeks, even after bathing.",
      58.98,
      2),
    createProduct(
      "Capstar Flea Tablets for Cats 2-25 lbs, 6 count",
      "https://img.chewy.com/is/image/catalog/154856_MAIN._AC_SS190_V1550093517_.jpg",
      "Help keep your cat pest-free with the Capstar Flea Tablets for Cats. Each tablet contains an active ingredient called nitenpyram and helps eliminate fleas in cats and kittens weighing between 2 to 25 pounds. The fast-acting formula starts working within 30 minutes and has been proven to be more than 90% effective in eliminating adult fleas within just hours. That means less itchiness and discomfort for your companion, much faster—and without the mess and odors of a topical solution. Capstar can also help kill adult fleas that may cause flea allergy dermatitis, which often results in uncomfortable, itchy skin. Just give the tablet as directed, and let the formula do the rest. This medication is safe to give your cat once a day with or without his favorite food.",
      28.99,
      12),
    createProduct(
      "Hartz Groomer's Best Flea Comb for Dogs and Cats",
      "https://img.chewy.com/is/image/catalog/132679_MAIN._AC_SS190_V1500907343_.jpg",
      "Kick those fleas to the comb with the Hartz Groomer's Best Flea Comb for Dogs and Cats. Designed with extremely fine teeth, this comb easily removes fleas, flea eggs, and other debris safely and gently with built-in safety tips. You can also use it as a handy tool in your complete grooming arsenal to detangle small mats around delicate areas like your pal’s face and paws. Plus, it has an ergonomically designed handle that maximizes comfort and control so you can enjoy brushing time as much as your pal.",
      3.77,
      33),
  ),
  createCat("crates-pens-gates", "Cat Crates, Pens & Gates",
    createProduct(
      "Frisco Foldable Nonslip Pet Steps",
      "https://img.chewy.com/is/image/catalog/206569_Main._AC_SS190_V1581546800_.jpg",
      "Help your pal get up to their favorite spot on the bed or couch—or your favorite spot, that is. Then, fold it for easy storage. These lightweight, foldable pet steps don’t need to be assembled—you just push the two built-in buttons to fold up, and then again to fold down. Nonslip pads on every step help paws get a grip, and it’s lightweight so you can move it easily. Plus, you can add the included nonskid feet to help keep it in place on slick surfaces like tile or wooden floors. Supports pets of up to 120 pounds, but the steps are perfectly sized for small to medium pets.",
      33.54,
      44),
    createProduct(
      "Frisco Two Door Top Load Plastic Dog & Cat Kennel",
      "https://img.chewy.com/is/image/catalog/122091_MAIN._AC_SS190_V1569020904_.jpg",
      "The Frisco Two Door Top Load Kennel makes it easier to travel with your cat or small dog, keeping her safe and secure when you’re on the go. No matter the final destination, whether it’s the vet, the groomer’s or a campsite for the weekend, this durable, hard-sided carrier offers comfort and protection throughout the journey. It’s easy to assemble, with two halves that lock together to create a cozy spot for relaxing. The wire mesh doors and multiple ventilation holes along the sides and back allow air to flow through freely and give your pet a nice view of the outside. For ease in getting your pet inside, this kennel has a top-loading door that also gives you access to your faithful friend along the way. This feature is especially helpful when you’re traveling by plane—it makes it easy to feed or comfort your pet during the flight. The Frisco Two Door Top Load Kennel is made from 95% pre-consumer recycled plastic content, so it’s eco-friendly and easy to clean. An interior moat helps keep paws dry in case of spills or accidents. Just put your pet’s favorite mat or bed inside, and he’ll feel right at home.",
      31.99,
      21),
    createProduct(
      "Necoichi Portable Stress Free Cat Cage",
      "https://img.chewy.com/is/image/catalog/119032_MAIN._AC_SS190_V1569020525_.jpg",
      "The Necoichi Portable Stress Free Cat Cage is like a portable cat hotel and multi-purpose carrier in one versatile and stylish design. Offering cats a place to curl up whether you’re at home or away, it provides a comforting and secure escape during travel, when guests are over, while moving, and more. It’s also an excellent way to transport cats in the car, with a easy-open design that pops right open and features built-in seat belt straps—making it convenience at its very cutest. The two mesh panel sides allow for breathability and visibility, and can also be rolled down when it’s quiet time.",
      34.36,
      4),
  ),
  createCat("beds", "Beds",
    createProduct(
      "Best Friends by Sheri The Original Calming Shag Vegan Fur Donut Cuddler Cat & Dog Bed",
      "https://img.chewy.com/is/image/catalog/145725_MAIN._AC_SS190_V1566408129_.jpg",
      "Help your furry friend get the restful sleep she deserves with this Luxury Shag Donut Self-Heating pet bed. The round design creates a protective atmosphere, while the bolstered edge gives additional orthopedic support and serves as a paw-sitively purr-fect headrest. Unique insulation layer radiates warmth from your pet’s own body heat. It’s machine washable, dryer-safe and comes in a soft faux-shag material that will keep your pal warm, cozy and comforted.",
      34.95,
      7),
    createProduct(
      "K.T. Manufacturing Purr Padd Cat Bed Mat, 2 count",
      "https://img.chewy.com/is/image/catalog/141224_MAIN._AC_SS190_V1565977333_.jpg",
      "Give your favorite feline a coy place to cuddle up with the K.T. Manufacturing Purr Padd Cat Bed Mat. Made from 100% recycled polyester fibers, this ultra-soft, eco-friendly cat bed works as an insulator to absorb and hold the soothing heat cats love. Its unique “fluff” construction features a natural electrostatic charge that traps dander, hair, dirt, dust and even fleas to help keep your kitty, your furniture and your home clean and tidy. Wherever you choose to place the Purr Pad cat mat is sure to become your furry pal’s new favorite spot to lounge.",
      13.99,
      4),
    createProduct(
      "Petmaker Cozy Kitty Tent Igloo Plush Cat Bed",
      "https://img.chewy.com/is/image/catalog/115860_MAIN._AC_SS190_V1565977136_.jpg",
      "There’s few things a cat loves more than an enclosed space, so your kitty is going to go crazy for the Petmaker Cozy Kitty Tent Igloo Plush Cat Bed. Designed to keep the feline fur babies warm and cozy, the igloo shape has the added bonus of making your cat feel safe. There’s a Cuddle Comfort pillow on the inside for extra-plush lounging, and it’s completely removable for cleaning. The cute and compact design works in any room of the home, and it’s lightweight enough to move around as you or your cat wishes.",
      13.99,
      4),
  ),
  createCat("tech", "Technology",
    createProduct(
      "ScoopFree Original Automatic Cat Litter Box",
      "https://img.chewy.com/is/image/catalog/70727_MAIN._AC_SS190_V1590606071_.jpg",
      "ScoopFree is the original self-cleaning litter box you can leave alone for weeks at a time. It is the only self-cleaning litter box that uses disposable litter trays to provide hands-off convenience and unbeatable odor control. Simply plug in the box and watch it work. The automatic rake system sweeps waste into the covered compartment 20 minutes after your cat uses the litter box. Safety sensors will detect if your cat re-enters the box and the 20-minute timer will reset. The box uses a special crystal litter, packed in a convenient disposable litter tray, that’s 5 times more effective at reducing odor than clay or clumping litters. Your cat will always have a clean, fresh-smelling litter box, and you’ll enjoy a home that’s effortlessly odor-free.",
      139.50,
      2),
    createProduct(
      "Cat Mate C3000 Programmable Automatic Dog & Cat Dry Food Feeder",
      "https://img.chewy.com/is/image/catalog/75260_MAIN._AC_SS190_V1518451033_.jpg",
      `The Cat Mate C3000 feeder is designed to ensure your pet’s recommended dry food allowance, in order to minimize the health risks and costs of overfeeding. Our carefully developed dry food feeder allows you to program up to 3 individually sized meals over a day and will allow meals to be served in advance of their programmed times, if required.
      Alternatively, the feeder may be used manually to serve accurate meals on demand or in a ‘frequent feed’ mode for pets with specific dietary requirements, e.g. diabetes.`,
      139.50,
      12),
    createProduct(
      "Cat Mate C20 2-Bowl Automatic Dog & Cat Feeder, 4-cup",
      "https://img.chewy.com/is/image/catalog/75255_MAIN._AC_SS190_V1525452620_.jpg",
      `The Cat Mate C20 is designed to feed one or two cats, kittens or small dogs when you are away - during the day, evening or over the weekend. Food is kept fresh in two easy-clean compartments sealed by closely fitting lids, and cooled by a built-in ice pack. Just set the timer on each lid to open at the required time, up to 48 hours later.`,
      139.50,
      14),
    createProduct(
      "ScoopFree Top-Entry Ultra Automatic Cat Litter Box",
      "https://img.chewy.com/is/image/catalog/151700_MAIN._AC_SS190_V1590606382_.jpg",
      `Tired of scooping your cat's smelly litter? With the Ultra Automatic box from ScoopFree, you can go hands-free and finally stop breaking a sweat. This innovative, top-entry litter box does all the work for you, keeping itself clean without all that stinky hassle. When your cat crawls in to do his business, litter crystals absorb liquid waste and dehydrate solid waste to destroy odors. Then, an automatic rake sweeps through to push the mess out of sight, out of mind, and out of your nose! It keeps itself clean, without needing you to scoop, clean or refill it for weeks. When it comes time to reload, simply place the lid on the disposable tray and throw it away. The crystal litter is 99% track-free, but, if that's not enough, the top-entry hood is built with a large, grated surface for even more protection against tracking. Plus, an included health counter makes sure you know how often your kitty uses the box—so you can keep a watchful eye on his behavior! ScoopFree makes your life easier, your home cleaner and your cat happier. What could be better?`,
      169.95,
      10),
  ),
]

populateData();