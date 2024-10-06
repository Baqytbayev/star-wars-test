import {gql} from "@apollo/client";
import url from "@/api/apollo";


async function getPersonInfo(id: string) {
	try {
		const { data } = await url.query({
			query: gql`
        query Character($id: ID!) {
          person(id: $id) {
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
		
		
		return data.person as IPerson;
	} catch (err) {
		console.error( err);
	}
}

export default async function FullInfo({ params }: { params: { id: string } }) {
	const person: IPerson | null = await getPersonInfo(params.id);
	
	if (!person) {
		return <div>Нету информации по нему</div>;
	}
	
	return (
		<div
			className="flex flex-col items-center justify-center bg-green-200 h-screen w-full">
			<div
				className="flex flex-col gap-4 border border-green-400 p-6 rounded-lg bg-white shadow-lg max-w-lg w-full">
				<p className="text-2xl font-bold text-green-600">Имя: {person.name}</p>
				<p className="text-lg text-gray-700">Год рождения: <span
					className="font-medium">{person.birthYear}</span></p>
				<p className="text-lg text-gray-700">Пол: <span
					className="font-medium">{person.gender}</span></p>
				<p className="text-lg text-gray-700">Рост: <span
					className="font-medium">{person.height} см</span></p>
				<p className="text-lg text-gray-700">Вес: <span
					className="font-medium">{person.mass} кг</span></p>
				<p className="text-lg text-green-600 font-semibold">Фильмы:</p>
				<ul className="list-disc list-inside text-gray-700">
					{person.filmConnection.films.map((film, index) => (
						<li key={index} className="ml-4">{film.title}</li>
					))}
				</ul>
				
			</div>
		</div>
	
	);
}
