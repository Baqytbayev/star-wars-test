
interface IFilm {
	title: string;
}

interface IPerson {
	id: string;
	name: string;
	birthYear: string;
	gender: string;
	height: string;
	mass: string;
	filmConnection: {
		films: IFilm[];
	};
}