// O memo evita que seja criada uma nova versão do componente quando nenhuma propriedade dele for alterada.
// O memo faz uma shallow compare -> comparação rasa das propriedades do componente, e no javascript é checada igualdade referencial entre objetos.
// Por isso precisa ser passado um segundo parâmetro para fazer a checagem de igualdade correta.

// Usar o memo:
// 1. Para pure funcional components (dados os mesmos parâmetros, é retornado o mesmo resultado)
// 2. Componentes que renderizam demais
// 3. Rerender com as mesmas props
// 4. Componentes médios ou grandes performam melhor com o memo
import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishlist';
import lodash from 'lodash';

// equivalente ao lazy do react, mas com a possibilidade de usar com SSR
import dynamic from 'next/dynamic';

// Dynamic Import:
// Importar apenas quando o user for utilizar e assim otimizar o tamanho do bundle
const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () =>
    import('./AddProductToWishlist').then((mod) => mod.AddProductToWishList),
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (id: number) => Promise<void>;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  // Importar apenas quando o user for utilizar e assim otimizar o tamanho do bundle
  // async function showFormattedDate() {
  //   const {format} = await import('date-fns')
  //   format()
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // Deep compare
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
