// src/utils/validator.js
import { productCatalog } from './productCatalog';

export function validateOrder(parsed) {
  const items = parsed.items.map(item => {
    let flag = null, suggestion = null;
    // Try to find matching product by name substring (case-insensitive)
    const nameKey = item.name.toLowerCase();
    const found = productCatalog.find(p => p.name.toLowerCase().includes(nameKey));
    if (!found) {
      flag = "SKU_NOT_FOUND";
      suggestion = "No exact match in catalog; check spelling or try a different product";
      item.sku = null;
    } else {
      item.sku = found.sku;
      // Check MOQ
      if (item.quantity < found.moq) {
        flag = "MOQ_NOT_MET";
        suggestion = `Minimum order quantity for ${found.sku} is ${found.moq}`;
      }
      // Check stock
      if (item.quantity > found.stock) {
        flag = flag ? [...[].concat(flag), "OUT_OF_STOCK"] : "OUT_OF_STOCK";
        suggestion = suggestion 
          ? suggestion + "; stock is insufficient" 
          : `Only ${found.stock} units available in stock`;
      }
      item.name = found.name;  // use official name
      // Add price and available stock for completeness
      item.price = found.price;
      item.stock = found.stock;
      item.moq = found.moq;
    }
    return { ...item, flag, suggestion };
  });

  return {
    items,
    deliveryAddress: parsed.address,
    deliveryDeadline: parsed.deadline,
    confidence: parsed.confidence,
    flags: items
      .filter(i => i.flag)
      .map(i => ({ sku: i.sku, flag: i.flag, suggestion: i.suggestion })),
  };
}