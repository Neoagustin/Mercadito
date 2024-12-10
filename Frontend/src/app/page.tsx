"use client";

import React, { useState } from "react";
import useFetchProducts from "@/hooks/useFetchProducts";
import useFilterProducts from "@/hooks/useFilterProducts";
import { categories } from "@/data/categories";
import Banner from "@/components/Home/Banner/Banner";
import FilterBar from "@/components/Home/FilterBar/FilterBar";
import ItemList from "@/components/Home/ItemList/ItemList";
import Card from "@/components/Home/Card/Card";
import styles from "./page.module.css";

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-500 text-sm">Cargando productos...</p>
  </div>
);

const MainPage: React.FC = () => {
  const [productCategoryId, setProductCategoryId] = useState(0);
  const products = useFetchProducts();
  const filteredProducts = useFilterProducts(products, productCategoryId);
  const isLoading = products.length === 0;

  const handleProductCategoryId = (id: number) => {
    setProductCategoryId(id);
  };

  return (
    <>
      <Banner />
      <main className={styles.main}>
        {!isLoading ? (
          <>
            <h2 className={styles.desktopTitle}>
              {productCategoryId === 0 ? "Todo" : categories[productCategoryId - 1].name}
            </h2>
            <div className={styles.mainContent}>
              <FilterBar
                handleProductCategoryId={handleProductCategoryId}
                productCategoryId={productCategoryId}
              />

              <div className={styles.cardsContainer}>
                <ItemList items={filteredProducts} renderCallback={(item) => <Card {...item} />} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </main>
    </>
  );
};

export default MainPage;
