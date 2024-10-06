import {ApolloClient, InMemoryCache} from "@apollo/client";


const url = new ApolloClient({
	uri: "https://swapi-graphql.netlify.app/.netlify/functions/index\n",
	cache: new InMemoryCache()
})

export default url;