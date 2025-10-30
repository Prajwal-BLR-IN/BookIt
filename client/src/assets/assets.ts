import logo from "./logo.png";
import menuIcon from "./menu icon.svg";
import menuCloseIcon from "./menu close icon.svg";
import type { Experience } from "../types/type";
import arrowIcon from "./back arrow icon.svg";
import tickCircleIcon from "./tick circle.svg";

export const assets = {
  logo,
  menuIcon,
  menuCloseIcon,
  arrowIcon,
  tickCircleIcon,
};

export const experiences: Experience[] = [
  {
    _id: "exp1",
    title: "Nandi Hills",
    location: "Bangalore",
    description:
      "Witness a breathtaking sunrise from the top of Nandi Hills. Enjoy scenic views, fresh air, and a perfect early-morning getaway.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    price: 599,
    availableSlots: [
      { date: "2025-11-02", time: "06:00 AM", totalSlots: 6, bookedCount: 2 },
      { date: "2025-11-03", time: "06:00 AM", totalSlots: 6, bookedCount: 5 },
    ],
  },
  {
    _id: "exp2",
    title: "Kayaking",
    location: "Bangalore",
    description:
      "Paddle through the calm waters of Ulsoor Lake with an instructor-guided kayaking experience suitable for beginners.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 899,
    availableSlots: [
      { date: "2025-11-02", time: "07:00 AM", totalSlots: 10, bookedCount: 6 },
      { date: "2025-11-03", time: "05:30 PM", totalSlots: 10, bookedCount: 8 },
    ],
  },
  {
    _id: "exp3",
    title: "Coffee Plantation",
    location: "Coorg",
    description:
      "Walk through lush coffee estates, learn the art of brewing, and enjoy a refreshing cup of Coorg’s finest coffee.",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919",
    price: 1499,
    availableSlots: [
      { date: "2025-11-05", time: "09:00 AM", totalSlots: 8, bookedCount: 3 },
      { date: "2025-11-06", time: "11:00 AM", totalSlots: 8, bookedCount: 8 },
    ],
  },
  {
    _id: "exp4",
    title: "Rock Climbing",
    location: "Ramanagara",
    description:
      "Challenge yourself with a thrilling rock climbing session in the iconic Sholay hills, suitable for beginners.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    price: 1299,
    availableSlots: [
      { date: "2025-11-04", time: "06:30 AM", totalSlots: 10, bookedCount: 2 },
      { date: "2025-11-05", time: "04:00 PM", totalSlots: 10, bookedCount: 9 },
    ],
  },
  {
    _id: "exp5",
    title: "Night Trek",
    location: "Chikkaballapur",
    description:
      "Start your trek at midnight and reach the top just in time to witness the sunrise above the clouds.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    price: 999,
    availableSlots: [
      { date: "2025-11-02", time: "11:00 PM", totalSlots: 30, bookedCount: 12 },
      { date: "2025-11-03", time: "11:00 PM", totalSlots: 30, bookedCount: 25 },
    ],
  },
  {
    _id: "exp6",
    title: "River Rafting",
    location: "Dandeli, Karnataka",
    description:
      "Experience the thrill of white-water rafting through the Kali River, guided by certified professionals.",
    image: "https://images.unsplash.com/photo-1523430410476-0185cb1f6ff2",
    price: 1999,
    availableSlots: [
      { date: "2025-11-06", time: "09:00 AM", totalSlots: 12, bookedCount: 8 },
      { date: "2025-11-07", time: "02:00 PM", totalSlots: 12, bookedCount: 5 },
    ],
  },
  {
    _id: "exp7",
    title: "Palace Heritage",
    location: "Mysore",
    description:
      "Explore the grandeur of Mysore Palace and dive deep into its royal history on a guided heritage walk.",
    image: "https://images.unsplash.com/photo-1626760079303-ff2b478ff9d0",
    price: 699,
    availableSlots: [
      { date: "2025-11-03", time: "10:00 AM", totalSlots: 20, bookedCount: 5 },
      { date: "2025-11-04", time: "04:00 PM", totalSlots: 20, bookedCount: 17 },
    ],
  },
  {
    _id: "exp8",
    title: "Beach Camping",
    location: "Gokarna",
    description:
      "Enjoy an overnight beach camping experience with bonfire, BBQ, and live music under the stars.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 1799,
    availableSlots: [
      { date: "2025-11-05", time: "06:00 PM", totalSlots: 20, bookedCount: 10 },
      { date: "2025-11-06", time: "06:00 PM", totalSlots: 20, bookedCount: 20 },
    ],
  },
  {
    _id: "exp9",
    title: "Coastal Food Tour",
    location: "Mangalore",
    description:
      "Taste authentic coastal delicacies and explore the city’s famous seafood eateries with a local guide.",
    image: "https://images.unsplash.com/photo-1604152135912-04a553b253b0",
    price: 1199,
    availableSlots: [
      { date: "2025-11-08", time: "12:00 PM", totalSlots: 15, bookedCount: 7 },
      { date: "2025-11-09", time: "07:00 PM", totalSlots: 15, bookedCount: 12 },
    ],
  },
  {
    _id: "exp10",
    title: "Waterfalls Trail",
    location: "Chikmagalur",
    description:
      "Combine the best of Chikmagalur — stunning waterfalls and aromatic coffee estates — in one full-day experience.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1499,
    availableSlots: [
      { date: "2025-11-10", time: "09:00 AM", totalSlots: 10, bookedCount: 5 },
      { date: "2025-11-11", time: "11:00 AM", totalSlots: 10, bookedCount: 10 },
    ],
  },
];
