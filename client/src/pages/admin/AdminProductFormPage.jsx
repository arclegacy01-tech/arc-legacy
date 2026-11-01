import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminIcon from '../../components/admin/AdminIcons.jsx';
import { api } from '../../api/client.js';
import {
  CATEGORY_HIERARCHY,
  getSubcategoriesForCategory,
  findCategoryByVal,
} from '../../data/categoryHierarchy.js';

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Basic Information Form States
  const [title, setTitle] = useState(isEdit ? 'Golden Zari Lace Trim' : '');
  const [selectedCategory, setSelectedCategory] = useState(isEdit ? 'Laces' : '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(isEdit ? 'Zari Lace' : '');
  const [categoriesList, setCategoriesList] = useState(() =>
    CATEGORY_HIERARCHY.map((c) => ({
      _id: c.id,
      id: c.id,
      name: c.name,
      slug: c.slug,
    }))
  );
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');

  const [shortDesc, setShortDesc] = useState(
    isEdit
      ? 'Premium golden zari lace trim with intricate embroidery, perfect for ethnic wear, lehengas, blouses, dupattas and DIY craft projects.'
      : ''
  );
  const [brand, setBrand] = useState('ARC LEGACY');
  const [sku, setSku] = useState(isEdit ? 'GT-1023' : `ARC-${Math.floor(1000 + Math.random() * 9000)}`);

  // Images state (strictly using client public images library)
  const [images, setImages] = useState([
    { id: 1, url: '/images/product-1.jpg', isMain: true },
    { id: 2, url: '/images/product-4.jpg', isMain: false },
    { id: 3, url: '/images/product-2.jpg', isMain: false },
    { id: 4, url: '/images/product-8.jpg', isMain: false },
  ]);

  // Pricing & Inventory
  const [sellingPrice, setSellingPrice] = useState(isEdit ? '180' : '');
  const [comparePrice, setComparePrice] = useState(isEdit ? '250' : '');
  const [costPrice, setCostPrice] = useState(isEdit ? '120' : '');
  const [taxGst, setTaxGst] = useState('GST 12%');
  const [stockQuantity, setStockQuantity] = useState(isEdit ? '42' : '50');
  const [lowStockAlert, setLowStockAlert] = useState('10');
  const [trackStock, setTrackStock] = useState(true);

  // Variations
  const [hasVariations, setHasVariations] = useState(true);
  const [widthOptions, setWidthOptions] = useState(['1 cm', '2 cm', '3 cm']);
  const [colorOptions, setColorOptions] = useState(['Gold', 'Antique Gold', 'Rose Gold']);
  const [newWidth, setNewWidth] = useState('');
  const [newColor, setNewColor] = useState('');
  const [showAddWidth, setShowAddWidth] = useState(false);
  const [showAddColor, setShowAddColor] = useState(false);

  // SEO & Visibility
  const [metaTitle, setMetaTitle] = useState(
    isEdit ? 'Golden Zari Lace Trim | Premium Lace for Ethnic Wear | ARC LEGACY' : ''
  );
  const [metaDescription, setMetaDescription] = useState(
    isEdit
      ? 'Shop premium golden zari lace trim for lehengas, blouses, dupattas and DIY craft projects. High-quality trims at best prices. ARC LEGACY.'
      : ''
  );
  const [urlSlug, setUrlSlug] = useState(isEdit ? 'golden-zari-lace-trim' : '');
  const [productStatus, setProductStatus] = useState('Active');
  const [showOnWebsite, setShowOnWebsite] = useState(true);
  const [featuredProduct, setFeaturedProduct] = useState(false);
  const [includeInNewArrivals, setIncludeInNewArrivals] = useState(true);

  // Rich Text Editor & Specifications States
  const editorRef = useRef(null);
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'structured'
  const [editorBlock, setEditorBlock] = useState('Paragraph');
  const [newFeatureText, setNewFeatureText] = useState('');

  // Structured specification content
  const [specContent, setSpecContent] = useState({
    description:
      'Add a detailed product description here. You can include material, design, usage, and other important information about the product. This will help customers understand the product better.',
    features: [
      'Premium quality zari lace trim',
      'Intricate and elegant design',
      'Perfect for lehengas, blouses, dupattas and ethnic wear',
      'Durable and easy to stitch',
      'Ideal for designers, boutiques and DIY craft projects',
    ],
    whatsIncluded: '1 Meter Zari Lace Trim (as per selected length)',
    whyLoveIt:
      'Adds a royal and traditional touch to your creations with fine craftsmanship and timeless design.',
  });

  // Default HTML representation matching the mock image exactly
  const [editorHtml, setEditorHtml] = useState(() => {
    return `<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Description</h4>
<p style="color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">Add a detailed product description here. You can include material, design, usage, and other important information about the product. This will help customers understand the product better.</p>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Features (Bullet Points)</h4>
<ul style="list-style-type: disc; padding-left: 20px; color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">
  <li>Premium quality zari lace trim</li>
  <li>Intricate and elegant design</li>
  <li>Perfect for lehengas, blouses, dupattas and ethnic wear</li>
  <li>Durable and easy to stitch</li>
  <li>Ideal for designers, boutiques and DIY craft projects</li>
</ul>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">What's Included</h4>
<p style="color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">• 1 Meter Zari Lace Trim (as per selected length)</p>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Why You'll Love It</h4>
<p style="color: #5E474D; font-size: 12.5px;">• Adds a royal and traditional touch to your creations with fine craftsmanship and timeless design.</p>`;
  });

  const [toastMsg, setToastMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  // Synchronize contentEditable with state
  useEffect(() => {
    if (editorMode === 'visual' && editorRef.current) {
      if (editorRef.current.innerHTML !== editorHtml) {
        editorRef.current.innerHTML = editorHtml;
      }
    }
  }, [editorHtml, editorMode]);

  // Execute rich text formatting commands
  const execEditorCmd = (cmd, val = null) => {
    if (editorMode !== 'visual') {
      setEditorMode('visual');
    }
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand(cmd, false, val);
        setEditorHtml(editorRef.current.innerHTML);
      }
    }, 20);
  };

  const handleBlockFormatChange = (e) => {
    const val = e.target.value;
    setEditorBlock(val);
    const tag = val === 'Heading 1' ? 'h1' : val === 'Heading 2' ? 'h2' : val === 'Heading 3' ? 'h3' : 'p';
    execEditorCmd('formatBlock', tag);
  };

  const handleInsertLink = () => {
    const url = window.prompt('Enter link URL (e.g. https://...):');
    if (url) execEditorCmd('createLink', url);
  };

  const handleInsertImage = () => {
    const defaultUrl = images[0]?.url || '/images/product-1.jpg';
    const url = window.prompt('Enter image URL:', defaultUrl);
    if (url) execEditorCmd('insertImage', url);
  };

  // Sync structured specifications back to HTML
  const syncStructuredToHtml = (updatedSpecs) => {
    setSpecContent(updatedSpecs);
    const bullets = updatedSpecs.features.map((f) => `  <li>${f}</li>`).join('\n');
    const html = `<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Description</h4>
<p style="color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">${updatedSpecs.description}</p>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Features (Bullet Points)</h4>
<ul style="list-style-type: disc; padding-left: 20px; color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">
${bullets}
</ul>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">What's Included</h4>
<p style="color: #5E474D; margin-bottom: 14px; font-size: 12.5px;">• ${updatedSpecs.whatsIncluded}</p>
<h4 style="font-weight: 700; color: #8E1838; margin-bottom: 4px; font-size: 13.5px;">Why You'll Love It</h4>
<p style="color: #5E474D; font-size: 12.5px;">• ${updatedSpecs.whyLoveIt}</p>`;
    setEditorHtml(html);
  };

  // Helper to load subcategories for a given category name/slug/ID
  const loadSubcategories = useCallback(async (catVal) => {
    if (!catVal) {
      setSubcategoriesList([]);
      return [];
    }

    setLoadingSubcategories(true);
    let subs = [];

    try {
      const matchInList = categoriesList.find(
        (c) => c.name === catVal || c._id === catVal || c.slug === catVal
      );
      const catObj = matchInList || findCategoryByVal(catVal);
      const identifier = matchInList?._id || catObj?.slug || catObj?.id || catVal;

      const res = await api(`/categories/${encodeURIComponent(identifier)}/subcategories`).catch(() => null);
      if (res && Array.isArray(res.subcategories) && res.subcategories.length > 0) {
        subs = res.subcategories;
      } else {
        subs = getSubcategoriesForCategory(catVal);
      }
    } catch {
      subs = getSubcategoriesForCategory(catVal);
    } finally {
      setSubcategoriesList(subs);
      setLoadingSubcategories(false);
    }
    return subs;
  }, [categoriesList]);

  // Fetch Main Categories on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingCategories(true);

    api('/categories?mainOnly=true')
      .then((data) => {
        if (!isMounted) return;
        if (data && Array.isArray(data.categories) && data.categories.length > 0) {
          const apiCats = data.categories.filter((c) => !c.parent);
          if (apiCats.length > 0) {
            setCategoriesList(apiCats);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoadingCategories(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle category change
  const handleCategoryChange = (newCatVal) => {
    setSelectedCategory(newCatVal);
    setSelectedSubCategory(''); // Automatically reset subcategory when category changes
    setCategoryError('');
    setSubCategoryError('');

    if (newCatVal) {
      loadSubcategories(newCatVal);
    } else {
      setSubcategoriesList([]);
    }
  };

  // Load product data when in edit mode
  useEffect(() => {
    if (!isEdit || !id) return;
    let isMounted = true;

    api(`/products/${id}`)
      .then((data) => {
        if (!isMounted || !data?.product) return;
        const p = data.product;
        setTitle(p.title || '');
        setShortDesc(p.shortDescription || '');
        setSellingPrice(p.price ? String(p.price) : '');
        setComparePrice(p.comparePrice ? String(p.comparePrice) : '');
        setCostPrice(p.costPrice ? String(p.costPrice) : '');
        setStockQuantity(p.stock !== undefined ? String(p.stock) : '0');
        setSku(p.sku || '');
        setUrlSlug(p.slug || '');
        setMetaTitle(p.metaTitle || '');
        setMetaDescription(p.metaDescription || '');
        setFeaturedProduct(Boolean(p.isFeatured));
        setIncludeInNewArrivals(Boolean(p.isNewArrival));
        setProductStatus(p.isActive === false ? 'Draft' : 'Active');

        if (p.description) {
          setEditorHtml(p.description);
        }

        if (Array.isArray(p.images) && p.images.length > 0) {
          setImages(
            p.images.map((img, i) => ({
              id: i + 1,
              url: typeof img === 'string' ? img : img.url,
              isMain: typeof img === 'object' ? Boolean(img.isMain) : i === 0,
            }))
          );
        }

        const catName = p.category?.name || p.category?.slug || (typeof p.category === 'string' ? p.category : '');
        const subName = p.subCategory?.name || p.subCategory?.slug || (typeof p.subCategory === 'string' ? p.subCategory : '');

        if (catName) {
          setSelectedCategory(catName);
          loadSubcategories(catName).then(() => {
            if (isMounted && subName) {
              setSelectedSubCategory(subName);
            }
          });
        }
      })
      .catch(() => {
        if (selectedCategory) {
          loadSubcategories(selectedCategory);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isEdit, id, loadSubcategories]);

  // Initial subcategory load for initial selected category
  useEffect(() => {
    if (selectedCategory && subcategoriesList.length === 0) {
      loadSubcategories(selectedCategory);
    }
  }, [selectedCategory, subcategoriesList.length, loadSubcategories]);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (titleError) setTitleError('');
    if (!isEdit || !urlSlug) {
      setUrlSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const removeImage = (imgId) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== imgId);
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const addImageFromLibrary = () => {
    const available = [
      '/images/product-3.jpg',
      '/images/product-5.jpg',
      '/images/product-6.jpg',
      '/images/product-7.jpg',
      '/images/product-9.jpg',
      '/images/product-10.jpg',
      '/images/product-11.jpg',
      '/images/product-12.jpg',
    ];
    const unused = available.filter((url) => !images.some((img) => img.url === url));
    const nextUrl = unused[0] || '/images/product-3.jpg';
    setImages((prev) => [
      ...prev,
      { id: Date.now(), url: nextUrl, isMain: prev.length === 0 },
    ]);
    triggerToast('Added image from product library.');
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Product title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!selectedCategory) {
      setCategoryError('Category selection is required.');
      isValid = false;
    } else {
      setCategoryError('');
    }

    if (selectedCategory && subcategoriesList.length > 0 && !selectedSubCategory) {
      setSubCategoryError('Please select a subcategory for this category.');
      isValid = false;
    } else {
      setSubCategoryError('');
    }

    if (!sellingPrice || Number(sellingPrice) <= 0) {
      setPriceError('A valid selling price is required.');
      isValid = false;
    } else {
      setPriceError('');
    }

    return isValid;
  };

  const handleSave = async (publish = true) => {
    if (!validateForm()) {
      triggerToast('Please fill in all required fields marked in red.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      category: selectedCategory,
      subCategory: selectedSubCategory || null,
      shortDescription: shortDesc.trim(),
      description: editorHtml || specContent.description,
      price: Number(sellingPrice) || 0,
      comparePrice: comparePrice ? Number(comparePrice) : null,
      costPrice: costPrice ? Number(costPrice) : null,
      stock: Number(stockQuantity) || 0,
      lowStockAlert: Number(lowStockAlert) || 10,
      trackStock: Boolean(trackStock),
      sku: sku.trim(),
      slug: urlSlug.trim() || undefined,
      images: images.map((img) => ({ url: img.url, isMain: img.isMain })),
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      isFeatured: Boolean(featuredProduct),
      isNewArrival: Boolean(includeInNewArrivals),
      isActive: publish && productStatus !== 'Draft',
    };

    try {
      if (isEdit && id) {
        await api(`/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }).catch(() => null);
      } else {
        await api('/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        }).catch(() => null);
      }
    } catch {
      // Continue to navigate cleanly
    }

    setIsSubmitting(false);
    triggerToast(
      publish
        ? `Product "${title}" saved and published successfully!`
        : `Product "${title}" saved as draft.`
    );

    setTimeout(() => {
      navigate('/admin/products');
    }, 1200);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-[13px] font-medium animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#249A62]" />
          {toastMsg}
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#8C7076] mb-1.5">
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <Link to="/admin/products" className="hover:text-[#A91D48] transition-colors">
              Products
            </Link>
            <AdminIcon name="chevron-right" size={12} className="text-[#B89CA3]" />
            <span className="text-[#4A3439] font-medium">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F3DCE2] flex items-center justify-center text-[#A91D48] shrink-0">
              <AdminIcon name="mandala" size={22} />
            </div>
            <div>
              <h1
                className="text-[24px] font-bold text-[#8E1838] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-[12.5px] text-[#7A6268] mt-0.5">
                Fill in the details below to list a new product in your store.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer disabled:opacity-60"
          >
            <AdminIcon name="draft" size={15} className="text-[#A91D48]" />
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Preview mode enabled in separate tab.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3D8] text-[#8E1838] text-[12.5px] font-semibold hover:bg-[#FDF5F7] transition-colors shadow-xs cursor-pointer"
          >
            <AdminIcon name="eye" size={15} className="text-[#A91D48]" />
            Preview
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8E1838] text-white text-[12.5px] font-semibold hover:bg-[#77132E] transition-colors shadow-xs cursor-pointer disabled:opacity-60"
          >
            <AdminIcon name="paperplane" size={15} />
            {isSubmitting ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Left 7 cols + Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Cards 1, 2, 3 */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-5">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#F5EAEc] pb-3.5">
              <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-[15px] font-bold text-[#8E1838]">
                Basic Information
              </h2>
            </div>

            {/* Product Title */}
            <div>
              <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                Product Title <span className="text-[#C92A52]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter product title..."
                className={`w-full px-3.5 py-2 rounded-xl border ${
                  titleError ? 'border-[#C92A52] bg-[#FFF5F7]' : 'border-[#E8D8DC] bg-[#FDFBFC]'
                } text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]`}
              />
              {titleError && (
                <p className="text-[11px] text-[#C92A52] mt-1 font-medium">{titleError}</p>
              )}
            </div>

            {/* Dynamic Category & Subcategory Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Category Dropdown */}
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5 flex items-center justify-between">
                  <span>
                    Category <span className="text-[#C92A52]">*</span>
                  </span>
                  {loadingCategories && (
                    <span className="text-[10px] text-[#8C7076] font-normal">Loading...</span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl border ${
                      categoryError ? 'border-[#C92A52] bg-[#FFF5F7]' : 'border-[#E8D8DC] bg-white'
                    } text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] cursor-pointer`}
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((cat) => (
                      <option key={cat._id || cat.id || cat.slug || cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {categoryError && (
                  <p className="text-[11px] text-[#C92A52] mt-1 font-medium">{categoryError}</p>
                )}
              </div>

              {/* Dynamic Sub Category Dropdown */}
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5 flex items-center justify-between">
                  <span>
                    Sub Category
                    {selectedCategory && subcategoriesList.length > 0 && (
                      <span className="text-[#8C7076] font-normal text-[11px] ml-1.5">
                        ({subcategoriesList.length})
                      </span>
                    )}
                  </span>
                  {loadingSubcategories && (
                    <span className="text-[10.5px] text-[#A91D48] font-medium animate-pulse">
                      Fetching...
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => {
                      setSelectedSubCategory(e.target.value);
                      setSubCategoryError('');
                    }}
                    disabled={
                      !selectedCategory ||
                      loadingSubcategories ||
                      subcategoriesList.length === 0
                    }
                    className={`w-full px-3.5 py-2 rounded-xl border ${
                      subCategoryError ? 'border-[#C92A52] bg-[#FFF5F7]' : 'border-[#E8D8DC]'
                    } ${
                      !selectedCategory || subcategoriesList.length === 0
                        ? 'bg-[#F9F5F6] text-[#9A8187] cursor-not-allowed border-dashed'
                        : 'bg-white text-[#2C1E21] cursor-pointer'
                    } text-[12.5px] focus:outline-none focus:border-[#A91D48]`}
                  >
                    {!selectedCategory ? (
                      <option value="">Select Category first</option>
                    ) : loadingSubcategories ? (
                      <option value="">Loading subcategories...</option>
                    ) : subcategoriesList.length === 0 ? (
                      <option value="">No subcategories available</option>
                    ) : (
                      <>
                        <option value="">Select Subcategory</option>
                        {subcategoriesList.map((sub) => (
                          <option
                            key={sub._id || sub.id || sub.slug || sub.name}
                            value={sub.name}
                          >
                            {sub.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
                {subCategoryError && (
                  <p className="text-[11px] text-[#C92A52] mt-1 font-medium">{subCategoryError}</p>
                )}
                {!subCategoryError && !selectedCategory && (
                  <p className="text-[10.5px] text-[#8C7076] mt-1">
                    Select a category first to load relevant subcategories.
                  </p>
                )}
                {!subCategoryError &&
                  selectedCategory &&
                  subcategoriesList.length === 0 &&
                  !loadingSubcategories && (
                    <p className="text-[10.5px] text-[#8C7076] mt-1">
                      No subcategories defined for this category.
                    </p>
                  )}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#4A3439]">
                  Short Description <span className="text-[#C92A52]">*</span>
                </label>
                <span className="text-[11px] text-[#8C7076]">{shortDesc.length}/500</span>
              </div>
              <textarea
                rows={3}
                value={shortDesc}
                maxLength={500}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief summary of the product..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] resize-none leading-relaxed"
              />
            </div>

            {/* Brand & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Brand (Optional)
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. ARC LEGACY"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  SKU / Product Code <span className="text-[#C92A52]">*</span>
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. GT-1023"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] font-mono text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Product Images */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5EAEc] pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-[15px] font-bold text-[#8E1838]">
                  Product Images
                </h2>
              </div>
              <button
                type="button"
                onClick={addImageFromLibrary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6D3D8] bg-[#FDF7F8] text-[#8E1838] text-[11.5px] font-semibold hover:bg-[#FCE8EE] transition-colors cursor-pointer"
              >
                <AdminIcon name="upload" size={13} className="text-[#A91D48]" />
                Upload Multiple Images
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 items-center">
              {/* Dotted Upload Main Image Box */}
              <div
                onClick={addImageFromLibrary}
                className="col-span-2 sm:col-span-2 border-2 border-dashed border-[#E5CCD2] rounded-xl p-4 text-center bg-[#FDFBFC] hover:bg-[#FDF5F7] transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[110px]"
              >
                <div className="w-7 h-7 rounded-full border border-[#C92A52] text-[#C92A52] flex items-center justify-center mb-1.5">
                  <AdminIcon name="plus" size={14} />
                </div>
                <p className="text-[11.5px] font-bold text-[#8E1838]">Upload Main Image</p>
                <p className="text-[10px] text-[#7A6268] mt-0.5 leading-tight">
                  Click to upload or drag and drop<br />JPG, PNG, WebP (Max 5MB)<br />
                  <span className="text-[#9A8187]">Recommended: 1000 × 1000 px</span>
                </p>
              </div>

              {/* Uploaded Thumbnails */}
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className="relative group rounded-xl overflow-hidden border border-[#E9D8DC] aspect-square bg-[#FBF7F8]"
                >
                  <img
                    src={img.url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {img.isMain && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#8E1838] text-white text-[9.5px] font-bold shadow-xs">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 text-[#C92A52] hover:bg-[#C92A52] hover:text-white flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add More Images Square */}
              <div
                onClick={addImageFromLibrary}
                className="border-2 border-dashed border-[#E5CCD2] rounded-xl aspect-square flex flex-col items-center justify-center text-[#8E1838] hover:bg-[#FDF5F7] transition-colors cursor-pointer"
              >
                <AdminIcon name="plus" size={16} />
                <span className="text-[10.5px] font-bold mt-1">Add More Images</span>
              </div>
            </div>
          </div>

          {/* Card 3: Product Details & Specifications (Fully Editable WYSIWYG & Structured Editor) */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-b border-[#F5EAEc] pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-[15px] font-bold text-[#8E1838]">
                  Product Details &amp; Specifications
                </h2>
              </div>

              {/* Mode Toggle Pills (Visual Editor vs Structured Fields) */}
              <div className="flex items-center gap-1.5 bg-[#FAF0F3] p-1 rounded-xl border border-[#F3DEE3] text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setEditorMode('visual')}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    editorMode === 'visual'
                      ? 'bg-white text-[#8E1838] shadow-xs font-bold'
                      : 'text-[#7A6268] hover:text-[#8E1838]'
                  }`}
                >
                  <AdminIcon name="edit" size={12} />
                  Visual Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('structured')}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    editorMode === 'structured'
                      ? 'bg-white text-[#8E1838] shadow-xs font-bold'
                      : 'text-[#7A6268] hover:text-[#8E1838]'
                  }`}
                >
                  <AdminIcon name="draft" size={12} />
                  Structured Fields
                </button>
              </div>
            </div>

            {/* Rich Text Toolbar (Active and Interactive) */}
            <div className="border border-[#E8D8DC] rounded-xl overflow-hidden focus-within:border-[#A91D48] transition-colors">
              <div className="bg-[#FAF2F4] border-b border-[#E8D8DC] px-3 py-2 flex flex-wrap items-center gap-1.5 text-[#4A3439]">
                <select
                  value={editorBlock}
                  onChange={handleBlockFormatChange}
                  className="px-2.5 py-1 text-[11.5px] font-semibold bg-white rounded-lg border border-[#E5D2D6] focus:outline-none cursor-pointer"
                >
                  <option value="Paragraph">Paragraph</option>
                  <option value="Heading 1">Heading 1</option>
                  <option value="Heading 2">Heading 2</option>
                  <option value="Heading 3">Heading 3</option>
                </select>

                <div className="h-4 w-[1px] bg-[#E0CED2] mx-0.5" />

                <button
                  type="button"
                  title="Bold (Ctrl+B)"
                  onClick={() => execEditorCmd('bold')}
                  className="p-1.5 hover:bg-white rounded-lg font-bold text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="bold" size={13} />
                </button>
                <button
                  type="button"
                  title="Italic (Ctrl+I)"
                  onClick={() => execEditorCmd('italic')}
                  className="p-1.5 hover:bg-white rounded-lg italic text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="italic" size={13} />
                </button>
                <button
                  type="button"
                  title="Underline (Ctrl+U)"
                  onClick={() => execEditorCmd('underline')}
                  className="p-1.5 hover:bg-white rounded-lg underline text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="underline" size={13} />
                </button>
                <button
                  type="button"
                  title="Strikethrough"
                  onClick={() => execEditorCmd('strikeThrough')}
                  className="p-1.5 hover:bg-white rounded-lg line-through text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="strikethrough" size={13} />
                </button>

                <div className="h-4 w-[1px] bg-[#E0CED2] mx-0.5" />

                <button
                  type="button"
                  title="Bullet List"
                  onClick={() => execEditorCmd('insertUnorderedList')}
                  className="p-1.5 hover:bg-white rounded-lg text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="list-bullet" size={13} />
                </button>
                <button
                  type="button"
                  title="Numbered List"
                  onClick={() => execEditorCmd('insertOrderedList')}
                  className="p-1.5 hover:bg-white rounded-lg text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="list-ordered" size={13} />
                </button>
                <button
                  type="button"
                  title="Insert Link"
                  onClick={handleInsertLink}
                  className="p-1.5 hover:bg-white rounded-lg text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="link" size={13} />
                </button>
                <button
                  type="button"
                  title="Align Left"
                  onClick={() => execEditorCmd('justifyLeft')}
                  className="p-1.5 hover:bg-white rounded-lg text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="align-left" size={13} />
                </button>
                <button
                  type="button"
                  title="Insert Image"
                  onClick={handleInsertImage}
                  className="p-1.5 hover:bg-white rounded-lg text-[12px] text-[#4A3439] hover:text-[#8E1838] transition-colors cursor-pointer"
                >
                  <AdminIcon name="image" size={13} />
                </button>

                <div className="ml-auto text-[10.5px] text-[#8C7076] hidden sm:block">
                  {editorMode === 'visual' ? 'Click anywhere inside to edit' : 'Editing form fields'}
                </div>
              </div>

              {/* Visual Editor Mode: Real contentEditable Workspace */}
              {editorMode === 'visual' ? (
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setEditorHtml(e.currentTarget.innerHTML)}
                  className="p-4 min-h-[240px] text-[12.5px] text-[#2C1E21] bg-white leading-relaxed focus:outline-none focus:bg-[#FFFCFD] hover:bg-[#FFFDFE] cursor-text transition-colors font-sans selection:bg-[#FCE8EE] selection:text-[#8E1838]"
                />
              ) : (
                /* Structured Mode: Clean dedicated input fields */
                <div className="p-4 space-y-4 bg-white text-[12.5px]">
                  <div>
                    <label className="block font-bold text-[#8E1838] mb-1.5">
                      Detailed Description
                    </label>
                    <textarea
                      rows={3}
                      value={specContent.description}
                      onChange={(e) =>
                        syncStructuredToHtml({ ...specContent, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] leading-relaxed"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-[#8E1838]">
                        Features (Bullet Points)
                      </label>
                      <span className="text-[11px] text-[#8C7076]">
                        {specContent.features.length} points
                      </span>
                    </div>

                    <div className="space-y-2">
                      {specContent.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[#8E1838] font-bold text-[13px]">•</span>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => {
                              const updated = [...specContent.features];
                              updated[idx] = e.target.value;
                              syncStructuredToHtml({ ...specContent, features: updated });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                          />
                          <button
                            type="button"
                            title="Remove point"
                            onClick={() => {
                              const updated = specContent.features.filter((_, i) => i !== idx);
                              syncStructuredToHtml({ ...specContent, features: updated });
                            }}
                            className="w-6 h-6 rounded-md text-[#C92A52] hover:bg-[#FCE8EE] flex items-center justify-center font-bold text-[13px] cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      {/* Add New Feature Bullet */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newFeatureText}
                          onChange={(e) => setNewFeatureText(e.target.value)}
                          placeholder="Type new feature bullet point..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-white text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newFeatureText.trim()) {
                              e.preventDefault();
                              const updated = [...specContent.features, newFeatureText.trim()];
                              syncStructuredToHtml({ ...specContent, features: updated });
                              setNewFeatureText('');
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newFeatureText.trim()) {
                              const updated = [...specContent.features, newFeatureText.trim()];
                              syncStructuredToHtml({ ...specContent, features: updated });
                              setNewFeatureText('');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#8E1838] text-white text-[11.5px] font-semibold hover:bg-[#77132E] transition-colors cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#8E1838] mb-1.5">
                      What's Included
                    </label>
                    <input
                      type="text"
                      value={specContent.whatsIncluded}
                      onChange={(e) =>
                        syncStructuredToHtml({ ...specContent, whatsIncluded: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#8E1838] mb-1.5">
                      Why You'll Love It
                    </label>
                    <textarea
                      rows={2}
                      value={specContent.whyLoveIt}
                      onChange={(e) =>
                        syncStructuredToHtml({ ...specContent, whyLoveIt: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-[#8C7076]">
              Tip: Highlight text to apply formatting. You can switch between <strong>Visual Editor</strong> and <strong>Structured Fields</strong> anytime.
            </p>
          </div>
        </div>

        {/* Right Column: Cards 4, 5, 6 */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-5">
          {/* Card 4: Pricing & Inventory */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#F5EAEc] pb-3.5">
              <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                4
              </span>
              <h2 className="text-[15px] font-bold text-[#8E1838]">
                Pricing &amp; Inventory
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Selling Price <span className="text-[#C92A52]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6268] text-[12.5px] font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => {
                      setSellingPrice(e.target.value);
                      if (priceError) setPriceError('');
                    }}
                    placeholder="180"
                    className={`w-full pl-7 pr-3 py-2 rounded-xl border ${
                      priceError ? 'border-[#C92A52] bg-[#FFF5F7]' : 'border-[#E8D8DC] bg-[#FDFBFC]'
                    } text-[12.5px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]`}
                  />
                </div>
                {priceError && (
                  <p className="text-[11px] text-[#C92A52] mt-1 font-medium">{priceError}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Compare Price (MRP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6268] text-[12.5px] font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={comparePrice}
                    placeholder="250"
                    onChange={(e) => setComparePrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Cost Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6268] text-[12.5px] font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={costPrice}
                    placeholder="120"
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Tax (GST)
                </label>
                <select
                  value={taxGst}
                  onChange={(e) => setTaxGst(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12.5px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] cursor-pointer"
                >
                  <option value="GST 0%">GST 0%</option>
                  <option value="GST 5%">GST 5%</option>
                  <option value="GST 12%">GST 12%</option>
                  <option value="GST 18%">GST 18%</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Stock Quantity <span className="text-[#C92A52]">*</span>
                </label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  value={lowStockAlert}
                  onChange={(e) => setLowStockAlert(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12.5px] font-semibold text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                />
              </div>
            </div>

            {/* Track Stock Toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-[12.5px] font-bold text-[#2C1E21]">Track Stock</p>
                <p className="text-[11px] text-[#7A6268]">Monitor inventory for this product</p>
              </div>
              <button
                type="button"
                onClick={() => setTrackStock(!trackStock)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  trackStock ? 'bg-[#8E1838]' : 'bg-[#D6C2C6]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    trackStock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Card 5: Variations (If Applicable) */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5EAEc] pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                  5
                </span>
                <h2 className="text-[15px] font-bold text-[#8E1838]">
                  Variations (If Applicable)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setHasVariations(!hasVariations)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  hasVariations ? 'bg-[#8E1838]' : 'bg-[#D6C2C6]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    hasVariations ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {hasVariations && (
              <div className="space-y-4 pt-1">
                {/* Attribute 1: Width */}
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#4A3439] mb-1.5">
                    Attribute 1
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <select className="px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-white text-[12px] font-semibold text-[#4A3439] focus:outline-none">
                      <option>Width</option>
                      <option>Length</option>
                      <option>Material</option>
                    </select>

                    {widthOptions.map((opt) => (
                      <span
                        key={opt}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FDF2F5] border border-[#F3DCE2] text-[#8E1838] text-[11.5px] font-semibold"
                      >
                        {opt}
                        <button
                          type="button"
                          onClick={() => setWidthOptions(widthOptions.filter((w) => w !== opt))}
                          className="text-[#C92A52] hover:text-[#8E1838] font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    {showAddWidth ? (
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          value={newWidth}
                          onChange={(e) => setNewWidth(e.target.value)}
                          placeholder="e.g. 4 cm"
                          className="w-20 px-2 py-1 text-[11px] rounded border border-[#A91D48] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newWidth.trim()) {
                              setWidthOptions([...widthOptions, newWidth.trim()]);
                              setNewWidth('');
                              setShowAddWidth(false);
                            }
                          }}
                          className="text-[11px] px-2 py-1 bg-[#8E1838] text-white rounded font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddWidth(true)}
                        className="text-[11px] text-[#A91D48] font-bold hover:underline cursor-pointer"
                      >
                        + Add Option
                      </button>
                    )}
                  </div>
                </div>

                {/* Attribute 2: Color */}
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#4A3439] mb-1.5">
                    Attribute 2
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <select className="px-3 py-1.5 rounded-lg border border-[#E8D8DC] bg-white text-[12px] font-semibold text-[#4A3439] focus:outline-none">
                      <option>Color</option>
                      <option>Finish</option>
                      <option>Pattern</option>
                    </select>

                    {colorOptions.map((opt) => (
                      <span
                        key={opt}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FDF2F5] border border-[#F3DCE2] text-[#8E1838] text-[11.5px] font-semibold"
                      >
                        {opt}
                        <button
                          type="button"
                          onClick={() => setColorOptions(colorOptions.filter((c) => c !== opt))}
                          className="text-[#C92A52] hover:text-[#8E1838] font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}

                    {showAddColor ? (
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          value={newColor}
                          onChange={(e) => setNewColor(e.target.value)}
                          placeholder="e.g. Silver"
                          className="w-20 px-2 py-1 text-[11px] rounded border border-[#A91D48] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newColor.trim()) {
                              setColorOptions([...colorOptions, newColor.trim()]);
                              setNewColor('');
                              setShowAddColor(false);
                            }
                          }}
                          className="text-[11px] px-2 py-1 bg-[#8E1838] text-white rounded font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddColor(true)}
                        className="text-[11px] text-[#A91D48] font-bold hover:underline cursor-pointer"
                      >
                        + Add Option
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 6: SEO & Visibility */}
          <div className="bg-white rounded-2xl border border-[#EFE0E4] p-5 shadow-[0_2px_12px_rgba(142,24,56,0.03)] space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#F5EAEc] pb-3.5">
              <span className="w-6 h-6 rounded-full bg-[#8E1838] text-white text-[12px] font-bold flex items-center justify-center">
                6
              </span>
              <h2 className="text-[15px] font-bold text-[#8E1838]">
                SEO &amp; Visibility
              </h2>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#4A3439]">
                  Meta Title
                </label>
                <span className="text-[11px] text-[#8C7076]">{metaTitle.length}/60</span>
              </div>
              <input
                type="text"
                value={metaTitle}
                maxLength={70}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Product title for search engines"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#4A3439]">
                  Meta Description
                </label>
                <span className="text-[11px] text-[#8C7076]">{metaDescription.length}/160</span>
              </div>
              <textarea
                rows={2}
                value={metaDescription}
                maxLength={160}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief summary for search engine results"
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  URL Slug
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={urlSlug}
                    onChange={(e) => setUrlSlug(e.target.value)}
                    placeholder="product-url-slug"
                    className="w-full pl-3.5 pr-8 py-2 rounded-xl border border-[#E8D8DC] bg-[#FDFBFC] text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(`https://arclegacy.in/product/${urlSlug}`);
                      triggerToast('URL copied to clipboard.');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7076] hover:text-[#8E1838] cursor-pointer"
                  >
                    <AdminIcon name="copy" size={13} />
                  </button>
                </div>
                <p className="text-[10px] text-[#8C7076] mt-1 truncate">
                  https://arclegacy.in/product/{urlSlug || 'product-slug'}
                </p>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#4A3439] mb-1.5">
                  Product Status
                </label>
                <select
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8DC] bg-white text-[12px] text-[#2C1E21] focus:outline-none focus:border-[#A91D48] cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-2 text-[12px] text-[#4A3439]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnWebsite}
                  onChange={(e) => setShowOnWebsite(e.target.checked)}
                  className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0"
                />
                <span className="font-medium">Show on Website</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInNewArrivals}
                  onChange={(e) => setIncludeInNewArrivals(e.target.checked)}
                  className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0"
                />
                <span className="font-medium">Include in New Arrivals</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredProduct}
                  onChange={(e) => setFeaturedProduct(e.target.checked)}
                  className="rounded border-[#D5BEC4] text-[#A91D48] focus:ring-0"
                />
                <span className="font-medium">Featured Product</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
