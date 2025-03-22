export interface DestinationProps {
  imageUrl: string;
  name: string;
  rating: number;
}

export interface HeaderProps {
  userName: string;
}

export interface SightseeingListProps {
  address: string;
}

// navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  AIScreen: undefined;
  MapScreen: undefined;
  FavoritesScreen: undefined;
  SearchBar: undefined;
  Recommendation: { 
    address: string; 
    country?: string;
    state?: string;
    city?: string;
  };  // Add country, state, and city as optional params
};



