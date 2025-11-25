import Container from "@/app/components/Container"
import ProductDetails from "./ProductDetails"
import { product } from "@/utils/product"
import { ListRating } from "./ListRating"

interface IPrams {
  productId?: string
}



const Product = async ({ params }: { params: IPrams }) => {

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