export interface Division {
  id: string;
  name: string;
  bnName: string;
}

export interface District {
  id: string;
  name: string;
  bnName: string;
  divisionId: string;
  lat: number;
  lng: number;
  upazilas: { id: string; name: string; bnName: string }[];
}

export const DIVISIONS: Division[] = [
  { id: "dhaka", name: "Dhaka", bnName: "ঢাকা" },
  { id: "chattogram", name: "Chattogram", bnName: "চট্টগ্রাম" },
  { id: "rajshahi", name: "Rajshahi", bnName: "রাজশাহী" },
  { id: "khulna", name: "Khulna", bnName: "খুলনা" },
  { id: "barishal", name: "Barishal", bnName: "বরিশাল" },
  { id: "sylhet", name: "Sylhet", bnName: "সিলেট" },
  { id: "rangpur", name: "Rangpur", bnName: "রংপুর" },
  { id: "mymensingh", name: "Mymensingh", bnName: "ময়মনসিংহ" },
];

export const DISTRICTS: District[] = [
  // Dhaka Division
  {
    id: "dhaka",
    name: "Dhaka",
    bnName: "ঢাকা",
    divisionId: "dhaka",
    lat: 23.8103,
    lng: 90.4125,
    upazilas: [
      { id: "dhanmondi", name: "Dhanmondi", bnName: "ধানমন্ডি" },
      { id: "mirpur", name: "Mirpur", bnName: "মিরপুর" },
      { id: "uttara", name: "Uttara", bnName: "উত্তরা" },
      { id: "gulshan", name: "Gulshan", bnName: "গুলশান" },
      { id: "banani", name: "Banani", bnName: "বনানী" },
      { id: "motijheel", name: "Motijheel", bnName: "মতিঝিল" },
      { id: "savar", name: "Savar", bnName: "সাভার" },
      { id: "dhamrai", name: "Dhamrai", bnName: "ধামরাই" },
      { id: "keraniganj", name: "Keraniganj", bnName: "কেরানীগঞ্জ" },
      { id: "mohammadpur", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
      { id: "badda", name: "Badda", bnName: "বাড্ডা" },
      { id: "khilgaon", name: "Khilgaon", bnName: "খিলগাঁও" },
    ],
  },
  {
    id: "gazipur",
    name: "Gazipur",
    bnName: "গাজীপুর",
    divisionId: "dhaka",
    lat: 24.0023,
    lng: 90.4264,
    upazilas: [
      { id: "gazipur-sadar", name: "Gazipur Sadar", bnName: "গাজীপুর সদর" },
      { id: "kaliakair", name: "Kaliakair", bnName: "কালিয়াকৈর" },
      { id: "kapasia", name: "Kapasia", bnName: "কাপাসিয়া" },
      { id: "sreepur", name: "Sreepur", bnName: "শ্রীপুর" },
      { id: "kaliganj", name: "Kaliganj", bnName: "কালীগঞ্জ" },
      { id: "tongi", name: "Tongi", bnName: "টঙ্গী" },
    ],
  },
  {
    id: "narayanganj",
    name: "Narayanganj",
    bnName: "নারায়ণগঞ্জ",
    divisionId: "dhaka",
    lat: 23.6238,
    lng: 90.5000,
    upazilas: [
      { id: "narayanganj-sadar", name: "Narayanganj Sadar", bnName: "নারায়ণগঞ্জ সদর" },
      { id: "bandar", name: "Bandar", bnName: "বন্দর" },
      { id: "rupganj", name: "Rupganj", bnName: "রূপগঞ্জ" },
      { id: "sonargaon", name: "Sonargaon", bnName: "সোনারগাঁও" },
      { id: "araihazar", name: "Araihazar", bnName: "আড়াইহাজার" },
    ],
  },
  {
    id: "tangail",
    name: "Tangail",
    bnName: "টাঙ্গাইল",
    divisionId: "dhaka",
    lat: 24.2513,
    lng: 89.9167,
    upazilas: [
      { id: "tangail-sadar", name: "Tangail Sadar", bnName: "টাঙ্গাইল সদর" },
      { id: "ghatail", name: "Ghatail", bnName: "ঘাটাইল" },
      { id: "madhupur", name: "Madhupur", bnName: "মধুপুর" },
      { id: "mirzapur", name: "Mirzapur", bnName: "মির্জাপুর" },
      { id: "kalihati", name: "Kalihati", bnName: "কালিহাতী" },
      { id: "sakhipur", name: "Sakhipur", bnName: "সখিপুর" },
    ],
  },
  {
    id: "faridpur",
    name: "Faridpur",
    bnName: "ফরিদপুর",
    divisionId: "dhaka",
    lat: 23.6071,
    lng: 89.8429,
    upazilas: [
      { id: "faridpur-sadar", name: "Faridpur Sadar", bnName: "ফরিদপুর সদর" },
      { id: "boalmari", name: "Boalmari", bnName: "বোয়ালমারী" },
      { id: "bhanga", name: "Bhanga", bnName: "ভাঙ্গা" },
      { id: "madhukhali", name: "Madhukhali", bnName: "মধুখালী" },
    ],
  },
  {
    id: "narsingdi",
    name: "Narsingdi",
    bnName: "নরসিংদী",
    divisionId: "dhaka",
    lat: 23.9193,
    lng: 90.7202,
    upazilas: [
      { id: "narsingdi-sadar", name: "Narsingdi Sadar", bnName: "নরসিংদী সদর" },
      { id: "palash", name: "Palash", bnName: "পলাশ" },
      { id: "shibpur", name: "Shibpur", bnName: "শিবপুর" },
      { id: "raipura", name: "Raipura", bnName: "রায়পুরা" },
    ],
  },
  {
    id: "manikganj",
    name: "Manikganj",
    bnName: "মানিকগঞ্জ",
    divisionId: "dhaka",
    lat: 23.8644,
    lng: 90.0047,
    upazilas: [
      { id: "manikganj-sadar", name: "Manikganj Sadar", bnName: "মানিকগঞ্জ সদর" },
      { id: "singair", name: "Singair", bnName: "সিংগাইর" },
      { id: "shibalaya", name: "Shibalaya", bnName: "শিবালয়" },
    ],
  },
  {
    id: "munshiganj",
    name: "Munshiganj",
    bnName: "মুন্সীগঞ্জ",
    divisionId: "dhaka",
    lat: 23.5422,
    lng: 90.5305,
    upazilas: [
      { id: "munshiganj-sadar", name: "Munshiganj Sadar", bnName: "মুন্সীগঞ্জ সদর" },
      { id: "sreenagar", name: "Sreenagar", bnName: "শ্রীনগর" },
      { id: "louhajang", name: "Louhajang", bnName: "লৌহজং" },
    ],
  },
  {
    id: "rajbari",
    name: "Rajbari",
    bnName: "রাজবাড়ী",
    divisionId: "dhaka",
    lat: 23.7574,
    lng: 89.6445,
    upazilas: [
      { id: "rajbari-sadar", name: "Rajbari Sadar", bnName: "রাজবাড়ী সদর" },
      { id: "pangsha", name: "Pangsha", bnName: "পাংশা" },
      { id: "goalanda", name: "Goalanda", bnName: "গোয়ালন্দ" },
    ],
  },
  {
    id: "madaripur",
    name: "Madaripur",
    bnName: "মাদারীপুর",
    divisionId: "dhaka",
    lat: 23.1641,
    lng: 90.1897,
    upazilas: [
      { id: "madaripur-sadar", name: "Madaripur Sadar", bnName: "মাদারীপুর সদর" },
      { id: "shibchar", name: "Shibchar", bnName: "শিবচর" },
      { id: "kalkini", name: "Kalkini", bnName: "কালকিনি" },
    ],
  },
  {
    id: "gopalganj",
    name: "Gopalganj",
    bnName: "গোপালগঞ্জ",
    divisionId: "dhaka",
    lat: 23.0051,
    lng: 89.8266,
    upazilas: [
      { id: "gopalganj-sadar", name: "Gopalganj Sadar", bnName: "গোপালগঞ্জ সদর" },
      { id: "kashiani", name: "Kashiani", bnName: "কাশিয়ানী" },
      { id: "kotalipara", name: "Kotalipara", bnName: "কোটালীপাড়া" },
      { id: "tungipara", name: "Tungipara", bnName: "টুঙ্গিপাড়া" },
    ],
  },
  {
    id: "shariatpur",
    name: "Shariatpur",
    bnName: "শরীয়তপুর",
    divisionId: "dhaka",
    lat: 23.2423,
    lng: 90.4348,
    upazilas: [
      { id: "shariatpur-sadar", name: "Shariatpur Sadar", bnName: "শরীয়তপুর সদর" },
      { id: "naria", name: "Naria", bnName: "নড়িয়া" },
      { id: "damudya", name: "Damudya", bnName: "ডামুড্যা" },
      { id: "zajira", name: "Zajira", bnName: "জাজিরা" },
    ],
  },
  {
    id: "kishoreganj",
    name: "Kishoreganj",
    bnName: "কিশোরগঞ্জ",
    divisionId: "dhaka",
    lat: 24.4449,
    lng: 90.7766,
    upazilas: [
      { id: "kishoreganj-sadar", name: "Kishoreganj Sadar", bnName: "কিশোরগঞ্জ সদর" },
      { id: "bajitpur", name: "Bajitpur", bnName: "বাজিতপুর" },
      { id: "bhairab", name: "Bhairab", bnName: "ভৈরব" },
      { id: "karimganj", name: "Karimganj", bnName: "করিমগঞ্জ" },
    ],
  },

  // Chattogram Division
  {
    id: "chattogram",
    name: "Chattogram",
    bnName: "চট্টগ্রাম",
    divisionId: "chattogram",
    lat: 22.3569,
    lng: 91.7832,
    upazilas: [
      { id: "panchlaish", name: "Panchlaish", bnName: "পাঁচলাইশ" },
      { id: "kotwali", name: "Kotwali", bnName: "কোতোয়ালী" },
      { id: "hathazari", name: "Hathazari", bnName: "হাটহাজারী" },
      { id: "patia", name: "Patia", bnName: "পটিয়া" },
      { id: "sitakunda", name: "Sitakunda", bnName: "সীতাকুণ্ড" },
      { id: "mirsharai", name: "Mirsharai", bnName: "মীরসরাই" },
      { id: "sandwip", name: "Sandwip", bnName: "সন্দ্বীপ" },
      { id: "raozan", name: "Raozan", bnName: "রাউজান" },
    ],
  },
  {
    id: "coxsbazar",
    name: "Cox's Bazar",
    bnName: "কক্সবাজার",
    divisionId: "chattogram",
    lat: 21.4272,
    lng: 92.0058,
    upazilas: [
      { id: "coxsbazar-sadar", name: "Cox's Bazar Sadar", bnName: "কক্সবাজার সদর" },
      { id: "chakaria", name: "Chakaria", bnName: "চকোরিয়া" },
      { id: "teknaf", name: "Teknaf", bnName: "টেকনাফ" },
      { id: "ramu", name: "Ramu", bnName: "রামু" },
      { id: "ukhiya", name: "Ukhiya", bnName: "উখিয়া" },
    ],
  },
  {
    id: "cumilla",
    name: "Cumilla",
    bnName: "কুমিল্লা",
    divisionId: "chattogram",
    lat: 23.4607,
    lng: 91.1809,
    upazilas: [
      { id: "cumilla-adarsha-sadar", name: "Adarsha Sadar", bnName: "আদর্শ সদর" },
      { id: "chandina", name: "Chandina", bnName: "চান্দিনা" },
      { id: "daudkandi", name: "Daudkandi", bnName: "দাউদকান্দি" },
      { id: "laksham", name: "Laksham", bnName: "লাকসাম" },
      { id: "burichang", name: "Burichang", bnName: "বুড়িচং" },
    ],
  },
  {
    id: "feni",
    name: "Feni",
    bnName: "ফেনী",
    divisionId: "chattogram",
    lat: 23.0159,
    lng: 91.3976,
    upazilas: [
      { id: "feni-sadar", name: "Feni Sadar", bnName: "ফেনী সদর" },
      { id: "daganbhuiyan", name: "Daganbhuiyan", bnName: "দাগনভূঁঞা" },
      { id: "sonagazi", name: "Sonagazi", bnName: "সোনাগাজী" },
      { id: "parshuram", name: "Parshuram", bnName: "পরশুরাম" },
    ],
  },
  {
    id: "brahmanbaria",
    name: "Brahmanbaria",
    bnName: "ব্রাহ্মণবাড়িয়া",
    divisionId: "chattogram",
    lat: 23.9608,
    lng: 91.1115,
    upazilas: [
      { id: "brahmanbaria-sadar", name: "Brahmanbaria Sadar", bnName: "ব্রাহ্মণবাড়িয়া সদর" },
      { id: "ashuganj", name: "Ashuganj", bnName: "আশুগঞ্জ" },
      { id: "kasba", name: "Kasba", bnName: "কসবা" },
      { id: "nabinagar", name: "Nabinagar", bnName: "নবীনগর" },
    ],
  },
  {
    id: "chandpur",
    name: "Chandpur",
    bnName: "চাঁদপুর",
    divisionId: "chattogram",
    lat: 23.2333,
    lng: 90.6667,
    upazilas: [
      { id: "chandpur-sadar", name: "Chandpur Sadar", bnName: "চাঁদপুর সদর" },
      { id: "hajiganj", name: "Hajiganj", bnName: "হাজীগঞ্জ" },
      { id: "kachua", name: "Kachua", bnName: "কচুয়া" },
      { id: "matlab-south", name: "Matlab South", bnName: "মতলব দক্ষিণ" },
    ],
  },
  {
    id: "noakhali",
    name: "Noakhali",
    bnName: "নোয়াখালী",
    divisionId: "chattogram",
    lat: 22.8696,
    lng: 91.0994,
    upazilas: [
      { id: "noakhali-sadar", name: "Noakhali Sadar", bnName: "নোয়াখালী সদর" },
      { id: "begumganj", name: "Begumganj", bnName: "বেগমগঞ্জ" },
      { id: "senbagh", name: "Senbagh", bnName: "সেনবাগ" },
      { id: "chhatkhil", name: "Chatkhil", bnName: "চাটখিল" },
      { id: "companiganj", name: "Companiganj", bnName: "কোম্পানীগঞ্জ" },
    ],
  },
  {
    id: "lakshmipur",
    name: "Lakshmipur",
    bnName: "লক্ষ্মীপুর",
    divisionId: "chattogram",
    lat: 22.9425,
    lng: 90.8412,
    upazilas: [
      { id: "lakshmipur-sadar", name: "Lakshmipur Sadar", bnName: "লক্ষ্মীপুর সদর" },
      { id: "raipur", name: "Raipur", bnName: "রায়পুর" },
      { id: "ramganj", name: "Ramganj", bnName: "রামগঞ্জ" },
    ],
  },
  {
    id: "khagrachhari",
    name: "Khagrachhari",
    bnName: "খাগড়াছড়ি",
    divisionId: "chattogram",
    lat: 23.1193,
    lng: 91.9847,
    upazilas: [
      { id: "khagrachhari-sadar", name: "Khagrachhari Sadar", bnName: "খাগড়াছড়ি সদর" },
      { id: "dighinala", name: "Dighinala", bnName: "দীঘিনালা" },
      { id: "ramgarh", name: "Ramgarh", bnName: "রামগড়" },
    ],
  },
  {
    id: "rangamati",
    name: "Rangamati",
    bnName: "রাঙ্গামাটি",
    divisionId: "chattogram",
    lat: 22.7324,
    lng: 92.2985,
    upazilas: [
      { id: "rangamati-sadar", name: "Rangamati Sadar", bnName: "রাঙ্গামাটি সদর" },
      { id: "kaptai", name: "Kaptai", bnName: "কাপ্তাই" },
      { id: "baghaichhari", name: "Baghaichhari", bnName: "বাঘাইছড়ি" },
    ],
  },
  {
    id: "bandarban",
    name: "Bandarban",
    bnName: "বান্দরবান",
    divisionId: "chattogram",
    lat: 22.1953,
    lng: 92.2184,
    upazilas: [
      { id: "bandarban-sadar", name: "Bandarban Sadar", bnName: "বান্দরবান সদর" },
      { id: "thanchi", name: "Thanchi", bnName: "থানচি" },
      { id: "rowangchhari", name: "Rowangchhari", bnName: "রোয়াংছড়ি" },
      { id: "lama", name: "Lama", bnName: "লামা" },
    ],
  },

  // Rajshahi Division
  {
    id: "rajshahi",
    name: "Rajshahi",
    bnName: "রাজশাহী",
    divisionId: "rajshahi",
    lat: 24.3745,
    lng: 88.6042,
    upazilas: [
      { id: "boalia", name: "Boalia", bnName: "বোয়ালিয়া" },
      { id: "motihar", name: "Motihar", bnName: "মতিহার" },
      { id: "rajpara", name: "Rajpara", bnName: "রাজপাড়া" },
      { id: "paba", name: "Paba", bnName: "পবা" },
      { id: "godagari", name: "Godagari", bnName: "গোদাগাড়ী" },
      { id: "bagha", name: "Bagha", bnName: "বাঘা" },
    ],
  },
  {
    id: "bogra",
    name: "Bogura",
    bnName: "বগুড়া",
    divisionId: "rajshahi",
    lat: 24.8465,
    lng: 89.3777,
    upazilas: [
      { id: "bogura-sadar", name: "Bogura Sadar", bnName: "বগুড়া সদর" },
      { id: "shibganj", name: "Shibganj", bnName: "শিবগঞ্জ" },
      { id: "sherpur", name: "Sherpur", bnName: "শেরপুর" },
      { id: "shajahanpur", name: "Shajahanpur", bnName: "শাজাহানপুর" },
    ],
  },
  {
    id: "pabna",
    name: "Pabna",
    bnName: "পাবনা",
    divisionId: "rajshahi",
    lat: 24.0108,
    lng: 89.2444,
    upazilas: [
      { id: "pabna-sadar", name: "Pabna Sadar", bnName: "পাবনা সদর" },
      { id: "ishwardi", name: "Ishwardi", bnName: "ঈশ্বরদী" },
      { id: "beran", name: "Bera", bnName: "বেড়া" },
      { id: "santhia", name: "Santhia", bnName: "সাঁথিয়া" },
    ],
  },
  {
    id: "sirajganj",
    name: "Sirajganj",
    bnName: "সিরাজগঞ্জ",
    divisionId: "rajshahi",
    lat: 24.4534,
    lng: 89.7008,
    upazilas: [
      { id: "sirajganj-sadar", name: "Sirajganj Sadar", bnName: "সিরাজগঞ্জ সদর" },
      { id: "shahjadpur", name: "Shahjadpur", bnName: "শাহজাদপুর" },
      { id: "ullapara", name: "Ullapara", bnName: "উল্লাপাড়া" },
      { id: "belkuchi", name: "Belkuchi", bnName: "বেলকুচি" },
    ],
  },
  {
    id: "naogaon",
    name: "Naogaon",
    bnName: "নওগাঁ",
    divisionId: "rajshahi",
    lat: 24.8103,
    lng: 88.9416,
    upazilas: [
      { id: "naogaon-sadar", name: "Naogaon Sadar", bnName: "নওগাঁ সদর" },
      { id: "patnitala", name: "Patnitala", bnName: "পত্নীতলা" },
      { id: "manda", name: "Manda", bnName: "মান্দা" },
    ],
  },
  {
    id: "natore",
    name: "Natore",
    bnName: "নাটোর",
    divisionId: "rajshahi",
    lat: 24.4206,
    lng: 89.0003,
    upazilas: [
      { id: "natore-sadar", name: "Natore Sadar", bnName: "নাটোর সদর" },
      { id: "singra", name: "Singra", bnName: "সিংড়া" },
      { id: "bagatipara", name: "Bagatipara", bnName: "বাগাতিপাড়া" },
    ],
  },
  {
    id: "chapai-nawabganj",
    name: "Chapai Nawabganj",
    bnName: "চাঁপাইনবাবগঞ্জ",
    divisionId: "rajshahi",
    lat: 24.5965,
    lng: 88.2776,
    upazilas: [
      { id: "chapai-sadar", name: "Chapai Sadar", bnName: "সদর" },
      { id: "shibganj-cn", name: "Shibganj", bnName: "শিবগঞ্জ" },
      { id: "nachole", name: "Nachole", bnName: "নাচোল" },
    ],
  },
  {
    id: "joypurhat",
    name: "Joypurhat",
    bnName: "জয়পুরহাট",
    divisionId: "rajshahi",
    lat: 25.1015,
    lng: 89.0277,
    upazilas: [
      { id: "joypurhat-sadar", name: "Joypurhat Sadar", bnName: "জয়পুরহাট সদর" },
      { id: "panchbibi", name: "Panchbibi", bnName: "পাঁচবিবি" },
      { id: "kalai", name: "Kalai", bnName: "কালাই" },
    ],
  },

  // Khulna Division
  {
    id: "khulna",
    name: "Khulna",
    bnName: "খুলনা",
    divisionId: "khulna",
    lat: 22.8456,
    lng: 89.5403,
    upazilas: [
      { id: "khulna-sadar", name: "Khulna Sadar", bnName: "খুলনা সদর" },
      { id: "sonadanga", name: "Sonadanga", bnName: "সোনাডাঙ্গা" },
      { id: "khalishpur", name: "Khalishpur", bnName: "খালিশপুর" },
      { id: "daulatpur", name: "Daulatpur", bnName: "দৌলতপুর" },
      { id: "dumuria", name: "Dumuria", bnName: "ডুমুরিয়া" },
      { id: "paikgachha", name: "Paikgachha", bnName: "পাইকগাছা" },
    ],
  },
  {
    id: "jashore",
    name: "Jashore",
    bnName: "যশোর",
    divisionId: "khulna",
    lat: 23.1664,
    lng: 89.2081,
    upazilas: [
      { id: "jashore-sadar", name: "Jashore Sadar", bnName: "যশোর সদর" },
      { id: "jhikargachha", name: "Jhikargachha", bnName: "ঝিকরগাছা" },
      { id: "abhaynagar", name: "Abhaynagar", bnName: "অভয়নগর" },
      { id: "keshabpur", name: "Keshabpur", bnName: "কেশবপুর" },
    ],
  },
  {
    id: "kushtia",
    name: "Kushtia",
    bnName: "কুষ্টিয়া",
    divisionId: "khulna",
    lat: 23.9013,
    lng: 89.1205,
    upazilas: [
      { id: "kushtia-sadar", name: "Kushtia Sadar", bnName: "কুষ্টিয়া সদর" },
      { id: "kumarkhali", name: "Kumarkhali", bnName: "কুমারখালী" },
      { id: "bheramara", name: "Bheramara", bnName: "ভেড়ামারা" },
    ],
  },
  {
    id: "satkhira",
    name: "Satkhira",
    bnName: "সাতক্ষীরা",
    divisionId: "khulna",
    lat: 22.7185,
    lng: 89.0705,
    upazilas: [
      { id: "satkhira-sadar", name: "Satkhira Sadar", bnName: "সাতক্ষীরা সদর" },
      { id: "kalaroa", name: "Kalaroa", bnName: "কলারোয়া" },
      { id: "shyamnagar", name: "Shyamnagar", bnName: "শ্যামনগর" },
    ],
  },
  {
    id: "bagerhat",
    name: "Bagerhat",
    bnName: "বাগেরহাট",
    divisionId: "khulna",
    lat: 22.6516,
    lng: 89.7859,
    upazilas: [
      { id: "bagerhat-sadar", name: "Bagerhat Sadar", bnName: "বাগেরহাট সদর" },
      { id: "mongla", name: "Mongla", bnName: "মোংলা" },
      { id: "fakirhat", name: "Fakirhat", bnName: "ফকিরহাট" },
    ],
  },
  {
    id: "jhenaidah",
    name: "Jhenaidah",
    bnName: "ঝিনাইদহ",
    divisionId: "khulna",
    lat: 23.5450,
    lng: 89.1726,
    upazilas: [
      { id: "jhenaidah-sadar", name: "Jhenaidah Sadar", bnName: "ঝিনাইদহ সদর" },
      { id: "kaliganj-jh", name: "Kaliganj", bnName: "কালীগঞ্জ" },
      { id: "shailkupa", name: "Shailkupa", bnName: "শৈলকূপা" },
    ],
  },
  {
    id: "chuadanga",
    name: "Chuadanga",
    bnName: "চুয়াডাঙ্গা",
    divisionId: "khulna",
    lat: 23.6402,
    lng: 88.8418,
    upazilas: [
      { id: "chuadanga-sadar", name: "Chuadanga Sadar", bnName: "চুয়াডাঙ্গা সদর" },
      { id: "damurhuda", name: "Damurhuda", bnName: "দামুড়হুদা" },
      { id: "alamdanga", name: "Alamdanga", bnName: "আলমডাঙ্গা" },
    ],
  },
  {
    id: "magura",
    name: "Magura",
    bnName: "মাগুরা",
    divisionId: "khulna",
    lat: 23.4873,
    lng: 89.4199,
    upazilas: [
      { id: "magura-sadar", name: "Magura Sadar", bnName: "মাগুরা সদর" },
      { id: "sreepur-mg", name: "Sreepur", bnName: "শ্রীপুর" },
      { id: "mohammadpur-mg", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
    ],
  },
  {
    id: "meherpur",
    name: "Meherpur",
    bnName: "মেহেরপুর",
    divisionId: "khulna",
    lat: 23.7622,
    lng: 88.6318,
    upazilas: [
      { id: "meherpur-sadar", name: "Meherpur Sadar", bnName: "মেহেরপুর সদর" },
      { id: "gangni", name: "Gangni", bnName: "গাংনী" },
      { id: "mujibnagar", name: "Mujibnagar", bnName: "মুজিবনগর" },
    ],
  },
  {
    id: "narail",
    name: "Narail",
    bnName: "নড়াইল",
    divisionId: "khulna",
    lat: 23.1725,
    lng: 89.5127,
    upazilas: [
      { id: "narail-sadar", name: "Narail Sadar", bnName: "নড়াইল সদর" },
      { id: "lohagaran", name: "Lohagara", bnName: "লোহাগড়া" },
      { id: "kalia", name: "Kalia", bnName: "কালিয়া" },
    ],
  },

  // Barishal Division
  {
    id: "barishal",
    name: "Barishal",
    bnName: "বরিশাল",
    divisionId: "barishal",
    lat: 22.7010,
    lng: 90.3535,
    upazilas: [
      { id: "barishal-sadar", name: "Barishal Sadar", bnName: "বরিশাল সদর" },
      { id: "bakerganj", name: "Bakerganj", bnName: "বাকেরগঞ্জ" },
      { id: "babuganj", name: "Babuganj", bnName: "বাবুগঞ্জ" },
      { id: "wazirpur", name: "Wazirpur", bnName: "উজিরপুর" },
      { id: "banaripara", name: "Banaripara", bnName: "বানারীপাড়া" },
      { id: "gournadi", name: "Gournadi", bnName: "গৌরনদী" },
    ],
  },
  {
    id: "bhola",
    name: "Bhola",
    bnName: "ভোলা",
    divisionId: "barishal",
    lat: 22.6859,
    lng: 90.6482,
    upazilas: [
      { id: "bhola-sadar", name: "Bhola Sadar", bnName: "ভোলা সদর" },
      { id: "borhanuddin", name: "Borhanuddin", bnName: "বোরহানউদ্দিন" },
      { id: "char-fasson", name: "Char Fasson", bnName: "চরফ্যাশন" },
      { id: "lalmohan", name: "Lalmohan", bnName: "লালমোহন" },
    ],
  },
  {
    id: "patuakhali",
    name: "Patuakhali",
    bnName: "পটুয়াখালী",
    divisionId: "barishal",
    lat: 22.3596,
    lng: 90.3299,
    upazilas: [
      { id: "patuakhali-sadar", name: "Patuakhali Sadar", bnName: "পটুয়াখালী সদর" },
      { id: "kalapara", name: "Kalapara", bnName: "কলাপাড়া" },
      { id: "galachipa", name: "Galachipa", bnName: "গলাচিপা" },
      { id: "bauphal", name: "Bauphal", bnName: "বাউফল" },
    ],
  },
  {
    id: "pirojpur",
    name: "Pirojpur",
    bnName: "পিরোজপুর",
    divisionId: "barishal",
    lat: 22.5841,
    lng: 89.9720,
    upazilas: [
      { id: "pirojpur-sadar", name: "Pirojpur Sadar", bnName: "পিরোজপুর সদর" },
      { id: "mathbaria", name: "Mathbaria", bnName: "মঠবাড়িয়া" },
      { id: "bhandaria", name: "Bhandaria", bnName: "ভাণ্ডারিয়া" },
      { id: "nazirpur", name: "Nazirpur", bnName: "নাজিরপুর" },
    ],
  },
  {
    id: "barguna",
    name: "Barguna",
    bnName: "বরগুনা",
    divisionId: "barishal",
    lat: 22.0953,
    lng: 90.1121,
    upazilas: [
      { id: "barguna-sadar", name: "Barguna Sadar", bnName: "বরগুনা সদর" },
      { id: "amtali", name: "Amtali", bnName: "আমতলী" },
      { id: "patharghata", name: "Patharghata", bnName: "পাথরঘাটা" },
    ],
  },
  {
    id: "jhalokati",
    name: "Jhalokati",
    bnName: "ঝালকাঠি",
    divisionId: "barishal",
    lat: 22.6406,
    lng: 90.1987,
    upazilas: [
      { id: "jhalokati-sadar", name: "Jhalokati Sadar", bnName: "ঝালকাঠি সদর" },
      { id: "nalchity", name: "Nalchity", bnName: "নলছিটি" },
      { id: "rajapur", name: "Rajapur", bnName: "রাজাপুর" },
    ],
  },

  // Sylhet Division
  {
    id: "sylhet",
    name: "Sylhet",
    bnName: "সিলেট",
    divisionId: "sylhet",
    lat: 24.8949,
    lng: 91.8687,
    upazilas: [
      { id: "sylhet-sadar", name: "Sylhet Sadar", bnName: "সিলেট সদর" },
      { id: "beanibazar", name: "Beanibazar", bnName: "বিয়ানীবাজার" },
      { id: "golapganj", name: "Golapganj", bnName: "গোলাপগঞ্জ" },
      { id: "south-surma", name: "South Surma", bnName: "দক্ষিণ সুরমা" },
      { id: "bishwanath", name: "Bishwanath", bnName: "বিশ্বনাথ" },
      { id: "gowainghat", name: "Gowainghat", bnName: "গোয়াইনঘাট" },
    ],
  },
  {
    id: "moulvibazar",
    name: "Moulvibazar",
    bnName: "মৌলভীবাজার",
    divisionId: "sylhet",
    lat: 24.4829,
    lng: 91.7774,
    upazilas: [
      { id: "moulvibazar-sadar", name: "Moulvibazar Sadar", bnName: "মৌলভীবাজার সদর" },
      { id: "sreemangal", name: "Sreemangal", bnName: "শ্রীমঙ্গল" },
      { id: "kamalganj", name: "Kamalganj", bnName: "কমলগঞ্জ" },
      { id: "kulaura", name: "Kulaura", bnName: "কুলাউড়া" },
    ],
  },
  {
    id: "habiganj",
    name: "Habiganj",
    bnName: "হবিগঞ্জ",
    divisionId: "sylhet",
    lat: 24.3749,
    lng: 91.4155,
    upazilas: [
      { id: "habiganj-sadar", name: "Habiganj Sadar", bnName: "হবিগঞ্জ সদর" },
      { id: "madhabpur", name: "Madhabpur", bnName: "মাধবপুর" },
      { id: "nabiganj", name: "Nabiganj", bnName: "নবীগঞ্জ" },
      { id: "chunarughat", name: "Chunarughat", bnName: "চুনারুঘাট" },
    ],
  },
  {
    id: "sunamganj",
    name: "Sunamganj",
    bnName: "সুনামগঞ্জ",
    divisionId: "sylhet",
    lat: 25.0658,
    lng: 91.3950,
    upazilas: [
      { id: "sunamganj-sadar", name: "Sunamganj Sadar", bnName: "সুনামগঞ্জ সদর" },
      { id: "chhatak", name: "Chhatak", bnName: "ছাতক" },
      { id: "jagannathpur", name: "Jagannathpur", bnName: "জগন্নাথপুর" },
      { id: "tahirpur", name: "Tahirpur", bnName: "তাহিরপুর" },
    ],
  },

  // Rangpur Division
  {
    id: "rangpur",
    name: "Rangpur",
    bnName: "রংপুর",
    divisionId: "rangpur",
    lat: 25.7439,
    lng: 89.2752,
    upazilas: [
      { id: "rangpur-sadar", name: "Rangpur Sadar", bnName: "রংপুর সদর" },
      { id: "pirganj-rp", name: "Pirganj", bnName: "পীরগঞ্জ" },
      { id: "mithapukur", name: "Mithapukur", bnName: "মিঠাপুকুর" },
      { id: "badarganj", name: "Badarganj", bnName: "বদরগঞ্জ" },
      { id: "gangachara", name: "Gangachara", bnName: "গংগাচড়া" },
    ],
  },
  {
    id: "dinajpur",
    name: "Dinajpur",
    bnName: "দিনাজপুর",
    divisionId: "rangpur",
    lat: 25.6217,
    lng: 88.6355,
    upazilas: [
      { id: "dinajpur-sadar", name: "Dinajpur Sadar", bnName: "দিনাজপুর সদর" },
      { id: "birganj", name: "Birganj", bnName: "বীরগঞ্জ" },
      { id: "parbatipur", name: "Parbatipur", bnName: "পার্বতীপুর" },
      { id: "fulbari", name: "Fulbari", bnName: "ফুলবাড়ী" },
    ],
  },
  {
    id: "kurigram",
    name: "Kurigram",
    bnName: "কুড়িগ্রাম",
    divisionId: "rangpur",
    lat: 25.8072,
    lng: 89.6295,
    upazilas: [
      { id: "kurigram-sadar", name: "Kurigram Sadar", bnName: "কুড়িগ্রাম সদর" },
      { id: "ulipur", name: "Ulipur", bnName: "উলিপুর" },
      { id: "nageshwari", name: "Nageshwari", bnName: "নাগেশ্বরী" },
      { id: "chilmari", name: "Chilmari", bnName: "চিলমারী" },
    ],
  },
  {
    id: "gaibandha",
    name: "Gaibandha",
    bnName: "গাইবান্ধা",
    divisionId: "rangpur",
    lat: 25.3288,
    lng: 89.5408,
    upazilas: [
      { id: "gaibandha-sadar", name: "Gaibandha Sadar", bnName: "গাইবান্ধা সদর" },
      { id: "govindaganj", name: "Gobindaganj", bnName: "গোবিন্দগঞ্জ" },
      { id: "palashbari", name: "Palashbari", bnName: "পলাশবাড়ী" },
      { id: "sundarganj", name: "Sundarganj", bnName: "সুন্দরগঞ্জ" },
    ],
  },
  {
    id: "nilphamari",
    name: "Nilphamari",
    bnName: "নীলফামারী",
    divisionId: "rangpur",
    lat: 25.9318,
    lng: 88.8560,
    upazilas: [
      { id: "nilphamari-sadar", name: "Nilphamari Sadar", bnName: "নীলফামারী সদর" },
      { id: "saidpur", name: "Saidpur", bnName: "সৈয়দপুর" },
      { id: "domar", name: "Domar", bnName: "ডোমার" },
      { id: "jaldhaka", name: "Jaldhaka", bnName: "জলঢাকা" },
    ],
  },
  {
    id: "panchagarh",
    name: "Panchagarh",
    bnName: "পঞ্চগড়",
    divisionId: "rangpur",
    lat: 26.3411,
    lng: 88.5542,
    upazilas: [
      { id: "panchagarh-sadar", name: "Panchagarh Sadar", bnName: "পঞ্চগড় সদর" },
      { id: "tetulia", name: "Tetulia", bnName: "তেঁতুলিয়া" },
      { id: "boda", name: "Boda", bnName: "বোদা" },
    ],
  },
  {
    id: "thakurgaon",
    name: "Thakurgaon",
    bnName: "ঠাকুরগাঁও",
    divisionId: "rangpur",
    lat: 26.0337,
    lng: 88.4617,
    upazilas: [
      { id: "thakurgaon-sadar", name: "Thakurgaon Sadar", bnName: "ঠাকুরগাঁও সদর" },
      { id: "pirganj-tg", name: "Pirganj", bnName: "পীরগঞ্জ" },
      { id: "ranisankail", name: "Ranisankail", bnName: "রাণীশংকৈল" },
    ],
  },
  {
    id: "lalmonirhat",
    name: "Lalmonirhat",
    bnName: "লালমনিরহাট",
    divisionId: "rangpur",
    lat: 25.9923,
    lng: 89.2847,
    upazilas: [
      { id: "lalmonirhat-sadar", name: "Lalmonirhat Sadar", bnName: "লালমনিরহাট সদর" },
      { id: "patgram", name: "Patgram", bnName: "পাটগ্রাম" },
      { id: "hatibandha", name: "Hatibandha", bnName: "হাতীবান্ধা" },
    ],
  },

  // Mymensingh Division
  {
    id: "mymensingh",
    name: "Mymensingh",
    bnName: "ময়মনসিংহ",
    divisionId: "mymensingh",
    lat: 24.7471,
    lng: 90.4203,
    upazilas: [
      { id: "mymensingh-sadar", name: "Mymensingh Sadar", bnName: "ময়মনসিংহ সদর" },
      { id: "muktagachha", name: "Muktagachha", bnName: "মুক্তাগাছা" },
      { id: "trishal", name: "Trishal", bnName: "ত্রিশাল" },
      { id: "bhaluka", name: "Bhaluka", bnName: "ভালুকা" },
      { id: "gaffargaon", name: "Gaffargaon", bnName: "গফরগাঁও" },
      { id: "fulbaria", name: "Fulbaria", bnName: "ফুলবাড়িয়া" },
    ],
  },
  {
    id: "jamalpur",
    name: "Jamalpur",
    bnName: "জামালপুর",
    divisionId: "mymensingh",
    lat: 24.9375,
    lng: 89.9378,
    upazilas: [
      { id: "jamalpur-sadar", name: "Jamalpur Sadar", bnName: "জামালপুর সদর" },
      { id: "sarishabari", name: "Sarishabari", bnName: "সরিষাবাড়ী" },
      { id: "islampur", name: "Islampur", bnName: "ইসলামপুর" },
      { id: "dewanganj", name: "Dewanganj", bnName: "দেওয়ানগঞ্জ" },
    ],
  },
  {
    id: "netrokona",
    name: "Netrokona",
    bnName: "নেত্রকোণা",
    divisionId: "mymensingh",
    lat: 24.8837,
    lng: 90.7279,
    upazilas: [
      { id: "netrokona-sadar", name: "Netrokona Sadar", bnName: "নেত্রকোণা সদর" },
      { id: "kandua", name: "Kendua", bnName: "কেন্দুয়া" },
      { id: "durgapur", name: "Durgapur", bnName: "দুর্গাপুর" },
      { id: "mohangonj", name: "Mohanganj", bnName: "মোহনগঞ্জ" },
    ],
  },
  {
    id: "sherpur-dist",
    name: "Sherpur",
    bnName: "শেরপুর",
    divisionId: "mymensingh",
    lat: 25.0205,
    lng: 90.0153,
    upazilas: [
      { id: "sherpur-sadar", name: "Sherpur Sadar", bnName: "শেরপুর সদর" },
      { id: "nakla", name: "Nakla", bnName: "নকলা" },
      { id: "nalitabari", name: "Nalitabari", bnName: "নালিতাবাড়ী" },
      { id: "jhenaigati", name: "Jhenaigati", bnName: "ঝিনাইগাতী" },
    ],
  },
];

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export const BLOOD_COMPATIBILITY: Record<
  BloodGroup,
  { canDonateTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }
> = {
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
  },
  "A-": {
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
  },
  "B-": {
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  "AB-": {
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
  },
  "O+": {
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
  },
  "O-": {
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"],
  },
};

/**
 * Calculates eligibility based on national 90-day (3 months) cooldown policy.
 */
export function calculateEligibility(lastDonationDate: string | null): {
  isEligible: boolean;
  nextEligibleDate: string;
  daysRemaining: number;
} {
  if (!lastDonationDate) {
    return {
      isEligible: true,
      nextEligibleDate: new Date().toISOString().split("T")[0],
      daysRemaining: 0,
    };
  }

  const lastDate = new Date(lastDonationDate);
  const nextEligible = new Date(lastDate);
  nextEligible.setDate(nextEligible.getDate() + 90);

  const now = new Date();
  const diffTime = nextEligible.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isEligible = daysRemaining <= 0;

  return {
    isEligible,
    nextEligibleDate: nextEligible.toISOString().split("T")[0],
    daysRemaining: Math.max(0, daysRemaining),
  };
}

export function formatBnDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    const enDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    const day = d.getDate().toString().replace(/\d/g, (x) => bnDigits[enDigits.indexOf(x)]);
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString().replace(/\d/g, (x) => bnDigits[enDigits.indexOf(x)]);

    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}

export function toBnNumber(num: number | string): string {
  const enDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (x) => bnDigits[enDigits.indexOf(x)] || x);
}
