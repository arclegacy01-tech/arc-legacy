import { Banner } from './models/Banner.js';
import { Announcement } from './models/Announcement.js';
import { Faq } from './models/Faq.js';
import { HomepageSection } from './models/HomepageSection.js';
import { BlogPost } from './models/BlogPost.js';

export async function seedCms() {
  const existing = await Banner.countDocuments();
  if (existing > 0) {
    console.log('CMS already seeded — skipping');
    return;
  }

  await Banner.insertMany([
    {
      title: 'The Finishing Touch to Your Creations',
      subtitle: 'Premium Laces & Latkans',
      imageUrl: '/images/product-1.jpg',
      ctaLabel: 'Shop Now',
      ctaLink: '/category/latkans',
      placement: 'homepage-hero',
      sortOrder: 1,
      status: 'published',
    },
    {
      title: 'New Arrivals — Premium Lace Collection',
      subtitle: 'Fresh designs for the festive season',
      imageUrl: '/images/product-3.jpg',
      ctaLabel: 'View New Arrivals',
      ctaLink: '/new-arrivals',
      placement: 'homepage-hero',
      sortOrder: 2,
      status: 'published',
    },
    {
      title: 'Traditional Trims for Modern Designs',
      subtitle: 'Celebrate Creativity',
      imageUrl: '/images/product-4.jpg',
      ctaLabel: 'Explore Collection',
      ctaLink: '/category/trims-borders',
      placement: 'homepage-promo',
      sortOrder: 1,
      status: 'published',
    },
  ]);

  await Announcement.insertMany([
    { text: 'FREE SHIPPING ON ORDERS ABOVE ₹999', sortOrder: 1, status: 'published' },
    { text: 'PREMIUM QUALITY TRIMS', sortOrder: 2, status: 'published' },
    { text: 'PAN INDIA DELIVERY', sortOrder: 3, status: 'published' },
  ]);

  await Faq.insertMany([
    {
      question: 'How can I place a bulk order?',
      answer: 'Visit our Wholesale page and submit an enquiry with product details and quantities. Our team will share pricing within 24–48 hours.',
      category: 'Wholesale',
      sortOrder: 1,
      status: 'published',
    },
    {
      question: 'What is the minimum order quantity?',
      answer: 'Retail orders have no minimum. Wholesale MOQ varies by product — typically 50 meters or 25 pairs for latkans.',
      category: 'Wholesale',
      sortOrder: 2,
      status: 'published',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Orders ship within 1–2 business days. Delivery across India usually takes 3–7 business days.',
      category: 'Shipping',
      sortOrder: 3,
      status: 'published',
    },
    {
      question: 'Can I return or exchange trims?',
      answer: 'Defective or incorrect items can be returned within 7 days. Cut-to-length items must be unused and in original packaging.',
      category: 'Returns',
      sortOrder: 4,
      status: 'published',
    },
  ]);

  await HomepageSection.insertMany([
    {
      key: 'promo-banner',
      title: 'Traditional Trims for Modern Designs',
      subtitle: 'Celebrate Creativity',
      ctaLabel: 'Explore Collection',
      ctaLink: '/category/trims-borders',
      enabled: true,
    },
    {
      key: 'story-teaser',
      title: 'Crafted Details. Timeless Traditions.',
      body: 'From a passion for craft to India\'s first lace brand — discover how ARC LEGACY supports creators nationwide.',
      ctaLabel: 'Our Story',
      ctaLink: '/our-story',
      imageUrl: '/images/product-6.jpg',
      enabled: true,
    },
  ]);

  await BlogPost.create({
    title: 'How to Choose the Right Lace for Bridal Wear',
    slug: 'choose-lace-bridal-wear',
    excerpt: 'A quick guide to zari, gota, and pearl laces for lehengas and dupattas.',
    content: '<p>Selecting lace is about weight, drape, and occasion. For bridal lehengas, heavier zari borders balance rich fabrics...</p>',
    coverImage: '/images/product-2.jpg',
    status: 'published',
    publishedAt: new Date(),
  });

  console.log('CMS seeded');
}
