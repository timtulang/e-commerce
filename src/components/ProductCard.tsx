import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block border-4 border-foreground bg-surface relative overflow-hidden transition-all duration-300 hover:shadow-brutal hover:-translate-y-1"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-accent text-white font-display uppercase tracking-wider px-3 py-1 text-sm clip-path-angled shadow-brutal">
            New
          </span>
        )}
        {product.isSale && (
          <span className="bg-red-600 text-white font-display uppercase tracking-wider px-3 py-1 text-sm clip-path-angled shadow-brutal">
            Sale
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="aspect-[4/5] w-full overflow-hidden border-b-4 border-foreground bg-gray-200">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between min-h-[120px]">
        <h3 className="font-display text-2xl uppercase leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex justify-between items-end mt-4">
          <span className="font-sans text-sm font-bold text-gray-500 uppercase tracking-widest">
            {product.category}
          </span>
          <span className="font-display text-3xl">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};