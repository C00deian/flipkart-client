// import { products } from "@/app/utils/products"
import Container from "./components/Container"
import HomeBanner from "./components/HomeBanner"
import ProductCard from "./components/products/ProductCard"
import { getAllProducts } from "./services/product/service"
import NullData from "./components/NullData"

export default async function Home() {

  const products = await getAllProducts();

  if (products.length < 0) {
    return <NullData title="No Products Found" />
  }

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">{
          products.map((product: any) => {
            return (
              <ProductCard product={product} key={product.id} />
            )
          }
          )}

        </div>
      </Container>
    </div>
  )
}
