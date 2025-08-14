import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      {/* ajouter bouton contact / demande devis */}
    </div>
  );
}
