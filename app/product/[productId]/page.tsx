import Container from "@/app/components/Container"
import ProductDetails from "./ProductDetails"
import { product } from "@/utils/product"

interface IPrams {
  productId? : string
}



const Product = async({ params }: { params: IPrams }) => {
 
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  )
}

export default Product