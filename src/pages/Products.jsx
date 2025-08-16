import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('db.json')
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
