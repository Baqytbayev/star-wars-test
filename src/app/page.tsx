import {gql} from "@apollo/client";
import url from "@/api/apollo";
import {IStarWars} from "@/interface/star-wars";
import Link from "next/link"; // настрой свой Apollo Client

async function getPeople() {
  try {
    const { data } = await url.query({
      query: gql`
      query {
        allPeople {
          people {
            id
            name
            
          }
        }
      }
    `,
    });
    
    return data.allPeople.people as IStarWars[];
  }catch (err) {
    console.error(err);
  }
}

export default async function Home() {
  const people: IStarWars[] = await getPeople();
  if (!people) {
    return <div>Нету информации по нему</div>;
  }
  return (
    <div className="flex flex-col justify-center">
      <p className="flex text-4xl text-fuchsia-400 font-serif">Добро пожаловать в Next.js!</p>
      <div className=" w-2/3 flex flex-col divide-y divide-gray-100 gap-3">
        {people.map(({ id, name }: { id: string, name: string }) => (
          <div key={id} className={'flex flex-row justify-between items-center'}>
            <p >{name}</p>
            <div className={'flex flex-row gap-3'}>
              <Link className={'px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200 ease-in-out'} href={`/full-info/${id}`}>Полная информация</Link>
              <div className="mt-4">
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200 ease-in-out">
                  Добавить в избранное
                </button>
              </div>
            </div>
          
          </div>
        
        ))}
      </div>
    </div>
  );
}
