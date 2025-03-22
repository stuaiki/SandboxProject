export interface DestinationProps {
  imageUrl: string;
  name: string;
  rating: number;
}

export interface HeaderProps {
  userName: string;
}

export interface PlacesListProps {
  address: string;
}

// navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  AIScreen: undefined;
  MapScreen: undefined;
  FavoritesScreen: undefined;
  SearchBar: undefined;
  Login: undefined;
  SignUp: undefined;
  AIPage: undefined;
  Recommendation: { 
    address: string; 
    country?: string;
    state?: string;
    city?: string;
  };
  DetailScreen: { 
    name: string;
    imageUrl: string;
    type: string;
    rating?: number;
    destAddress: string;
    address: string;
  };
};


export type Message = {
  text: string;
  sender: 'user' | 'ai';
};