// Custom Vector Icon System for ARC LEGACY Admin Panel
// Unified 24x24 grid, 1.75px stroke weight, rounded caps & joins, minimal & purposeful geometry.

export function AdminIcon({ name, size, strokeWidth = 1.75, className = '' }) {
  const hasSizeClass = /\b(w-|h-|size-)/.test(className);
  const resolvedClass = className
    ? `${!size && !hasSizeClass ? 'h-4 w-4 ' : ''}shrink-0 ${className}`.trim()
    : size
      ? 'shrink-0'
      : 'h-4 w-4 shrink-0';

  const baseProps = {
    viewBox: '0 0 24 24',
    ...(size ? { width: size, height: size } : {}),
    className: resolvedClass,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: String(strokeWidth),
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'dashboard':
      return (
        <svg {...baseProps}>
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5z" />
        </svg>
      );
    case 'products':
      return (
        <svg {...baseProps}>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case 'orders':
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2.5 3h2.5l2.2 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 7H6" />
        </svg>
      );
    case 'customers':
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="7" r="3.5" />
          <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h4a4.5 4.5 0 0 1 4.5 4.5V20" />
          <path d="M16 3.5a3.5 3.5 0 0 1 0 7" />
          <path d="M21.5 20v-1.5a4.5 4.5 0 0 0-3-4.2" />
        </svg>
      );
    case 'wholesale':
      return (
        <svg {...baseProps}>
          <path d="M3 9l1.8-5h14.4L21 9" />
          <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
          <path d="M4 11.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8.5" />
          <path d="M9.5 21v-5.5h5V21" />
        </svg>
      );
    case 'coupons':
      return (
        <svg {...baseProps}>
          <rect x="3" y="8" width="18" height="13" rx="1.5" />
          <path d="M12 8v13" />
          <path d="M3 12h18" />
          <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8z" />
          <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5C13 3 12 8 12 8z" />
        </svg>
      );
    case 'content':
      return (
        <svg {...baseProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      );
    case 'design':
      return (
        <svg {...baseProps}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 16v4" />
        </svg>
      );
    case 'reports':
      return (
        <svg {...baseProps}>
          <path d="M3 3v18h18" />
          <path d="m7 15 4-4 3 3 5-6" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg {...baseProps}>
          <path d="m3 11 15-6v14L3 13v-2z" />
          <path d="M6 13.5V19a1.5 1.5 0 0 0 3 0v-4" />
          <path d="M20.5 9.5a3.5 3.5 0 0 1 0 5" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.3 2.3 4.7-4.8" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'draft':
      return (
        <svg {...baseProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h4" />
        </svg>
      );
    case 'search':
      return (
        <svg {...baseProps}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'filter':
      return (
        <svg {...baseProps}>
          <polygon points="3 4 21 4 14 12.5 14 19 10 21 10 12.5 3 4" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...baseProps}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...baseProps}>
          <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...baseProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 'copy':
      return (
        <svg {...baseProps}>
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case 'more':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="5" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="12" cy="19" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...baseProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...baseProps}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'crown':
      return (
        <svg {...baseProps}>
          <path d="m3 18 2-11 5 4 2-6 2 6 5-4 2 11H3z" />
        </svg>
      );
    case 'support':
      return (
        <svg {...baseProps}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      );
    case 'folder':
      return (
        <svg {...baseProps}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...baseProps}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...baseProps}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'image':
      return (
        <svg {...baseProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" />
          <path d="m21 15-5-5L5 20" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...baseProps}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...baseProps}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case 'help-circle':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 0 1 4.8.8c0 1.7-2.3 2.2-2.3 3.7" />
          <circle cx="12" cy="17" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'chat-help':
      return (
        <svg {...baseProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M10 8.5a2 2 0 0 1 3.8.7c0 1.3-1.8 1.7-1.8 2.8" />
          <circle cx="12" cy="14.5" r="0.7" fill="currentColor" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...baseProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      );
    case 'cloud-upload':
      return (
        <svg {...baseProps}>
          <path d="M16 16l-4-4-4 4" />
          <path d="M12 12v9" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
      );
    case 'video':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="10 8.5 16 12 10 15.5 10 8.5" fill="currentColor" />
        </svg>
      );
    case 'sort':
      return (
        <svg {...baseProps}>
          <path d="m7 15-3 3-3-3" />
          <path d="M4 18V6" />
          <path d="m17 9 3-3 3 3" />
          <path d="M20 6v12" />
        </svg>
      );
    case 'upload':
      return (
        <svg {...baseProps}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      );
    case 'floral':
      return (
        <svg {...baseProps}>
          <path d="M12 2.5C13.8 5.5 13.8 8.5 12 11.5C10.2 8.5 10.2 5.5 12 2.5Z" />
          <path d="M12 12.5C13.8 15.5 13.8 18.5 12 21.5C10.2 18.5 10.2 15.5 12 12.5Z" />
          <path d="M2.5 12C5.5 10.2 8.5 10.2 11.5 12C8.5 13.8 5.5 13.8 2.5 12Z" />
          <path d="M12.5 12C15.5 10.2 18.5 10.2 21.5 12C18.5 13.8 15.5 13.8 12.5 12Z" />
          <circle cx="12" cy="12" r="1.8" />
        </svg>
      );
    case 'user-plus':
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="7" r="3.5" />
          <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h4a4.5 4.5 0 0 1 4.5 4.5V20" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="16" y1="11" x2="22" y2="11" />
        </svg>
      );
    case 'shopping-bag':
      return (
        <svg {...baseProps}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'rupee':
      return (
        <svg {...baseProps}>
          <path d="M6 4h12" />
          <path d="M6 8.5h12" />
          <path d="M9.5 4c3.5 0 5.5 2 5.5 4.5S13 13 9.5 13H6l8.5 7" />
        </svg>
      );
    case 'download':
      return (
        <svg {...baseProps}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'percent':
      return (
        <svg {...baseProps}>
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg {...baseProps}>
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M2 9h20" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...baseProps}>
          <path d="M12 20s-7.5-4.35-9.5-8.5C1 7.5 3.5 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 15.65 12 20 12 20z" />
        </svg>
      );
    case 'award':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="8" r="5" />
          <polyline points="8.5 12.5 7 21 12 18.5 17 21 15.5 12.5" />
        </svg>
      );
    case 'building':
      return (
        <svg {...baseProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M9 22v-4h6v4" />
        </svg>
      );
    case 'star':
      return (
        <svg {...baseProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'thumbs-up':
      return (
        <svg {...baseProps}>
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      );
    case 'thumbs-down':
      return (
        <svg {...baseProps}>
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
      );
    case 'reply':
      return (
        <svg {...baseProps}>
          <polyline points="9 17 4 12 9 7" />
          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
      );
    case 'send':
      return (
        <svg {...baseProps}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...baseProps}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'click':
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="9" r="5" />
          <path d="m13 13 7 2-3 2-2 3-2-7z" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg {...baseProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...baseProps}>
          <rect x="1" y="3" width="15" height="13" rx="1.5" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'x-circle':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'cart-x':
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2.5 3h2.5l2.2 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 7H6" />
          <line x1="12" y1="9.5" x2="15.5" y2="13" />
          <line x1="15.5" y1="9.5" x2="12" y2="13" />
        </svg>
      );
    case 'undo':
      return (
        <svg {...baseProps}>
          <polyline points="9 14 4 9 9 4" />
          <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
        </svg>
      );
    case 'printer':
      return (
        <svg {...baseProps}>
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" rx="1" />
        </svg>
      );
    case 'plus-circle':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case 'box':
      return (
        <svg {...baseProps}>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case 'eye-off':
      return (
        <svg {...baseProps}>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      );
    case 'alert-triangle':
    case 'warning':
      return (
        <svg {...baseProps}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'camera':
      return (
        <svg {...baseProps}>
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case 'ruler':
      return (
        <svg {...baseProps}>
          <path d="m21.7 5.7-3.4-3.4a2.4 2.4 0 0 0-3.4 0L2.3 14.9a2.4 2.4 0 0 0 0 3.4l3.4 3.4a2.4 2.4 0 0 0 3.4 0L21.7 9.1a2.4 2.4 0 0 0 0-3.4z" />
          <line x1="7.5" y1="10.5" x2="9.5" y2="8.5" />
          <line x1="10.5" y1="13.5" x2="13.5" y2="10.5" />
          <line x1="13.5" y1="16.5" x2="15.5" y2="14.5" />
        </svg>
      );
    case 'trash':
    case 'delete':
      return (
        <svg {...baseProps}>
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case 'paperplane':
      return (
        <svg {...baseProps}>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...baseProps}>
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.67-1.19" />
        </svg>
      );
    case 'bold':
      return (
        <svg {...baseProps}>
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        </svg>
      );
    case 'italic':
      return (
        <svg {...baseProps}>
          <line x1="19" y1="4" x2="10" y2="4" />
          <line x1="14" y1="20" x2="5" y2="20" />
          <line x1="15" y1="4" x2="9" y2="20" />
        </svg>
      );
    case 'underline':
      return (
        <svg {...baseProps}>
          <path d="M6 3v7a6 6 0 0 0 12 0V3" />
          <line x1="4" y1="21" x2="20" y2="21" />
        </svg>
      );
    case 'strikethrough':
      return (
        <svg {...baseProps}>
          <path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      );
    case 'list-bullet':
      return (
        <svg {...baseProps}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="4" cy="6" r="1.5" fill="currentColor" />
          <circle cx="4" cy="12" r="1.5" fill="currentColor" />
          <circle cx="4" cy="18" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'list-ordered':
      return (
        <svg {...baseProps}>
          <line x1="10" y1="6" x2="21" y2="6" />
          <line x1="10" y1="12" x2="21" y2="12" />
          <line x1="10" y1="18" x2="21" y2="18" />
          <path d="M4 6h2V4H4" />
          <path d="M4 10h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4h3" />
          <path d="M4 16h2a1 1 0 0 1 1 1v.5a.5.5 0 0 1-.5.5.5.5 0 0 1 .5.5v.5a1 1 0 0 1-1 1H4" />
        </svg>
      );
    case 'link':
      return (
        <svg {...baseProps}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'align-left':
      return (
        <svg {...baseProps}>
          <line x1="17" y1="10" x2="3" y2="10" />
          <line x1="21" y1="6" x2="3" y2="6" />
          <line x1="21" y1="14" x2="3" y2="14" />
          <line x1="17" y1="18" x2="3" y2="18" />
        </svg>
      );
    case 'database':
      return (
        <svg {...baseProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'cloud-download':
      return (
        <svg {...baseProps}>
          <path d="M12 17v-8m0 8l-3-3m3 3l3-3" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
      );
    case 'default':
      return null;
  }
}

export default AdminIcon;


