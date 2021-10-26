import { ProductItem } from './ProductItem';
import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';

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

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };
  return (
    <div style={{ height: '100vh' }}>
      <h2>{totalPrice}</h2>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={300}
            width={width}
            rowHeight={20}
            overscanRowCount={5}
            rowCount={results.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>

      {/* {results.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))} */}
    </div>
  );
}
