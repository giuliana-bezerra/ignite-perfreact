import type { NextPage } from 'next';
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
};
const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    // Assim eu faço o cálculo apenas na busca, para não precisar do useMemo
    const totalPrice = data.reduce((total: number, product: any) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  // Usar o useCallback para quando passar uma função para vários componentes filhos
  // A igualdade referencial vai fazer com que os componentes rerenderizem pq a função passada como props sempre será recriada
  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
};

export default Home;
