import {create} from "zustand/index";

interface FavoriteState {
	favorites: IPerson[];
	addFavorite: (person: IPerson) => void;
	removeFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
	favorites: [],
	addFavorite: (person) =>
		set((state) => ({
			favorites: [...state.favorites, person],
		})),
	removeFavorite: (id) =>
		set((state) => ({
			favorites: state.favorites.filter((person) => person.id !== id),
		})),
}));