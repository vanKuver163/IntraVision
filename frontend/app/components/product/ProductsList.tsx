
import {ProductItems} from "@/app/components/product/ProductItem";
import {Product} from "@/app/features/product/type";

interface ProductsListProps {
    products?: Product[];
}

export const  ProductsList = ({products}: ProductsListProps) => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.length ? (
                products.map((product) => (
                    <ProductItems
                        product={product}
                        key={product.id}
                    />
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                    <p>Товары не найдены</p>
                </div>
            )}
        </div>
    )
}
