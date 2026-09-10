import { useState, useEffect } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    origin: 'all',
    type: 'all'
  });

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then(res => {
        if (!res.ok) throw new Error('API server returned error ' + res.status);
        return res.json();
      })
      .catch(() => {
        console.log("Backend API nedostupan. Koristim fallback /products.json");
        return fetch('/products.json').then(res => {
          if (!res.ok) throw new Error('Fallback failed');
          return res.json();
        });
      })
      .then(data => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1200);
      })
      .catch(err => {
        setLoading(false);
        console.error('Failed to load products:', err);
      });
  }, []);

  const resetFilters = () => {
    setFilters({ category: 'all', origin: 'all', type: 'all' });
  };

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.category === 'coffee' || filters.category === 'all') {
      if (filters.origin !== 'all' && (product.category !== 'coffee' || product.origin !== filters.origin)) return false;
    }
    if (filters.category === 'equipment' || filters.category === 'all') {
      if (filters.type !== 'all' && (product.category !== 'equipment' || product.type !== filters.type)) return false;
    }
    return true;
  });

  return { products, loading, filters, setFilters, filteredProducts, resetFilters };
}
