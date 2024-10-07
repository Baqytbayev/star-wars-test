'use client';

import {gql} from "@apollo/client";
import url from "@/api/apollo";
import {useEffect, useState} from "react";
import {useFavoriteStore} from "@/store/store";

interface IPerson {
	id: string;
	name: string;
	birthYear: string;
	gender: string;
	height: number;
	mass: number;
	filmConnection: {
		films: { title: string }[];
	};
}

async function getPersonInfo(id: string): Promise<IPerson | null> {
	try {
		const { data } = await url.query({
			query: gql`
        query Character($id: ID!) {
          person(id: $id) {
            id
            name
            birthYear
            gender
            height
            mass
            filmConnection {
              films {
                title
              }
            }
          }
        }
      `,
			variables: { id },
		});
		
		if (!data || !data.person) {
			console.error("Person not found in the response", data);
			return null;
		}
		
		return data.person as IPerson;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export default function FullInfo({ params }: { params: { id: string } }) {
	const [person, setPerson] = useState<IPerson | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const addFavorite = useFavoriteStore((state) => state.addFavorite);
	const favorites = useFavoriteStore((state) => state.favorites);
	
	useEffect(() => {
		async function fetchPerson() {
			setLoading(true);
			const fetchedPerson = await getPersonInfo(params.id);
			setPerson(fetchedPerson);
			setLoading(false);
		}
		fetchPerson();
	}, [params.id]);
	
	useEffect(() => {
		if (person) {
			setIsFavorite(favorites.some((fav) => fav.id === person.id));
		}
	}, [person, favorites]);
	
	if (loading) {
		return <div>Загрузка...</div>;
	}
	
	if (!person) {
		return <div>Нету информации по нему</div>;
	}
	
	return (
		<div className="flex flex-col items-center justify-center bg-green-200 h-screen w-full">
			<div className="flex flex-col gap-4 border border-green-400 p-6 rounded-lg bg-white shadow-lg max-w-lg w-full">
				<p className="text-2xl font-bold text-green-600">Имя: {person.name}</p>
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
				<p className="text-lg text-green-600 font-semibold">Фильмы:</p>
				<ul className="list-disc list-inside text-gray-700">
					{person.filmConnection.films.map((film, index) => (
						<li key={index} className="ml-4">
							{film.title}
						</li>
					))}
				</ul>
				<div className="mt-4">
					<button
						onClick={() => {
							addFavorite(person);
							setIsFavorite(true);
						}}
						className={`px-6 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200 ease-in-out ${
							isFavorite
								? "bg-gray-400 text-white cursor-not-allowed"
								: "bg-green-500 text-white hover:bg-green-600"
						}`}
						disabled={isFavorite}
					>
						{isFavorite ? "Добавлено в избранное" : "Добавить в избранное"}
					</button>
				</div>
			</div>
		</div>
	);
}

