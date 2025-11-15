# Vuesic

Vuesic is a free, immersive audio-visual showcase builder. Craft looping 3D galleries, pair them with custom audio, and share the results as living experiences. Built with React Three Fiber, Three.js, and Next.js, Vuesic blends motion, depth, and sound into a unified canvas.

![Vuesic](https://img.shields.io/badge/Vuesic-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-Latest-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

- **Infinite 3D Scrolling**: Seamlessly navigate through images in a three-dimensional space
- **Custom Shader Materials**: Beautiful cloth-like effects with dynamic curving and rippling animations
- **Interactive Controls**: 
  - Mouse wheel scrolling
  - Keyboard navigation (Arrow keys)
  - Touch support for mobile devices
- **Auto-play Mode**: Automatically resumes scrolling after 3 seconds of inactivity
- **Dynamic Blur & Fade**: Smooth depth-of-field effects that enhance the 3D experience
- **Spatial Distribution**: Images are intelligently positioned in 3D space using golden angle distribution
- **Hover Effects**: Flag-like waving animation when hovering over images
- **WebGL Fallback**: Graceful degradation for devices without WebGL support
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Interactive-Gallery-Portfolio/Interactive-Gallery-Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Adding Your Images

Place your images in the `public/` directory and update the sample images array in `app/page.tsx`:

```typescript
const sampleImages = [
  { src: '/your-image-1.webp', alt: 'Description 1' },
  { src: '/your-image-2.webp', alt: 'Description 2' },
  // Add more images...
];
```

### Configuring Gallery Settings

The `InfiniteGallery` component accepts several props for customization:

```typescript
<InfiniteGallery
  images={sampleImages}
  speed={1.2}              // Scroll speed multiplier
  zSpacing={3}             // Spacing between images along Z-axis
  visibleCount={12}        // Number of visible image planes
  falloff={{              // Opacity falloff distances
    near: 0.8,
    far: 14
  }}
  fadeSettings={{         // Custom fade in/out ranges
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 }
  }}
  blurSettings={{         // Custom blur settings
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0
  }}
/>
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
- **3D Utilities**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Fonts**: Geist Mono & Instrument Serif

## 📁 Project Structure

```
Vuesic/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main Vuesic home experience
│   └── globals.css         # Global styles
├── components/
│   ├── InfiniteGallery.tsx # Main 3D gallery component
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets (images)
└── styles/
    └── globals.css        # Additional global styles
```

## 🎯 Key Implementation Details

### Custom Shader Materials

The gallery uses custom GLSL shaders to create:
- **Cloth-like curving**: Images curve naturally based on scroll velocity
- **Ripple effects**: Subtle cloth-like ripples that respond to movement
- **Flag waving**: Hover effects that create a flag-like waving motion
- **Dynamic blur**: Depth-based blur that enhances the 3D effect

### Spatial Distribution Algorithm

Images are positioned using a golden angle distribution pattern, ensuring natural and visually pleasing spacing in 3D space.

### Performance Optimizations

- Material pooling to minimize object creation
- Efficient texture loading with `useTexture` hook
- Optimized render loop with `useFrame`
- WebGL support detection with graceful fallback

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with love using amazing open-source libraries. Special thanks to the React Three Fiber and Three.js communities for their incredible work.

---

For questions, suggestions, or contributions, please open an issue or submit a pull request.
