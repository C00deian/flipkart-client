import Container from "@/app/components/Container"
import ProductDetails from "./ProductDetails"
import { ListRating } from "./ListRating"
import { getProduct } from "@/app/services/product/service";

interface IPrams {
  params: Promise<{ productId: string }>;
}



const Product = async ({ params }: IPrams) => {

  const { productId } = await params;

  // const product = products.find((item) => item.id === productId)
  const product = await getProduct(productId)
  console.log("single product", product);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Product