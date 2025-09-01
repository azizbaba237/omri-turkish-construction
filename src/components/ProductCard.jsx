import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Skeleton } from "@mui/material";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) return null; // Sécurisation si product undefined

  const handleQuickAdd = () => {
    if (!imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cartBadge = document.querySelector("#cart-badge");
    if (!cartBadge) return;
    const cartRect = cartBadge.getBoundingClientRect();

    const flyer = document.createElement("img");
    flyer.src = product.image;
    flyer.style.position = "fixed";
    flyer.style.left = imgRect.left + "px";
    flyer.style.top = imgRect.top + "px";
    flyer.style.width = imgRect.width + "px";
    flyer.style.height = imgRect.height + "px";
    flyer.style.borderRadius = "8px";
    flyer.style.zIndex = 9999;
    flyer.style.pointerEvents = "none";
    document.body.appendChild(flyer);

    flyer.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: `translate(${cartRect.left - imgRect.left}px, ${
            cartRect.top - imgRect.top
          }px) scale(0.1)`,
          opacity: 0.5,
        },
      ],
      {
        duration: 700,
        easing: "ease-in-out",
      }
    ).onfinish = () => {
      document.body.removeChild(flyer);
      addToCart(product, 1, "", "");
    };
  };

  return (
   <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden  h-full">
      <Link to={`/products/${product.id}`} className="group relative">
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            className="w-full h-48 sm:h-56"
            animation="wave"
          />
        )}
        <img
          src={product.image || ""}
          alt={product.name || "Produit"}
          className={`w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105 ${
            imgLoaded ? "block" : "hidden"
          }`}
          ref={imgRef}
          onLoad={() => setImgLoaded(true)}
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/products/${product.id}`} className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
            {product.name || "Nom indisponible"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {product.short_description || "Description indisponible"}
          </p>
          <p className="text-blue-600 font-bold mt-2">
            {product.price ? `${product.price} Fcfa` : "Prix indisponible"}
          </p>
        </Link>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link
            to={`/products/${product.id}`}
            className="lg:py-3 lg:px-2 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
          >
            Voir détails
          </Link>
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
