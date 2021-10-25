// O memo evita que seja criada uma nova versão do componente quando nenhuma propriedade dele for alterada.
// O memo faz uma shallow compare -> comparação rasa das propriedades do componente, e no javascript é checada igualdade referencial entre objetos.
// Por isso precisa ser passado um segundo parâmetro para fazer a checagem de igualdade correta.

// Usar o memo:
// 1. Para pure funcional components (dados os mesmos parâmetros, é retornado o mesmo resultado)
// 2. Componentes que renderizam demais
// 3. Rerender com as mesmas props
// 4. Componentes médios ou grandes performam melhor com o memo
import { memo } from 'react';

interface ProductItemprops {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemprops) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // Deep compare
    return Object.is(prevProps.product, nextProps.product);
  }
);
