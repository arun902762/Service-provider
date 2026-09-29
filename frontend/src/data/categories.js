// src/data/categories.js

export const WORK_CATEGORIES = [
  { id: "electrician", name: "Electrician", hindi: "इलेक्ट्रीशियन", icon: "⚡", subSkills: ["House Wiring", "Fan/Cooler Repair", "Inverter Fitting", "Switchboard"] },
  { id: "plumber", name: "Plumber", hindi: "प्लंबर", icon: "🔧", subSkills: ["Pipe Leakage", "Water Tank Fitting", "Motor Repair", "Bathroom Fitting"] },
  { id: "labour", name: "Labour", hindi: "मज़दूर / हेल्पर", icon: "🧱", subSkills: ["Construction Helper", "Loading/Unloading", "Digging", "Shifting Helper"] },
  { id: "mason", name: "Rajmistri", hindi: "राजमिस्त्री", icon: "🏗️", subSkills: ["Brickwork", "Plaster", "Tiles Fitting", "Flooring"] },
  { id: "carpenter", name: "Carpenter", hindi: "बढ़ई", icon: "🪚", subSkills: ["Door/Window", "Furniture Repair", "Lock Fitting", "Modular Work"] },
  { id: "painter", name: "Painter", hindi: "पेंटर", icon: "🎨", subSkills: ["Wall Putty", "Whitewash", "Wood Polish", "Exterior Paint"] },
  { id: "appliance", name: "AC / Appliance", hindi: "रिपेयर मैकेनिक", icon: "❄️", subSkills: ["AC Service", "Fridge Repair", "RO Purifier", "Washing Machine"] },
  { id: "welder", name: "Welder", hindi: "वेल्डर", icon: "🔩", subSkills: ["Iron Gate/Grill", "Tin Shed", "Railing", "Shutter Repair"] },
  { id: "cleaner", name: "Cleaner", hindi: "सफाई कर्मी", icon: "🧹", subSkills: ["Tank Cleaning", "Sewer Cleaning", "Home Deep Clean", "Bathroom Clean"] }
];

export const INITIAL_WORKERS = [
  {
    id: 1,
    name: "Ramesh Kumar",
    phone: "9876543210",
    city: "Lucknow",
    pincode: "226001",
    dailyWage: 600,
    experience: 5,
    rating: 4.8,
    reviewsCount: 24,
    verified: true,
    skills: ["electrician", "plumber"],
    subSkills: ["Pipe Leakage", "House Wiring", "Fan/Cooler Repair"],
    available: true
  },
  {
    id: 2,
    name: "Suresh Yadav",
    phone: "9123456780",
    city: "Kanpur",
    pincode: "208001",
    dailyWage: 500,
    experience: 4,
    rating: 4.6,
    reviewsCount: 18,
    verified: true,
    skills: ["labour", "mason"],
    subSkills: ["Brickwork", "Construction Helper", "Tiles Fitting"],
    available: true
  },
  {
    id: 3,
    name: "Mahesh Vishwakarma",
    phone: "9988776655",
    city: "Lucknow",
    pincode: "226005",
    dailyWage: 700,
    experience: 7,
    rating: 4.9,
    reviewsCount: 31,
    verified: true,
    skills: ["carpenter", "welder"],
    subSkills: ["Door/Window", "Furniture Repair", "Iron Gate/Grill"],
    available: true
  },
  {
    id: 4,
    name: "Salim Khan",
    phone: "9765432109",
    city: "Varanasi",
    pincode: "221001",
    dailyWage: 650,
    experience: 6,
    rating: 4.7,
    reviewsCount: 15,
    verified: true,
    skills: ["painter", "cleaner"],
    subSkills: ["Wall Putty", "Whitewash", "Home Deep Clean"],
    available: true
  },
  {
    id: 5,
    name: "Deepak Sharma",
    phone: "9654321098",
    city: "Lucknow",
    pincode: "226010",
    dailyWage: 800,
    experience: 5,
    rating: 4.9,
    reviewsCount: 42,
    verified: true,
    skills: ["appliance", "electrician"],
    subSkills: ["AC Service", "Fridge Repair", "RO Purifier", "Inverter Fitting"],
    available: true
  }
];