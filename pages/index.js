import { withUrqlClient } from 'next-urql';
import { useQuery, cacheExchange, dedupExchange, fetchExchange } from 'urql';

const pokemonsQuery = `
  query pokemons {
    pokemons(first: 10) {
      id
      name
    }
  }
`;

const Home = () => {
  const [{ data, fetching, error }] = useQuery({
    query: pokemonsQuery
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.pokemons.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default withUrqlClient(
  (ssrExchange) => ({
    url: 'https://graphql-pokemon2.vercel.app',
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
  }),
  { ssr: true },
)(Home);
