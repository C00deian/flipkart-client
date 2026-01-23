// import { products } from "@/app/utils/products"
import Container from "./components/Container"
import HomeBanner from "./components/HomeBanner"
import ProductCard from "./components/products/ProductCard"
import { getAllProducts } from "./services/product/service"
import NullData from "./components/NullData"
import ProductsClient from "./components/products/ProductsClient"

export default async function Home() {
 
  return (
    <div className="p-8">
      <Container>
          <HomeBanner />
       <ProductsClient/>
      </Container>
    </div>
  )
}
