# DrawingPanel Component

A fully-featured, accessible drawing panel component similar to Canva, built with React and once-ui components. This component allows users to create digital art with various drawing tools, shapes, text, image uploads, and extensive customization options.

## ✨ Features

### 🎨 Drawing Tools
- **Pen Tool (P)**: Freehand drawing with smooth lines
- **Eraser Tool (E)**: Remove unwanted elements from the canvas
- **Select Tool (V)**: For future selection and manipulation features
- **Rectangle Tool (R)**: Draw rectangular shapes
- **Circle Tool (C)**: Draw circular shapes with radius control
- **Text Tool (T)**: Add text with custom positioning

### 🖼️ Canvas Backgrounds

Multiple background options with intelligent theme switching:

1. **Auto (Theme)** - Default option
   - Light mode: White background
   - Dark mode: Dark grey background (#1a1a1a)
   - Automatically switches based on system theme

2. **Dark Grey**
   - Light mode: Dark grey (#2d2d2d)
   - Dark mode: White
   - Inverse of Auto mode

3. **Transparent**
   - No background fill
   - Shows checkerboard pattern
   - Perfect for creating overlays or stickers

4. **Custom Color**
   - Color picker for visual selection
   - Text input for hex values (#ffffff)
   - RGBA support (rgba(255, 255, 255, 0.5))
   - Real-time preview

5. **Gradient**
   - **Linear Gradient**: Straight color transition with adjustable angle (0-360°)
   - **Radial Gradient**: Circular color transition from center
   - Two-color gradient support
   - Visual color pickers for each color

### 🎯 Customization
- **Color Picker**: Choose any color for drawing
- **Hex/RGBA Input**: Manual color entry with full transparency support
- **Line Width Slider**: Adjustable from 1-20px with real-time preview
- **Gradient Controls**: Type, colors, and angle adjustments

### 📋 Layer Management
- View all layers in a dedicated scrollable panel
- Each layer shows its type and index
- Delete individual layers with confirmation
- Real-time layer count display
- Maintains drawing order

### 🔄 History & Controls
- **Undo (Ctrl+Z)**: Revert to previous state
- **Redo (Ctrl+Shift+Z / Ctrl+Y)**: Restore undone changes
- **Clear (Shift+Delete)**: Remove all objects from canvas
- **Download (Ctrl+S)**: Export canvas as PNG image
- Unlimited history depth

### 📱 Mobile Responsiveness

Fully responsive across all devices:

- **Desktop (>1024px)**: Three-column layout (Toolbar | Canvas | Layers)
- **Tablet (768-1024px)**: Stacked vertical layout with optimized spacing
- **Mobile (640-768px)**: Compact layout with touch-optimized controls
- **Small Mobile (<640px)**: Single column with minimum height optimization

**Touch Support:**
- Full touch drawing support (pen and eraser)
- Pinch-to-zoom prevention
- Touch-optimized button sizes (44px minimum)
- Larger touch targets on mobile devices
- Smooth touch tracking

### ♿ Accessibility Features

Comprehensive WCAG 2.1 AA compliant accessibility:

**Keyboard Navigation:**
- `P` - Switch to Pen tool
- `E` - Switch to Eraser tool
- `R` - Switch to Rectangle tool
- `C` - Switch to Circle tool
- `T` - Switch to Text tool
- `V` - Switch to Select tool
- `Ctrl+Z` - Undo
- `Ctrl+Shift+Z` or `Ctrl+Y` - Redo
- `Ctrl+S` - Download canvas
- `Shift+Delete` - Clear canvas
- `Tab` - Navigate through controls
- `Enter` - Activate buttons and submit text

**Screen Reader Support:**
- ARIA labels on all interactive elements
- ARIA roles for regions (toolbar, canvas, layers)
- ARIA live regions for status updates
- Semantic HTML structure
- Descriptive button labels with keyboard shortcuts

**Visual Accessibility:**
- High contrast mode support
- Focus visible indicators (2px outline)
- Reduced motion support (prefers-reduced-motion)
- Color contrast compliance
- Clear visual hierarchy

**Other Features:**
- Keyboard shortcut hints displayed on page
- Tooltip descriptions on hover
- Visual feedback for all interactions
- Error prevention and validation

## 📦 Usage

```tsx
import DrawingPanel from "@/components/DrawingPanel";

export default function MyPage() {
  return (
    <div>
      <DrawingPanel />
    </div>
  );
}
```

## 🏗️ Component Structure

```
DrawingPanel/
├── DrawingPanel.tsx           # Main component (1000+ lines)
├── DrawingPanel.module.scss   # Responsive styles
└── DrawingPanel.README.md     # This documentation
```

## 🎛️ Props

The component is self-contained and doesn't require any props. All configuration is done through the UI.

## 🎨 Canvas Specifications

- **Responsive Size**: Adapts to container
  - Desktop: 600px height minimum
  - Tablet: 500px height minimum
  - Mobile: 400px height minimum
  - Small Mobile: 300px height minimum
- **Default Background**: Auto (theme-aware white/dark)
- **Export Format**: PNG with transparency support
- **Touch Action**: Disabled to prevent scrolling during drawing

## 🔧 Tool Specifications

### Pen Tool
- **Line Cap**: Round
- **Line Join**: Round
- **Default Width**: 2px
- **Width Range**: 1-20px
- **Color**: Customizable via color picker or hex/rgba input
- **Touch Support**: Full multi-touch drawing

### Eraser Tool
- **Width**: 3x the current line width
- **Method**: Draws with background color (or white for transparent)
- **Line Cap**: Round
- **Touch Support**: Smooth touch erasing

### Shapes (Rectangle & Circle)
- **Line Width**: Follows global line width setting
- **Fill**: None (stroke only)
- **Color**: Follows global color setting
- **Drawing**: Click and drag to size

### Text
- **Font Family**: Arial
- **Font Size**: 20px
- **Color**: Follows global color setting
- **Positioning**: Click canvas to place, then enter text
- **Submit**: Press Enter or click "Add Text" button

### Image Upload
- **Accepted Formats**: All image/* types (PNG, JPG, GIF, SVG, etc.)
- **Max Size**: 50% of canvas width/height
- **Auto-scaling**: Maintains aspect ratio
- **Positioning**: Defaults to (50, 50)

## 🔐 State Management

The component uses React hooks for comprehensive state management:

- `useState` - Tool selection, colors, drawing state, background configuration
- `useRef` - Canvas and file input references
- `useEffect` - Canvas rendering, keyboard shortcuts, theme detection
- `useCallback` - Memoized event handlers for performance
- `useTheme` - once-ui theme detection for background switching

## 📚 History System

- Maintains array of all canvas states
- Supports unlimited undo/redo operations
- History updates on every object addition or deletion
- Efficient reference-based storage
- Step tracking for navigation

## 🌐 Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Canvas API**: Required
- **FileReader API**: Required for image upload
- **Touch Events**: Supported on mobile devices
- **Color Input**: Full support in modern browsers

## 📱 Responsive Breakpoints

```scss
1200px+  : Full desktop layout with 240px sidebars
1024-1200: Tablet landscape with 220px sidebars
768-1024 : Tablet portrait with stacked layout
640-768  : Large mobile with compact controls
480-640  : Standard mobile
<480px   : Small mobile with minimal spacing
```

## 🎨 Theme Integration

Uses once-ui design tokens:
- `--neutral-alpha-weak`: Background colors
- `--neutral-alpha-medium`: Borders and dividers
- `--neutral-alpha-strong`: Hover states
- `--accent`: Primary action color
- `--surface`: Layer items background
- `--radius-m`, `--radius-s`: Border radius
- `--spacing-*`: Consistent spacing scale
- `--shadow-m`: Elevation

Automatically adapts to light/dark theme via `useTheme()` hook.

## ⚡ Performance Considerations

- Canvas redraws optimized with `useCallback`
- Memoized event handlers prevent unnecessary re-renders
- Efficient history storage with object references
- Image scaling prevents memory bloat
- Touch events use passive listeners where possible
- Gradient rendering optimized with canvas native methods

## 🚀 Future Enhancements

Planned features:
- [ ] Object selection and manipulation (move, resize, rotate)
- [ ] Layer reordering with drag and drop
- [ ] More shape options (triangle, line, arrow, star)
- [ ] Multiple font options and sizes
- [ ] Fill color for shapes
- [ ] Copy/paste objects (Ctrl+C, Ctrl+V)
- [ ] Multi-select with Shift key
- [ ] Grid and snap-to-grid
- [ ] Export to multiple formats (SVG, JPEG, WEBP)
- [ ] Save/load canvas state (JSON)
- [ ] Real-time collaboration features
- [ ] Image filters and effects
- [ ] Custom brush shapes
- [ ] Layers visibility toggle
- [ ] Layer opacity control
- [ ] Blend modes

## 🔌 Dependencies

- React 19+
- @once-ui-system/core ^1.4.27
- TypeScript 5+
- Next.js 16+ (for theme context)

## 🎓 Accessibility Compliance

- **WCAG 2.1 Level AA** compliant
- **Keyboard navigable** throughout
- **Screen reader** friendly
- **Touch accessible** with minimum 44px targets
- **High contrast mode** support
- **Reduced motion** respects user preferences
- **Focus indicators** clearly visible
- **Semantic HTML** structure

## 📄 License

Part of the magic-portfolio project.

## 🐛 Known Issues

- None currently reported

## 💡 Tips for Users

1. **Quick Tools**: Use keyboard shortcuts (P, E, R, C, T) for faster tool switching
2. **Precision**: Hold Shift while drawing shapes for perfect squares/circles (coming soon)
3. **Undo Often**: Don't be afraid to experiment - unlimited undo is available
4. **Mobile Drawing**: Use a stylus for more precise control on touch devices
5. **Transparent BG**: Use transparent background for creating stickers or overlays
6. **Gradients**: Experiment with gradient angles for different effects
7. **Export Early**: Download your work periodically to avoid data loss
8. **Color Codes**: Use hex codes for precise color matching (#hexcode or rgba())

## 🤝 Contributing

To add new features or fix bugs:

1. Test across multiple screen sizes
2. Ensure accessibility features work
3. Add appropriate ARIA labels
4. Update documentation
5. Test keyboard navigation
6. Verify theme compatibility (light/dark)

---

**Made with ❤️ using once-ui and React**