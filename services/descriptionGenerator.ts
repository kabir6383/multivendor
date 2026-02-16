// Local description and pricing generator - no external API required

const productDescriptionTemplates: Record<string, string[]> = {
  Electronics: [
    "Premium quality {name} designed for modern users. Features advanced technology, durability, and exceptional performance. Perfect for professionals and enthusiasts alike.",
    "High-performance {name} offering cutting-edge features and reliable functionality. Ideal for those seeking quality and innovation.",
    "Top-tier {name} built with precision engineering. Delivers superior performance and longevity. A smart investment for discerning customers."
  ],
  Clothing: [
    "Stylish {name} crafted from premium materials. Combines fashion-forward design with comfort and durability. Perfect for any occasion.",
    "Elegant {name} featuring modern aesthetics and superior craftsmanship. Comfortable fit with attention to detail and quality.",
    "Versatile {name} designed for everyday wear. High-quality fabric, excellent finish, and timeless style."
  ],
  Home: [
    "Beautiful {name} that enhances your living space. Combines functionality with modern design. Durable and easy to maintain.",
    "Premium {name} for your home. Stylish, practical, and built to last. Elevates any room's aesthetic.",
    "Quality {name} offering both style and substance. Perfect addition to modern homes."
  ],
  Books: [
    "{name} - An engaging read with compelling content. Well-written and thoughtfully presented. Great value for book lovers.",
    "Interesting {name} that captivates and educates. A must-read with insightful perspectives and engaging narrative.",
    "{name} - Highly recommended for those seeking quality literature. Offers depth, entertainment, and lasting value."
  ],
  Sports: [
    "Professional-grade {name} for athletes and enthusiasts. Engineered for performance and durability. Meets international standards.",
    "High-quality {name} designed for optimal performance. Built tough for serious use. Trusted by professionals.",
    "Premium {name} offering excellent functionality and durability. Ideal for both beginners and experienced users."
  ],
  Food: [
    "Delicious and authentic {name}. Made with premium ingredients and traditional methods. Perfect for food lovers.",
    "Fresh, high-quality {name} with exceptional taste. Produced with care and attention to quality.",
    "Finest {name} offering authentic flavor and superior quality. A delightful choice for discerning palates."
  ]
};

const pricingGuidelinesByCategory: Record<string, { min: number; max: number; suggestion: string }> = {
  Electronics: { min: 2000, max: 50000, suggestion: "₹5,999 - ₹29,999 (Premium electronics with competitive margins)" },
  Clothing: { min: 500, max: 5000, suggestion: "₹1,299 - ₹3,499 (Competitive pricing for market appeal)" },
  Home: { min: 1000, max: 15000, suggestion: "₹2,999 - ₹9,999 (Value-focused home products)" },
  Books: { min: 200, max: 1000, suggestion: "₹399 - ₹799 (Standard book pricing)" },
  Sports: { min: 1000, max: 20000, suggestion: "₹3,999 - ₹12,999 (Professional sports equipment)" },
  Food: { min: 100, max: 2000, suggestion: "₹299 - ₹999 (Premium food products)" }
};

export const generateProductDescription = async (
  name: string,
  category: string,
  features: string
): Promise<string> => {
  // Simulate a slight delay to mimic async API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const templates = productDescriptionTemplates[category] || productDescriptionTemplates['Electronics'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const description = template
    .replace('{name}', name)
    .replace('{features}', features);
  
  return `${description} Features: ${features}. Guaranteed quality at the best price.`;
};

export const suggestPricingStrategy = async (
  name: string,
  category: string
): Promise<string> => {
  // Simulate a slight delay to mimic async API call
  await new Promise(resolve => setTimeout(resolve, 300));

  const guidance = pricingGuidelinesByCategory[category] || pricingGuidelinesByCategory['Electronics'];
  
  return `📊 Pricing Recommendation: ${guidance.suggestion} | Market trends suggest competitive pricing attracts more customers in this category.`;
};
