import {gql} from "@apollo/client";
import url from "@/api/apollo";
import {IStarWars} from "@/interface/star-wars"; // настрой свой Apollo Client

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
  
  return (
    <div className="flex flex-col justify-center">
      <p className="flex text-4xl text-fuchsia-400 font-serif">Добро пожаловать в Next.js!</p>
      <div className=" w-2/3 flex flex-col divide-y divide-gray-100 gap-3">
        {people.map(({ id, name }: { id: string, name: string }) => (
          <div key={id} className={'flex flex-row justify-between items-center'}>
            <p >{name}</p>
            <p>В избранное</p>
          </div>
        
        ))}
      </div>
    </div>
  );
}
