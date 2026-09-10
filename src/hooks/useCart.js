import { useState, useEffect } from 'react';

export default function useCart() {
  const TAX_RATE = 0.17;
  const PROMO_CODES = { 'COFFEE10': 0.10 };

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('brewcraft_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('brewcraft_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, option) => {
    const existing = cart.find(item => item.id === product.id && item.option === option);
    if (existing) {
      if (existing.quantity >= product.stock) return false;
      setCart(prev => prev.map(item =>
        (item.id === product.id && item.option === option)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prev => [...prev, {
        id: product.id, name: product.name, price: product.price,
        image: product.image, option: option, quantity: 1, maxStock: product.stock
      }]);
    }
    return true;
  };

  const removeFromCart = (id, option) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.option === option)));
  };

  const changeQuantity = (id, option, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.option === option) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        if (newQty > item.maxStock) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const applyPromoCode = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (PROMO_CODES[trimmed]) {
      setAppliedDiscount(PROMO_CODES[trimmed]);
      return { success: true, discount: PROMO_CODES[trimmed] };
    }
    return { success: false };
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartDiscountVal = cartSubtotal * appliedDiscount;
  const cartTaxVal = (cartSubtotal - cartDiscountVal) * TAX_RATE;
  const cartTotalVal = cartSubtotal - cartDiscountVal + cartTaxVal;
  const cartCountVal = cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
  };

  return {
    cart, cartSubtotal, cartDiscountVal, cartTaxVal, cartTotalVal, cartCountVal,
    appliedDiscount, addToCart, removeFromCart, changeQuantity, applyPromoCode, clearCart
  };
}
