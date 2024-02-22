
import ProductNew from "./homeComponents/ProductNew";
import ProductHomeSale from "./homeComponents/ProductHomeSale";
import Slider from "./homeComponents/Slider";
import ProductHotBuy from "./homeComponents/ProductHotBuy";
import AllProductPage from "./homeComponents/AllProductPage";
import AllPost from "./homeComponents/AllPost";

const Home = () => {
    return (
        <>
            <Slider />
            <ProductNew />
            <ProductHomeSale />
            <ProductHotBuy />
            <AllProductPage/>
            <AllPost/>
        </>
    );
};
export default Home;