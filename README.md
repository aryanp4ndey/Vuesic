# Interactive Gallery Portfolio

Interactive Gallery Portfolio is an immersive 3D portfolio/gallery experience. Craft looping, depth-rich galleries, pair them with custom background audio, and overlay your own hero text to create a personal, living showcase. Built with Next.js, React Three Fiber, and Three.js, it blends motion, depth, and sound into a unified canvas.

![Interactive Gallery Portfolio](https://img.shields.io/badge/Interactive%20Gallery-Portfolio-success)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-Latest-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

- **Infinite 3D Scrolling**: Seamlessly navigate through images in a three-dimensional space.
- **Custom Shader Materials**: Cloth-like effects with dynamic curving, rippling, and flag-style waving animations.
- **Interactive Controls**:
  - Mouse wheel scrolling
  - Keyboard navigation (Arrow keys)
  - Touch support for mobile devices
- **Auto-play Mode**: Automatically resumes scrolling after 3 seconds of inactivity.
- **Dynamic Blur & Fade**: Depth-aware blur and fade for a cinematic 3D effect.
- **Spatial Distribution**: Images are intelligently positioned in 3D space using golden angle–inspired distribution.
- **Hover Effects**: Flag-like waving animation when hovering over image planes.
- **Edit Modal (No-Code Customization)**:
  - Update the central portfolio text (with italic formatting support via `;` or `,`)
  - Upload up to 10 custom images
  - Attach a looping background audio track
- **Audio Integration**: Background audio auto-plays when allowed and loops seamlessly, with graceful handling of browser autoplay restrictions.
- **WebGL Fallback**: Graceful degradation for devices without WebGL support (shows a responsive image grid).
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Interactive-Gallery-Portfolio
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

### Editing Portfolio Text, Images, and Audio

Most of the customization can be done directly in the UI:

- **Hero Text**: Click the circular **Edit** button (bottom-left on desktop, top-right on mobile) to open the editor.
  - Use a **semicolon** to italicize the first part of the text, e.g. `I'm; Batman` → `I'm` italic, `Batman` normal.
  - Alternatively, a phrase like `I'm, Batman` will italicize the part before the comma.
- **Images**: In the Edit modal, upload up to 10 images (JPG, PNG, WebP, etc.). These will be used by the 3D gallery.
- **Background Audio**: Upload an audio file (MP3, WAV, OGG, etc.) to loop in the background of the experience.

### Adding Your Images

If you prefer to configure defaults in code, you can place images in the `public/` directory and update the initial images array in `app/page.tsx`:

```typescript
const [images, setImages] = useState([
  { src: '/batman1.jpg', alt: 'Batman Image 1' },
  { src: '/batman2.jpg', alt: 'Batman Image 2' },
  // Add or replace with your own images...
]);
```

### Configuring Gallery Settings

The `InfiniteGallery` component accepts several props for customization:

```typescript
<InfiniteGallery
  images={sampleImages}
  speed={1.2}              // Scroll speed multiplier
  zSpacing={3}             // Spacing between images along Z-axis
  visibleCount={12}        // Number of visible image planes
  falloff={{               // Opacity falloff distances
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
Interactive-Gallery-Portfolio/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main interactive gallery + edit UI
│   └── globals.css             # Global styles (Next.js app entry)
├── components/
│   ├── InfiniteGallery.tsx     # Main 3D gallery component (R3F + shaders)
│   ├── EditModal.tsx           # UI to edit text, images, and audio
│   └── theme-provider.tsx      # Theme context provider
├── lib/
│   └── utils.ts               # Utility functions
├── public/                    # Static assets (images, favicon, etc.)
│   ├── batman1.jpg
│   ├── batman2.jpg
│   └── ...                    # Your gallery images
└── styles/
    └── globals.css            # Additional/global styles
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
- WebGL support detection with graceful fallback to a simple image grid

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with love using amazing open-source libraries. Special thanks to the React Three Fiber and Three.js communities for their incredible work.

---

For questions, suggestions, or contributions, please open an issue or submit a pull request.
