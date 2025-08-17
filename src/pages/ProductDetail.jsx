import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => {
        const products = res.data.products;
        const found = products.find((p) => String(p.id) === id);
        setProduct(found);

        if (found) {
          const related = products.filter(
            (p) => p.category === found.category && String(p.id) !== id
          );
          setRelatedProducts(related);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center py-10">Chargement...</div>;

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Bouton retour */}
      <button
        onClick={() => navigate("/products")}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Retour aux produits
      </button>

      {/* Détail produit */}
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
            {product.price}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Couleurs */}
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

          {/* Tailles */}
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

          {/* Quantité */}
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

      {/* Produits similaires */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
