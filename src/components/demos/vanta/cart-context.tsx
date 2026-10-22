"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { findProduct, PRODUCTS, type ProductId } from "./data";

export type CartLine = { id: ProductId; qty: number };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: ProductId, qty: number) => void;
  remove: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Cart held in local React state only — nothing persisted, sent, or tied to a backend or payment. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((id: ProductId, qty: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
      return [...prev, { id, qty: Math.min(9, qty) }];
    });
    setOpen(true);
  }, []);
  const remove = useCallback((id: ProductId) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const setQty = useCallback((id: ProductId, qty: number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(9, qty)) } : l)));
  }, []);
  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((n, l) => n + findProduct(l.id).price * l.qty, 0), [lines]);

  const value = useMemo(() => ({ lines, count, subtotal, open, setOpen, add, remove, setQty, clear }), [lines, count, subtotal, open, add, remove, setQty, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// Re-exported for convenience so cart components don't need a separate import.
export { PRODUCTS };
