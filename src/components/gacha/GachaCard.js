import React from "react";

const rarityColors = {
  SSR: "border-yellow-400 shadow-yellow-400",
  SR: "border-purple-400 shadow-purple-400",
  R: "border-blue-400 shadow-blue-400",
  N: "border-gray-400 shadow-gray-400",
};

const GachaCard = ({ item }) => {
  if (!item || !item.name || !item.rarity) return null;

  const borderColor = rarityColors[item.rarity] || "border-gray-200";

  return (
    <div
      className={`bg-white rounded-xl p-3 shadow-md border-2 ${borderColor} animate-fade-in`}
    >
      <div className="text-center">
        <div className="text-sm text-gray-600">{item.rarity}</div>
        <div className="text-xl font-bold text-gray-800 mt-1">{item.name}</div>
      </div>
    </div>
  );
};

export default GachaCard;
