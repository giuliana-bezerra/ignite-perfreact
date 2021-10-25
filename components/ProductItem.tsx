interface ProductItemprops {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

export function ProductItem({ product }: ProductItemprops) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}
