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
  Home: undefined;  // Home screen does not expect any params
  AIScreen: undefined; // AIPage screen does not expect any params
  MapScreen: undefined; // MapScreen does not expect any params
  FavoritesScreen: undefined; // FavoritesScreen does not expect any params
  SearchBar: undefined;  // No parameters for SearchBar screen
  Recommendation: { address: string };  // The Recommendation screen expects an 'address' parameter
};

