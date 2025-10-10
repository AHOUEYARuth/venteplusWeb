import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "@/style/style.scss";


interface CategoryItem {
  name: string;
  count: number | null;
}

interface Category {
  title: string;
  items: CategoryItem[];
}

interface Categories {
  [key: string]: Category;
}

type CategoryKeys = "man-fashion" | "woman-fashion" | "accessories";

const ShopProductFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<CategoryKeys, boolean>>({
    "man-fashion": true,
    "woman-fashion": false,
    accessories: false,
  });

  const categories: Categories = {
    "man-fashion": {
      title: "Man Fashion",
      items: [
        { name: "Jackets & Coats", count: 127 },
        { name: "Shirts", count: 108 },
        { name: "T-shirts", count: 89 },
        { name: "Outer & Blazer", count: 53 },
        { name: "Hoodie", count: 48 },
        { name: "Pants", count: 42 },
      ],
    },
    "woman-fashion": {
      title: "Woman Fashion",
      items: [{ name: "Shoes & Bag", count: null }],
    },
    accessories: {
      title: "Accessories",
      items: [],
    },
  };

  const toggleCategory = (categoryKey: CategoryKeys) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const handleCategoryChange = (itemName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="column-img margin w-[20%] bg-white rounded-lg shadow-sm border border-[#F39C12] p-6 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Filtre par catégorie
        </h2>
      </div>

      <div className="space-y-4">
        {Object.entries(categories).map(([key, category]) => {
          const categoryKey = key as CategoryKeys;
          const isOpen = openCategories[categoryKey];

          return (
            <div key={categoryKey}>
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:text-gray-900"
              >
                <span>{category.title}</span>
                <IoMdArrowDropdown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                {category.items.length > 0 ? (
                  <div className="space-y-2 pl-2">
                    {category.items.map((item, index) => (
                      <label
                        key={index}
                        className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(item.name)}
                            onChange={() => handleCategoryChange(item.name)}
                            className="w-4 h-4 text-[#F39C12] border-gray-300 rounded focus:ring-[#F39C12]"
                          />
                          <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
                            {item.name}
                          </span>
                        </div>
                        {item.count !== null && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.count}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 pl-2 mt-2">
                    No items available
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setSelectedCategories([])}
        className="column-img w-[50%] mt-6 py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md transition-colors"
      >
        Annuler
      </button>
    </div>
  );
};

export default ShopProductFilter;
