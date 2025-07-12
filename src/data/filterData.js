export const menustructure = [
  {
    gender: "men",
    sections: {
      shoes: [
        "running",
        "basketball",
        "lifestyle",
        "jordan",
        "sandals & slides",
      ],
      clothing: ["hoodies & sweatshirts", "t-shirts", "jackets"],
      accessories: ["bags", "caps", "socks"],
    },
  },
  {
    gender: "women",
    sections: {
      shoes: ["running", "training", "sandals"],
      clothing: ["sports bras", "leggings", "jackets"],
      accessories: ["bags", "caps", "socks"],
    },
  },
  {
    gender: "kids",
    sections: {
      shoes: ["running", "casual"],
      clothing: ["t-shirts", "jackets"],
      accessories: ["backpacks", "caps"],
    },
  },
];

export const colorsData = [
  { color: "Black", code: "#111" },
  { color: "Blue", code: "#1790C8" },
  { color: "Brown", code: "#8B4513" },
  { color: "Cream", code: "#FFFDD0" },
  { color: "Green", code: "#45B36B" },
  { color: "Gray", code: "#d9d9d9" },
  { color: "Orange", code: "#FFA500" },
  { color: "Pink", code: "#E985BE" },
  { color: "Purple", code: "#8A2BE2" },
  { color: "Red", code: "#EF3E36" },
  { color: "White", code: "#fff" },
  { color: "Yellow", code: "#FFD700" },
];

export const sizes = [
  // Standard sizes
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",

  // Kids sizes
  "10C",
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  "1Y",
  "1.5Y",
  "2Y",
  "2.5Y",
  "3Y",
  "3.5Y",
  "4Y",
  "4.5Y",
  "5Y",
  "5.5Y",

  // Letter sizes
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",

  // Special sizes
  "One Size",
  "Adjustable",
];

export const priceData = [
  { label: "All Prices", value: "0-9999" },
  { label: "Up to $100", value: "0-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200 - $300", value: "200-300" },
  { label: "$300 - $400", value: "300-400" },
  { label: "$400 - $500", value: "400-500" },
  { label: "Over $500", value: "500-9999" },
];

export const sortOrders = [
  { title: "Price: Low to High", order: "price-asc" },
  { title: "Price: High to Low", order: "price-desc" },
  { title: "Name: A to Z", order: "name-asc" },
  { title: "Name: Z to A", order: "name-desc" },
];
