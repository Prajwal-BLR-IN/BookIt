export interface Slot {
  date: string;
  time: string;
  totalSlots: number;
  bookedCount: number;
  remaining?: number;
}

export interface Experience {
  _id?: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  availableSlots: Slot[];
}
