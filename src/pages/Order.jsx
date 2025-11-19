import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // États formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "delivery",
  });

  // États modal / progression
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [orderId, setOrderId] = useState(null);

  const shippingCost = 2000;

  // Handlers formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Clique sur "Confirmer la commande" (ouvre la modal)
  const handleOpenModal = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Veuillez remplir toutes les informations !");
      return;
    }
    setShowConfirmModal(true);
  };

  // Validation finale dans la modal : lance la soumission + progress bar
  const handleValidateOrder = async () => {
    setSubmitting(true);
    setProgress(10);

    // Progress bar simulée
    const step = () =>
      setProgress((p) => Math.min(p + Math.ceil((100 - p) / 3), 95));
    const interval = setInterval(step, 300);

    // Simulation du POST
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const id = "CMD-" + Date.now().toString().slice(-6);
      setOrderId(id);
      setSubmitting(false);
      clearCart();
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setOrderId(null);
    navigate("/products");
  };

  useEffect(() => {
    return () => setSubmitting(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Passer la commande
          </h1>
          <Link
            to="/cart"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            ← Retour au panier
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Colonne gauche : Infos client */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Informations client</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre nom"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="exemple@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="+237 6 XX XX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Adresse
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ville, quartier, rue..."
                ></textarea>
              </div>

              <div>
                <h3 className="text-md font-semibold mt-6 mb-2">
                  Méthode de paiement
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="delivery"
                      checked={formData.payment === "delivery"}
                      onChange={handleChange}
                    />
                    <span>Paiement à la livraison</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="mobile"
                      checked={formData.payment === "mobile"}
                      onChange={handleChange}
                    />
                    <span>Mobile Money</span>
                  </label>
                </div>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              En confirmant, vous acceptez nos conditions générales de vente.
            </p>
          </div>

          {/* Colonne droite : Récap panier */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Résumé de la commande
            </h2>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Votre panier est vide.</p>
              ) : (
                cartItems.map((item) => {
                  const price =
                    parseFloat(item.price?.toString().replace(/\s/g, "")) || 0;
                  const quantity = Number(item.quantity) || 0;
                  return (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qté: {quantity} × {price.toLocaleString()} FCFA
                        </p>
                      </div>
                      <p className="font-semibold">
                        {(price * quantity).toLocaleString()} FCFA
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{Number(cartTotal).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{shippingCost.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  {(Number(cartTotal) + shippingCost).toLocaleString()} FCFA
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition disabled:opacity-60"
              disabled={cartItems.length === 0}
            >
              Confirmer la commande
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {orderId ? "Commande confirmée" : "Confirmer la commande"}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={
                  orderId ? handleCloseModal : () => setShowConfirmModal(false)
                }
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {!orderId && !submitting && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Client :</span>{" "}
                      {formData.name} — {formData.phone}
                      <br />
                      <span className="font-medium">Adresse :</span>{" "}
                      {formData.address}
                      <br />
                      <span className="font-medium">Paiement :</span>{" "}
                      {formData.payment === "delivery"
                        ? "Paiement à la livraison"
                        : formData.payment === "card"
                        ? "Carte bancaire"
                        : "Mobile Money"}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {cartItems.length} article
                      {cartItems.length > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold">
                      Total :{" "}
                      {(Number(cartTotal) + shippingCost).toLocaleString()} FCFA
                    </span>
                  </div>
                </>
              )}

              {submitting && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Traitement de votre commande…
                  </p>
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div
                      className="bg-blue-600 h-3 rounded transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{progress}%</p>
                </div>
              )}

              {orderId && !submitting && (
                <div className="text-center">
                  <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">Commande passée avec succès !</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Numéro de commande :{" "}
                    <span className="font-mono">{orderId}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 justify-end">
              {!orderId && !submitting && (
                <>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleValidateOrder}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Valider la commande
                  </button>
                </>
              )}

              {orderId && !submitting && (
                <>
                  <Link
                    to="/products"
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    onClick={handleCloseModal}
                  >
                    Continuer mes achats
                  </Link>
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleCloseModal}
                  >
                    Accueil
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
