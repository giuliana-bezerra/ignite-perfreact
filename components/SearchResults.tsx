import { useMemo } from 'react';

import { ProductItem } from './ProductItem';

type SearchResultsProps = {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => Promise<void>;
};

export function SearchResults({
  totalPrice,
  results,
  onAddToWishList,
}: SearchResultsProps) {
  // useMemo:
  // 1. Não recalcular algo pesado sem necessidade (se não for um cálculo pesado não vale a pena usar devido o custo da comparação feita para o useMemo executar)
  // 2. Igualdade referencial (quando a gente repassa a informação para um componente filho e por isso ele sempre é rerenderizado)

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
}
