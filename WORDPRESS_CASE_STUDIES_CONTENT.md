# WordPress Case Studies Content Guide

This document provides content for creating case studies in WordPress using the **Case Studies Custom Post Type** with ACF Pro.

## Setup Instructions

1. **Install ACF Pro Plugin** - Required for structured data
2. **Add the PHP script** provided to your theme's `functions.php` or as a plugin
3. The custom post type `case_study` will be automatically registered
4. Create new case studies from WordPress Admin → Case Studies → Add New
5. Fill in the ACF fields as described below

## REST API Endpoint

The case studies are available at:
- **List all:** `/wp-json/wp/v2/case-studies`
- **Single by slug:** `/wp-json/wp/v2/case-studies?slug=your-slug`

All ACF fields are automatically exposed in the `case_study_data` object in the REST API response.

### ACF Field Groups

The PHP script creates two ACF field groups:

#### 1. 📋 Listing Page Data
- **Category** - Select dropdown (web-app, mobile-app, website, branding)
- **Card Image** - Image field (optional, uses featured image if empty)
- **Tech Stack** - Text field
- **Timeline** - Text field
- **Tags** - Repeater field (multiple tags)
- **Badges** - Repeater field (label + flag emoji)
- **Results** - Repeater field (multiple results)
- **Testimonials** - Repeater field (avatar, name, position, quote)
- **Button Text** - Text field

#### 2. 🎨 Case Study Details
- **Rating** - Text field
- **Launch Date** - Text field
- **Highlights** - Repeater field (icon, title, subtitle)
- **Color Palette** - Repeater field (name, hex, rgb)
- **Technologies** - Repeater field (multiple technologies)
- **Short Description** - Textarea
- **Inside Look Screenshots** - Repeater field (image + title)
- **Overall Score** - Text field
- **Evaluation Metrics** - Repeater field (category + score)
- **Jury Members** - Repeater field (avatar, name, role, vote)
- **Collections** - Repeater field (image, type, subtitle, title)

---

## Case Study 1: Isora

**Post Title:** Isora – optimizing governance, risk & compliance for top institutions

**Slug:** `isora` (or `case-study-isora` - WordPress will auto-generate from title)

**Featured Image:** Upload a professional image (1200x800px recommended)

**Content:**
```
Isora is a comprehensive governance, risk, and compliance platform designed for top financial institutions. This case study explores how we transformed a complex enterprise application into an intuitive, user-friendly system that doubled workflow efficiency and reduced time-to-market by 50%.
```

**📋 Listing Page Data:**
- **Category:** Select `web-app` from dropdown
- **Card Image:** (Optional - uses featured image if empty)
- **Tech Stack:** `React, Python, AWS`
- **Timeline:** `12 months, ongoing`
- **Tags:** Add multiple tags using the repeater:
  - `#UX AUDIT`
  - `#PRODUCT REDESIGN`
  - `#WEB DEVELOPMENT`
  - `#TEAM EXTENTION`
- **Badges:** Add badges using the repeater:
  - Label: `SALTYCLOUD`, Flag: (leave empty)
  - Label: `TEXAS, USA`, Flag: `🇺🇸`
- **Results:** Add results using the repeater:
  - `2x faster user workflows`
  - `50% shorter time-to-market`
  - `Nominated for UX Design Award 2024`
- **Testimonials:** Add testimonial using the repeater:
  - Avatar: (Upload image)
  - Name: `Izek Lal`
  - Position: `Country manager`
  - Quote: `We have seen a significant improvement in terms of mobile friendliness and the general flow of the system. I believe this has contributed significantly to the growth of our business. Many thanks, Phenomenon.`
- **Button Text:** `EXPLORE`

**🎨 Case Study Details:**
- **Rating:** `8.5`
- **Launch Date:** `Jan 2024`
- **Highlights:** Add highlights using the repeater:
  - Icon: `⚡`, Title: `2x increase in user efficiency`, Subtitle: `Optimized workflows and intuitive design improvements doubled user efficiency`
  - Icon: `🚀`, Title: `50% reduced time-to-market`, Subtitle: `A robust design system accelerated development by over 50%`
  - Icon: `🏆`, Title: `Industry recognition`, Subtitle: `Nominated for UX Design Award 2024`
- **Technologies:** Add technologies using the repeater:
  - `React`
  - `Python`
  - `AWS`
- **Short Description:** `Transforming enterprise GRC through intuitive design and streamlined workflows that doubled user efficiency.`
- **Inside Look Screenshots:** Add screenshots using the repeater:
  - Image: (Upload dashboard screenshot), Title: `Dashboard with role-based views`
  - Image: (Upload workflow screenshot), Title: `Streamlined workflow interface`
  - Image: (Upload mobile screenshot), Title: `Mobile-responsive design`
- **Overall Score:** `8.5`
- **Evaluation Metrics:** Add metrics using the repeater:
  - Category: `Design`, Score: `9.2`
  - Category: `UX`, Score: `8.8`
  - Category: `Performance`, Score: `8.0`

---

## Case Study 2: Mobile Banking App

**Page Title:** Mobile Banking App

**Slug:** `case-study-mobile-banking`

**Content:**
```
A comprehensive mobile banking application that revolutionized how users interact with their finances. This case study details the design process, user research, and technical implementation that led to a 3x increase in user engagement.
```

**Custom Fields:**
- **Category:** `mobile-app`
- **Tags:** `#MOBILE, #FINTECH, #UX DESIGN`
- **Tech Stack:** `React Native, Node.js, Firebase`
- **Timeline:** `8 months`
- **Results:**
  - 3x increase in user engagement
  - 4.8 star rating on app stores
  - Featured by Apple
- **Badges:**
  - Label: `FINTECH CO`, Flag: (empty)
  - Label: `NEW YORK, USA`, Flag: `🇺🇸`

---

## Case Study 3: E-Commerce Platform Revolution

**Page Title:** E-Commerce Platform Revolution

**Slug:** `case-study-ecommerce`

**Content:**
```
Transforming an e-commerce platform to achieve 5x conversion rate increase and 200% revenue growth. This case study explores the design thinking, user experience improvements, and technical optimizations that drove these results.
```

**Custom Fields:**
- **Category:** `web-app`
- **Tags:** `#E-COMMERCE, #FULL-STACK, #PAYMENT INTEGRATION`
- **Tech Stack:** `Next.js, Stripe, PostgreSQL`
- **Timeline:** `10 months`
- **Results:**
  - 5x increase in conversion rate
  - 200% revenue growth
  - Best E-Commerce Site 2025
- **Badges:**
  - Label: `SHOPIFY PLUS`, Flag: (empty)
  - Label: `LONDON, UK`, Flag: `🇬🇧`
- **Testimonial:**
  - Name: `Marcus Chen`
  - Position: `CEO & Founder`
  - Quote: `The team delivered beyond our expectations. The platform's performance and user experience are exceptional. Our revenue has tripled since launch.`

---

## Case Study 4: Corporate Brand Identity

**Page Title:** Corporate Brand Identity

**Slug:** `case-study-branding`

**Content:**
```
A complete brand identity overhaul for a global corporation, including logo design, brand guidelines, and visual identity system. This project resulted in a complete brand transformation and Red Dot Design Award recognition.
```

**Custom Fields:**
- **Category:** `branding`
- **Tags:** `#BRANDING, #DESIGN SYSTEM, #VISUAL IDENTITY`
- **Tech Stack:** `Figma, Adobe Suite, Design Tokens`
- **Timeline:** `6 months`
- **Results:**
  - Complete brand overhaul
  - 40+ design components
  - Red Dot Design Award
- **Badges:**
  - Label: `GLOBAL CORP`, Flag: (empty)
  - Label: `DUBAI, UAE`, Flag: `🇦🇪`

---

## Case Study 5: Healthcare Management Platform

**Page Title:** Healthcare Management Platform

**Slug:** `case-study-healthcare`

**Content:**
```
A comprehensive healthcare management platform that revolutionized patient data management. This case study details the HIPAA-compliant architecture, intuitive interface design, and security features that made it indispensable for healthcare operations.
```

**Custom Fields:**
- **Category:** `web-app`
- **Tags:** `#HEALTHCARE, #SAAS, #DATA VISUALIZATION`
- **Tech Stack:** `Vue.js, Django, MongoDB`
- **Timeline:** `14 months`
- **Results:**
  - 60% reduction in admin time
  - HIPAA compliant architecture
  - 10,000+ active users
- **Badges:**
  - Label: `MEDICARE SYSTEMS`, Flag: (empty)
  - Label: `TORONTO, CANADA`, Flag: `🇨🇦`
- **Testimonial:**
  - Name: `Dr. Sarah Mitchell`
  - Position: `Chief Medical Officer`
  - Quote: `The platform has revolutionized how we manage patient data. The intuitive interface and robust security features make it indispensable for our operations.`

---

## Notes for WordPress Setup

1. **Custom Post Type:** The PHP script automatically creates the `case_study` post type
2. **REST API:** Case studies are available at `/wp-json/wp/v2/case-studies`
3. **Featured Image:** Always set a featured image for each case study (used as fallback if card image is empty)
4. **Categories:** Use the exact category values from dropdown: `web-app`, `mobile-app`, `website`, `branding`
5. **Tags:** Use hashtag format: `#TAG NAME` (add multiple using repeater)
6. **Repeater Fields:** All repeater fields support multiple entries - click "+ Add" to add more
7. **ACF Fields:** All fields are automatically exposed in REST API under `case_study_data` object

## Data Structure in REST API

When you fetch a case study from WordPress REST API, the response will include:

```json
{
  "id": 1,
  "title": { "rendered": "Case Study Title" },
  "slug": "case-study-slug",
  "content": { "rendered": "..." },
  "case_study_data": {
    "category": "web-app",
    "image": "https://...",
    "tags": ["#UX AUDIT", "#PRODUCT REDESIGN"],
    "badges": [{"label": "COMPANY", "flag": "🇺🇸"}],
    "techStack": "React, Python, AWS",
    "timeline": "12 months",
    "results": ["2x faster workflows", "50% shorter time"],
    "testimonials": [...],
    "rating": "8.5",
    "highlights": [...],
    "technologies": ["React", "Python"],
    // ... all other ACF fields
  }
}
```

## Testing

After creating case studies in WordPress:
1. Visit `/case-studies` to see if they appear in the listing
2. Click on a case study to view the detail page
3. Check browser console for any API errors
4. If WordPress data doesn't load, the demo data will show as fallback
5. Test REST API directly: `/wp-json/wp/v2/case-studies` to verify data structure
