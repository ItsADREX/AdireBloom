import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { validateDiscountCode } from '../data/promotions';

const CartContext = createContext(null);

const initialState = { items: [], discount: null };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity = 1 } = action.payload;
      if (!product.purchasable || !product.price) return state;
      const key = `${product.id}-${size}`;
      const existing = state.items.find((i) => i.key === key);
      const items = existing
        ? state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...state.items, { key, product, size, quantity }];
      return { ...state, items, discount: null };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.key !== action.payload), discount: null };
    case 'UPDATE_QTY': {
      const { key, quantity } = action.payload;
      const items =
        quantity <= 0
          ? state.items.filter((i) => i.key !== key)
          : state.items.map((i) => (i.key === key ? { ...i, quantity } : i));
      return { ...state, items, discount: null };
    }
    case 'SET_DISCOUNT':
      return { ...state, discount: action.payload };
    case 'CLEAR_DISCOUNT':
      return { ...state, discount: null };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

function buildTotals(items, discount) {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 30000 ? 2500 : 0;
  const discountAmount = discount?.amount || 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, shipping, discountAmount, total, count };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totals = useMemo(
    () => buildTotals(state.items, state.discount),
    [state.items, state.discount]
  );

  const addItem = (product, size, quantity) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } });
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', payload: key });
  const updateQty = (key, quantity) =>
    dispatch({ type: 'UPDATE_QTY', payload: { key, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const applyDiscountCode = useCallback(
    (code) => {
      const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const result = validateDiscountCode(code, subtotal);
      if (!result.valid) return { ok: false, message: result.message };
      const discount = {
        code: result.code,
        percentOff: result.percentOff,
        amount: result.discountAmount,
        label: result.label,
      };
      dispatch({ type: 'SET_DISCOUNT', payload: discount });
      return { ok: true };
    },
    [state.items]
  );

  const clearDiscount = useCallback(() => dispatch({ type: 'CLEAR_DISCOUNT' }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        discount: state.discount,
        totals,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        applyDiscountCode,
        clearDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
