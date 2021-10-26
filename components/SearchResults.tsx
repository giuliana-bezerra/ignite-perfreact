import { useMemo } from 'react';

import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
};

export function SearchResults({ results }: SearchResultsProps) {
  // useMemo:
  // 1. Não recalcular algo pesado sem necessidade
  // 2. Igualdade referencial (quando a gente repassa a informação para um componente filho e por isso ele sempre é rerenderizado)
  const totalPrice = useMemo(
    () =>
      results.reduce((total, product) => {
        return total + product.price;
      }, 0),
    [results]
  );

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => (
        <ProductItem product={product} />
      ))}
    </div>
  );
}
