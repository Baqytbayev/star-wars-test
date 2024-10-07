'use client';

import {useFavoriteStore} from "@/store/store";

export default function Favorite() {
	const favorites = useFavoriteStore((state) => state.favorites);
	const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
	
	if (favorites.length === 0) {
		return <div>Нет избранных персонажей</div>;
	}
	
	return (
		<div className="flex flex-col items-center justify-center bg-blue-200 min-h-screen w-full p-4">
			<h1 className="text-3xl font-bold text-blue-600 mb-6">Избранные персонажи</h1>
			<div className="grid grid-cols-1 gap-6 w-full max-w-3xl">
				{favorites.map((person) => (
					<div
						key={person.id}
						className="flex flex-col gap-4 border border-blue-400 p-6 rounded-lg bg-white shadow-lg"
					>
						<p className="text-2xl font-bold text-blue-600">Имя: {person.name}</p>
						<p className="text-lg text-gray-700">
							Год рождения: <span className="font-medium">{person.birthYear}</span>
						</p>
						<p className="text-lg text-gray-700">
							Пол: <span className="font-medium">{person.gender}</span>
						</p>
						<p className="text-lg text-gray-700">
							Рост: <span className="font-medium">{person.height} см</span>
						</p>
						<p className="text-lg text-gray-700">
							Вес: <span className="font-medium">{person.mass} кг</span>
						</p>
						<p className="text-lg text-blue-600 font-semibold">Фильмы:</p>
						<ul className="list-disc list-inside text-gray-700">
							{person.filmConnection.films.map((film, index) => (
								<li key={index} className="ml-4">
									{film.title}
								</li>
							))}
						</ul>
						<div className="mt-4">
							<button
								onClick={() => removeFavorite(person.id)}
								className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
							>
								Удалить из избранного
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}