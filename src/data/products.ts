export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  oldPrice?: number;
  onSale: boolean;
  category: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lé Perfume Aroma",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: 14500,
    oldPrice: 16500,
    onSale: true,
    category: "Floral"
  },
  {
    id: 2,
    name: "Midnight Rose",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: 12000,
    onSale: false,
    category: "Floral"
  },
  {
    id: 3,
    name: "Harrel Scent",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: 10500,
    oldPrice: 14000,
    onSale: true,
    category: "Spicy"
  },
  {
    id: 4,
    name: "Oceanic Mist",
    image: "https://images.unsplash.com/photo-1616948055662-2330a383d22a?auto=format&fit=crop&q=80&w=400",
    rating: 3,
    price: 9800,
    onSale: false,
    category: "Aquatic"
  },
  {
    id: 5,
    name: "Gold Essence",
    image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: 18500,
    onSale: false,
    category: "Oriental"
  },
  {
    id: 6,
    name: "Royal Oud",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: 17500,
    oldPrice: 20000,
    onSale: true,
    category: "Oriental"
  },
  {
    id: 7,
    name: "Night Bloom",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: 19500,
    onSale: false,
    category: "Floral"
  },
  {
    id: 8,
    name: "Velvet Amber",
    image: "https://images.unsplash.com/photo-1557170334-a7c3a4e2ef38?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: 16800,
    onSale: false,
    category: "Spicy"
  },
  {
    id: 101,
    name: "Golden Sands",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: 15500,
    onSale: false,
    category: "Oriental",
    isNew: true
  },
  {
    id: 102,
    name: "Summer Breeze",
    image: "https://images.unsplash.com/photo-1557170334-a7c3a4e2ef38?auto=format&fit=crop&q=80&w=400",
    rating: 4,
    price: 11500,
    oldPrice: 13500,
    onSale: true,
    category: "Aquatic",
    isNew: true
  },
  {
    id: 103,
    name: "Oud Royale",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400",
    rating: 5,
    price: 25000,
    onSale: false,
    category: "Oriental",
    isNew: true
  }
];

export const categories = [
  "All Products",
  "Floral",
  "Spicy",
  "Aquatic",
  "Oriental",
  "Woody",
  "Citrus"
];
