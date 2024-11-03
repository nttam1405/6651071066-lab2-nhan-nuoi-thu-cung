export interface Pet {
  id: string;
  name: string;
  species: 'Chó' | 'Mèo' | 'Thỏ';
  breed: string;
  age: string;
  ageMonths: number;
  gender: 'Đực' | 'Cái';
  size: 'Nhỏ' | 'Vừa' | 'Lớn';
  fee: number;
  vaccinated: boolean;
  spayed: boolean;
  personality: string[];
  description: string;
  healthStatus: string;
  location: string;
  shelterName: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl: string;
  dateAdded: string;
}

export type SpeciesFilter = 'Tất cả' | 'Chó' | 'Mèo' | 'Thỏ';
export type SizeFilter = 'Tất cả' | 'Nhỏ' | 'Vừa' | 'Lớn';
export type ViewMode = 'all' | 'favorites';
