import type { Amenity, OfferDetail, OfferPhoto, OfferSummary, OfferType } from '../models/OfferModels';
import type { OfferHost } from '../models/HostModel';

const buildPhoto = (id: number, folder: string, baseName: string): OfferPhoto => {
  const basePath = `/mockPhotos/offers/${folder}/${baseName}`;
  return {
    id,
    originalUrl: `${basePath}_original.jpg`,
    mediumUrl: `${basePath}_medium.jpg`,
    thumbnailUrl: `${basePath}_thumb.jpg`,
    isCover: true,
    sortOrder: 0,
  };
};

export const mockAmenities: Amenity[] = [
  { id: 1, name: 'WiFi' },
  { id: 2, name: 'Kitchen' },
  { id: 3, name: 'Parking' },
  { id: 4, name: 'Air conditioning' },
  { id: 5, name: 'Washer' },
  { id: 6, name: 'Heating' },
  { id: 7, name: 'TV' },
  { id: 8, name: 'Workspace' },
];

export const mockOfferTypes: OfferType[] = [
  { id: 1, name: 'Apartment' },
  { id: 2, name: 'House' },
  { id: 3, name: 'Cabin' },
  { id: 4, name: 'Hotel' },
];

const nowIso = new Date().toISOString();

export const mockOffers: OfferSummary[] = [
  {
    id: 1,
    title: 'Modern studio with city view',
    pricePerNight: 129,
    maxGuests: 2,
    rooms: 1,
    singleBeds: 0,
    doubleBeds: 1,
    sofas: 0,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Main St 12',
    addressCity: 'Warszawa',
    addressZipCode: '00-001',
    addressCountry: 'Poland',
    addressLatitude: 52.2297,
    addressLongitude: 21.0122,
    fullAddress: 'Main St 12, Warszawa, Poland',
    offerType: mockOfferTypes[0],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[6]],
    coverPhoto: buildPhoto(1, 'offer1', 'offer1_photo_0_1764289814'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 2,
    title: 'Cozy apartment near old town',
    pricePerNight: 149,
    maxGuests: 4,
    rooms: 2,
    singleBeds: 2,
    doubleBeds: 1,
    sofas: 0,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Market Sq 5',
    addressCity: 'Krakow',
    addressZipCode: '31-042',
    addressCountry: 'Poland',
    addressLatitude: 50.0647,
    addressLongitude: 19.945,
    fullAddress: 'Market Sq 5, Krakow, Poland',
    offerType: mockOfferTypes[0],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[2], mockAmenities[7]],
    coverPhoto: buildPhoto(2, 'offer2', 'offer2_photo_0_1764289906'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 3,
    title: 'Family house with garden',
    pricePerNight: 219,
    maxGuests: 6,
    rooms: 3,
    singleBeds: 2,
    doubleBeds: 2,
    sofas: 1,
    bathrooms: 2,
    status: 'Active',
    addressStreet: 'Oak Rd 7',
    addressCity: 'Gdansk',
    addressZipCode: '80-001',
    addressCountry: 'Poland',
    addressLatitude: 54.352,
    addressLongitude: 18.6466,
    fullAddress: 'Oak Rd 7, Gdansk, Poland',
    offerType: mockOfferTypes[1],
    amenities: [mockAmenities[0], mockAmenities[2], mockAmenities[4], mockAmenities[6]],
    coverPhoto: buildPhoto(3, 'offer3', 'offer3_photo_0_1764331330'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 4,
    title: 'Stylish loft in the center',
    pricePerNight: 179,
    maxGuests: 3,
    rooms: 2,
    singleBeds: 1,
    doubleBeds: 1,
    sofas: 1,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Liberty Ave 21',
    addressCity: 'Wroclaw',
    addressZipCode: '50-110',
    addressCountry: 'Poland',
    addressLatitude: 51.1079,
    addressLongitude: 17.0385,
    fullAddress: 'Liberty Ave 21, Wroclaw, Poland',
    offerType: mockOfferTypes[0],
    amenities: [mockAmenities[0], mockAmenities[3], mockAmenities[5], mockAmenities[6]],
    coverPhoto: buildPhoto(4, 'offer4', 'offer4_photo_0_1764331488'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 5,
    title: 'Quiet cabin by the lake',
    pricePerNight: 199,
    maxGuests: 5,
    rooms: 2,
    singleBeds: 2,
    doubleBeds: 1,
    sofas: 1,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Lake Rd 3',
    addressCity: 'Zakopane',
    addressZipCode: '34-500',
    addressCountry: 'Poland',
    addressLatitude: 49.2992,
    addressLongitude: 19.9496,
    fullAddress: 'Lake Rd 3, Zakopane, Poland',
    offerType: mockOfferTypes[2],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[2], mockAmenities[5]],
    coverPhoto: buildPhoto(5, 'offer5', 'offer5_photo_0_1764334090'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 6,
    title: 'Business stay with workspace',
    pricePerNight: 139,
    maxGuests: 2,
    rooms: 1,
    singleBeds: 0,
    doubleBeds: 1,
    sofas: 0,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Tech Blvd 10',
    addressCity: 'Poznan',
    addressZipCode: '60-001',
    addressCountry: 'Poland',
    addressLatitude: 52.4064,
    addressLongitude: 16.9252,
    fullAddress: 'Tech Blvd 10, Poznan, Poland',
    offerType: mockOfferTypes[3],
    amenities: [mockAmenities[0], mockAmenities[7], mockAmenities[6]],
    coverPhoto: buildPhoto(6, 'offer6', 'offer6_photo_0_1764334512'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 7,
    title: 'Charming house near the park',
    pricePerNight: 209,
    maxGuests: 6,
    rooms: 3,
    singleBeds: 2,
    doubleBeds: 2,
    sofas: 1,
    bathrooms: 2,
    status: 'Active',
    addressStreet: 'Green St 8',
    addressCity: 'Lublin',
    addressZipCode: '20-001',
    addressCountry: 'Poland',
    addressLatitude: 51.2465,
    addressLongitude: 22.5684,
    fullAddress: 'Green St 8, Lublin, Poland',
    offerType: mockOfferTypes[1],
    amenities: [mockAmenities[0], mockAmenities[2], mockAmenities[4], mockAmenities[6]],
    coverPhoto: buildPhoto(7, 'offer7', 'offer7_photo_0_1764334622'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 8,
    title: 'Minimalist city apartment',
    pricePerNight: 159,
    maxGuests: 3,
    rooms: 2,
    singleBeds: 1,
    doubleBeds: 1,
    sofas: 0,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'River St 14',
    addressCity: 'Gdynia',
    addressZipCode: '81-001',
    addressCountry: 'Poland',
    addressLatitude: 54.5189,
    addressLongitude: 18.5305,
    fullAddress: 'River St 14, Gdynia, Poland',
    offerType: mockOfferTypes[0],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[3]],
    coverPhoto: buildPhoto(8, 'offer8', 'offer8_photo_0_1764334720'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 9,
    title: 'Comfortable hotel room',
    pricePerNight: 119,
    maxGuests: 2,
    rooms: 1,
    singleBeds: 0,
    doubleBeds: 1,
    sofas: 0,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Central Ave 30',
    addressCity: 'Katowice',
    addressZipCode: '40-001',
    addressCountry: 'Poland',
    addressLatitude: 50.2649,
    addressLongitude: 19.0238,
    fullAddress: 'Central Ave 30, Katowice, Poland',
    offerType: mockOfferTypes[3],
    amenities: [mockAmenities[0], mockAmenities[3], mockAmenities[6]],
    coverPhoto: buildPhoto(9, 'offer9', 'offer9_photo_0_1764334835'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 10,
    title: 'Luxury apartment with balcony',
    pricePerNight: 249,
    maxGuests: 4,
    rooms: 2,
    singleBeds: 0,
    doubleBeds: 2,
    sofas: 1,
    bathrooms: 2,
    status: 'Active',
    addressStreet: 'Skyline 1',
    addressCity: 'Warszawa',
    addressZipCode: '00-101',
    addressCountry: 'Poland',
    addressLatitude: 52.23,
    addressLongitude: 21.01,
    fullAddress: 'Skyline 1, Warszawa, Poland',
    offerType: mockOfferTypes[0],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[3], mockAmenities[6]],
    coverPhoto: buildPhoto(10, 'offer10', 'offer10_photo_0_1764329910'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
  {
    id: 11,
    title: 'Lakeview cabin retreat',
    pricePerNight: 229,
    maxGuests: 5,
    rooms: 2,
    singleBeds: 2,
    doubleBeds: 1,
    sofas: 1,
    bathrooms: 1,
    status: 'Active',
    addressStreet: 'Forest Rd 9',
    addressCity: 'Mazury',
    addressZipCode: '11-500',
    addressCountry: 'Poland',
    addressLatitude: 53.8,
    addressLongitude: 21.7,
    fullAddress: 'Forest Rd 9, Mazury, Poland',
    offerType: mockOfferTypes[2],
    amenities: [mockAmenities[0], mockAmenities[1], mockAmenities[2], mockAmenities[5]],
    coverPhoto: buildPhoto(11, 'offer11', 'offer11_photo_0_1764330234'),
    createdAt: nowIso,
    updatedAt: nowIso,
  },
];

// --- OfferDetail mocks ---
// Photos are served from /public/mockPhotos/ (static assets, no bundling needed).

const OFFER_PHOTO_BASES: Record<string, string[]> = {
  offer1:  ['offer1_photo_0_1764289814'],
  offer2:  ['offer2_photo_0_1764289906','offer2_photo_1_1764289907','offer2_photo_2_1764289907','offer2_photo_3_1764289907','offer2_photo_4_1764289908','offer2_photo_5_1764289908'],
  offer3:  ['offer3_photo_0_1764331330','offer3_photo_1_1764331330','offer3_photo_2_1764331330','offer3_photo_3_1764331330','offer3_photo_4_1764331330'],
  offer4:  ['offer4_photo_0_1764331488','offer4_photo_1_1764331488','offer4_photo_2_1764331488','offer4_photo_3_1764331488','offer4_photo_4_1764331488'],
  offer5:  ['offer5_photo_0_1764334090','offer5_photo_1_1764334090','offer5_photo_2_1764334090','offer5_photo_3_1764334090','offer5_photo_4_1764334090'],
  offer6:  ['offer6_photo_0_1764334512','offer6_photo_1_1764334512','offer6_photo_2_1764334512','offer6_photo_3_1764334512','offer6_photo_4_1764334512'],
  offer7:  ['offer7_photo_0_1764334622','offer7_photo_1_1764334622','offer7_photo_2_1764334622','offer7_photo_3_1764334622','offer7_photo_4_1764334622'],
  offer8:  ['offer8_photo_0_1764334720','offer8_photo_1_1764334720','offer8_photo_2_1764334720','offer8_photo_3_1764334720','offer8_photo_4_1764334720'],
  offer9:  ['offer9_photo_0_1764334835','offer9_photo_1_1764334835','offer9_photo_2_1764334835','offer9_photo_3_1764334835','offer9_photo_4_1764334835'],
  offer10: ['offer10_photo_0_1764329910','offer10_photo_1_1764329911','offer10_photo_2_1764329911','offer10_photo_3_1764329911','offer10_photo_4_1764329911','offer10_photo_5_1764329911'],
  offer11: ['offer11_photo_0_1764330234','offer11_photo_1_1764330234','offer11_photo_2_1764330234','offer11_photo_3_1764330234','offer11_photo_4_1764330234','offer11_photo_5_1764330234'],
};

interface ResolvedPhoto {
  base: string;
  original: string;
  medium: string;
  thumb: string;
}

const resolvePhotosForFolder = (folder: string): ResolvedPhoto[] => {
  const bases = OFFER_PHOTO_BASES[folder] ?? [];
  const root = `/mockPhotos/offers/${folder}`;
  return bases.map((base) => ({
    base,
    original: `${root}/${base}_original.jpg`,
    medium:   `${root}/${base}_medium.jpg`,
    thumb:    `${root}/${base}_thumb.jpg`,
  }));
};

const buildPhotosForOffer = (offerIdSeed: number, folder: string): OfferPhoto[] => {
  const resolved = resolvePhotosForFolder(folder);
  return resolved.map((photo, index) => ({
    id: offerIdSeed * 100 + index,
    originalUrl: photo.original,
    mediumUrl: photo.medium,
    thumbnailUrl: photo.thumb,
    isCover: index === 0,
    sortOrder: index,
  }));
};

const OFFER_HOSTS: Record<number, OfferHost> = {
  1: { id: 1, name: 'Anna Kowalska', avatarUrl: 'https://i.pravatar.cc/120?img=47' },
  2: { id: 2, name: 'Tomasz Nowak', avatarUrl: 'https://i.pravatar.cc/120?img=12' },
  3: { id: 3, name: 'Magdalena Wiśniewska', avatarUrl: 'https://i.pravatar.cc/120?img=32' },
  4: { id: 4, name: 'Piotr Lewandowski', avatarUrl: 'https://i.pravatar.cc/120?img=15' },
  5: { id: 5, name: 'Karolina Dąbrowska', avatarUrl: 'https://i.pravatar.cc/120?img=49' },
  6: { id: 6, name: 'Marcin Wójcik', avatarUrl: 'https://i.pravatar.cc/120?img=18' },
  7: { id: 7, name: 'Joanna Kamińska', avatarUrl: 'https://i.pravatar.cc/120?img=44' },
  8: { id: 8, name: 'Adam Zieliński', avatarUrl: 'https://i.pravatar.cc/120?img=22' },
  9: { id: 9, name: 'Ewa Szymańska', avatarUrl: 'https://i.pravatar.cc/120?img=38' },
  10: { id: 10, name: 'Krzysztof Woźniak', avatarUrl: 'https://i.pravatar.cc/120?img=8' },
  11: { id: 11, name: 'Natalia Kozłowska', avatarUrl: 'https://i.pravatar.cc/120?img=41' },
};

const OFFER_DESCRIPTIONS: Record<number, string> = {
  1: `Welcome to my modern studio in the heart of Warsaw. The space has been carefully designed to combine functionality with a calm, contemporary aesthetic — perfect for solo travellers and couples alike.

You will love the panoramic city view from the floor-to-ceiling windows, the cozy reading nook, and the fully equipped kitchenette. The bed is dressed with premium cotton linens and the bathroom features a rain shower and a curated selection of organic toiletries.

The apartment is located a short tram ride from the Old Town, with countless cafés, restaurants and museums just outside the door. High-speed Wi-Fi and a dedicated workspace make it equally suitable for digital nomads who want to keep working between sightseeing sessions.`,
  2: `Charming apartment just steps from Krakow's Main Square. Two bright bedrooms, a fully equipped kitchen and a living room with original wooden beams make this stay feel like a true home in the historic centre.

Wake up to the sound of horse-drawn carriages, grab a coffee from the bakery downstairs and explore Wawel Castle, the Cloth Hall and the Jewish Quarter — all within a 10 minute walk.

The building has a quiet courtyard so you can rest properly after a long day of sightseeing. We provide an espresso machine, board games and a small library of guidebooks to help you get the most out of your visit.`,
  3: `Spacious family house with a private garden, ideal for travellers with kids. The fenced backyard has a trampoline, a sandpit and a covered terrace with a barbecue.

The interior offers three comfortable bedrooms, two bathrooms and a large open-plan kitchen-diner. We added a baby crib, a high chair and a small play corner free of charge — just let us know in advance and everything will be ready upon arrival.

Gdańsk's old town and the beach are a quick tram ride away, but you might also love the long walks around the nearby Oliwa Park and Zoo.`,
  4: `Stylish loft in the centre of Wrocław with exposed brick walls, designer furniture and a vinyl record collection ready for you to enjoy.

The mezzanine bedroom overlooks the open-plan living room, where you'll find a king-size sofa bed, a smart TV with Netflix, and a small bar with locally sourced craft beers (yes, the first round is on us).

You're a short stroll from the Market Square, the Rynek dwarves and dozens of restaurants serving everything from pierogi to ramen.`,
  5: `A quiet wooden cabin by the lake — your perfect digital detox. Wake up to birdsong, enjoy your morning coffee on the porch and spend the day paddling, hiking or simply reading under the trees.

The cabin sleeps up to five guests in two bedrooms plus a sofa bed in the living area. The wood-burning stove keeps everything warm and cozy when the evenings get chilly.

We provide kayaks, fishing rods and a small library of board games. The nearest village (15 minutes by car) has a supermarket, a bakery and two restaurants.`,
  6: `Business-friendly stay in Poznań's tech district. The apartment was designed for travelling professionals: a proper ergonomic workspace, fibre internet, a Herman Miller chair and a second monitor are all included.

In the evening you can unwind in the rainforest shower, prepare dinner in the fully equipped kitchen or head out to the buzzing restaurant scene that surrounds the building.

We offer self check-in via a smart lock and a flexible cancellation policy — perfect for business trips that change at the last minute.`,
  7: `Charming family house next to a beautiful city park. Three bedrooms, two bathrooms and a sunny patio make this an excellent base for groups of friends or two families travelling together.

The kitchen is fully stocked, the dining table seats eight comfortably and the living room features a large smart TV with international streaming services.

Bikes are available free of charge — Lublin's old town is just a 15 minute ride along a dedicated bike path.`,
  8: `A minimalist apartment in Gdynia, just a few minutes from the seaside boulevard. Clean Scandinavian design, lots of natural light and a smart layout that maximises every square metre.

The bedroom has blackout curtains for great sleep, the bathroom is finished with high-end ceramics and the kitchen has everything you need to cook for two or three guests.

You'll love the morning runs along the coast and the freshly grilled fish at the marina restaurants.`,
  9: `Comfortable hotel-style room in Katowice. Perfect for a short business trip or a quick city break — clean, quiet and centrally located.

We provide a daily housekeeping service, fresh towels every day and a complimentary breakfast in the lobby café (croissants, granola, fresh fruit and barista-made coffee).

The new Spodek arena, the Silesian Museum and the central train station are all within a 10 minute walk.`,
  10: `Luxury apartment on the 24th floor with a spacious balcony overlooking Warsaw's skyline. Floor-to-ceiling windows, marble bathroom, walk-in wardrobe and a designer kitchen with a Miele espresso machine.

The building offers 24/7 concierge, a fitness centre, a 25-metre pool and a spa with sauna and steam room — all free for guests.

Whether you're here for business or for a special weekend, this apartment provides a level of comfort that's hard to match.`,
  11: `Lakeview cabin retreat in the Masurian Lake District. Surrounded by pine forest, with a private pier just steps from the front door — the perfect place to unplug and reconnect with nature.

The cabin features two bedrooms, a sofa bed in the living room, a fully equipped kitchen and a wood-fired sauna. Outside you'll find a fire pit, a hammock and a small motorboat that comes with the rental.

We provide everything you might need for a successful trip: fishing gear, kayaks, board games and detailed maps of nearby hiking trails.`,
};

const detailFromSummary = (summary: OfferSummary): OfferDetail => ({
  id: summary.id,
  title: summary.title,
  description: OFFER_DESCRIPTIONS[summary.id] ?? 'A comfortable stay with everything you need for a great trip.',
  pricePerNight: summary.pricePerNight,
  maxGuests: summary.maxGuests,
  rooms: summary.rooms,
  bathrooms: summary.bathrooms,
  singleBeds: summary.singleBeds,
  doubleBeds: summary.doubleBeds,
  sofas: summary.sofas,
  addressCity: summary.addressCity,
  addressCountry: summary.addressCountry,
  addressLatitude: summary.addressLatitude,
  addressLongitude: summary.addressLongitude,
  fullAddress: summary.fullAddress,
  amenities: summary.amenities,
  photos: buildPhotosForOffer(summary.id, `offer${summary.id}`),
  offerType: summary.offerType,
  rating: 4.2 + ((summary.id * 7) % 8) / 10,
  reviewsCount: 12 + ((summary.id * 13) % 40),
  host: OFFER_HOSTS[summary.id],
});

export const mockOfferDetails: OfferDetail[] = mockOffers.map(detailFromSummary);


