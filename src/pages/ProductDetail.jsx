import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { getProducts, getProductsByCategory } from "../services/api";

export default function ProductDetail() {
  const { name } = useParams(); // nom du produit dans l'URL
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(location.state?.product || null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Si on a le produit via state mais que ce n'est pas le bon nom, on met à jour
    if (location.state?.product?.name) {
      const stateProduct = location.state.product;
      const encodedName = encodeURIComponent(
        stateProduct.name.toLowerCase().replace(/\s+/g, "-")
      );
      if (encodedName === name) {
        setProduct(stateProduct);
        if (stateProduct.category) fetchRelatedProducts(stateProduct);
        setLoading(false);
        return;
      }
    }

    // Sinon récupérer par nom depuis l'API
    getProducts()
      .then((res) => {
        const products = res.data.results || res.data;
        const found = products.find(
          (p) =>
            encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, "-")) ===
            name
        );
        setProduct(found);
        if (found?.category) fetchRelatedProducts(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [name, location.state]);

  const fetchRelatedProducts = (prod) => {
    getProductsByCategory(prod.category)
      .then((res) => {
        const productsData = res.data.results || res.data;
        const related = productsData.filter((p) => p.id !== prod.id);
        setRelatedProducts(related);
      })
      .catch((err) => console.error("Erreur produits similaires :", err));
  };

  const handleAddToCart = () => {
    if (product.colors && !selectedColor) {
      alert("Veuillez choisir une couleur");
      return;
    }
    if (product.sizes && !selectedSize) {
      alert("Veuillez choisir une taille");
      return;
    }
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (!product)
    return <div className="text-center py-10">Produit non trouvé</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Retour aux produits
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-2">
            {product.price} €
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.colors && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Couleurs :</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1 rounded border ${
                      selectedColor === c
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Tailles :</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === s
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => {
              const encodedName = encodeURIComponent(
                p.name.toLowerCase().replace(/\s+/g, "-")
              );
              return (
                <div
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/products/${encodedName}`, {
                      state: { product: p },
                    })
                  }
                >
                  <ProductCard product={p} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
