"use client";

import { useState } from "react";
import { useCart } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, Check, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    street: user?.addresses[0]?.street || "",
    city: user?.addresses[0]?.city || "",
    zip: user?.addresses[0]?.zip || "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: user?.name || "",
  });

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <Link href="/restaurants" className="text-red-500 hover:underline">Browse restaurants</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-6">Your order from {items[0]?.restaurantName} has been confirmed. Estimated delivery: 25-35 min.</p>
          <button onClick={() => { clearCart(); router.push("/"); }} className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setOrderPlaced(true);
  };

  const steps = ["address", "payment", "confirm"] as const;
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="flex items-center gap-4 mb-8">
          {[
            { id: "address" as const, label: "Address" },
            { id: "payment" as const, label: "Payment" },
            { id: "confirm" as const, label: "Confirm" },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s.id ? "bg-red-500 text-white" : i < currentStepIndex ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {i < currentStepIndex ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === s.id ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-200 ml-2" />}
            </div>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">You&apos;re not signed in</p>
              <p className="text-sm text-yellow-700 mt-0.5">
                <Link href="/login" className="underline font-medium">Sign in</Link> for a faster checkout and order tracking.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {step === "address" && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="123 Main St, Apt 4B" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="New York, NY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="10001" />
                  </div>
                </div>
              </div>
              <button onClick={() => setStep("payment")} className="w-full mt-6 py-3.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input type="text" value={payment.name} onChange={(e) => setPayment({ ...payment, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="4242 4242 4242 4242" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input type="text" value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="123" maxLength={4} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("address")} className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep("confirm")} className="flex-1 py-3.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("payment")} className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 py-3.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</> : "Place Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
