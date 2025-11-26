import Container from "@/app/components/Container"
import ProductDetails from "./ProductDetails"
import { products } from "@/utils/products"
import { ListRating } from "./ListRating"

interface IPrams {
  params: Promise<{ productId: string }>;
}



const Product = async ({ params }: IPrams) => {

 const { productId } = await params;

  const product  =  products.find((item) => item.id === productId)

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20">
          <div>Add Rating</div>
         <ListRating product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default Product