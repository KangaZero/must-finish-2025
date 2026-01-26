# 🎨 Drawing Panel - Quick Start Guide

Get up and running with the Drawing Panel in 2 minutes!

## 🚀 Starting the Application

```powershell
# Set the port and start the dev server
$env:PORT=3001; npm run dev
```

Then open your browser to: **http://localhost:3001/**

Scroll down to the **"Creative Drawing Panel"** section.

---

## 🎯 Basic Usage

### 1. Choose a Tool
Click a tool button or press the keyboard shortcut:
- **P** - Pen (freehand drawing)
- **E** - Eraser (remove elements)
- **R** - Rectangle (shapes)
- **C** - Circle (shapes)
- **T** - Text (add text)

### 2. Customize
- **Color**: Click the color picker or type a hex code
- **Line Width**: Drag the slider (1-20px)

### 3. Draw!
- **Desktop**: Click and drag on the canvas
- **Mobile/Tablet**: Touch and drag

### 4. Save Your Work
- Click **"Download"** button
- Or press **Ctrl+S**
- Saves as PNG with transparency

---

## 🖼️ Background Options

Click the background buttons in the toolbar:

### 1. Auto (Theme) - Default
- Automatically switches between white (light mode) and dark grey (dark mode)
- Best for general use

### 2. Dark Grey
- Inverse of Auto mode
- Good for light-colored drawings

### 3. Transparent
- No background (checkerboard pattern shown)
- Perfect for stickers, overlays, or logos
- Exports with transparency

### 4. Custom
Click "Custom" button to expand options:

**Solid Color:**
- Use color picker OR
- Type hex: `#ff5733`
- Type RGBA: `rgba(255, 87, 51, 0.5)`

**Gradient:**
- Choose Linear or Radial
- Pick two colors with color pickers
- Adjust angle (Linear only): 0-360°

---

## ⌨️ Keyboard Shortcuts

### Tools
| Key | Tool |
|-----|------|
| P | Pen |
| E | Eraser |
| R | Rectangle |
| C | Circle |
| T | Text |
| V | Select |

### Actions
| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Shift+Z | Redo |
| Ctrl+Y | Redo (alternative) |
| Ctrl+S | Download |
| Shift+Delete | Clear canvas |
| Tab | Navigate controls |
| Enter | Submit text/activate |

---

## 📱 Mobile Tips

1. **Portrait Mode**: Best for detailed work
2. **Landscape Mode**: Better for wider canvases
3. **Stylus**: Use a stylus for precision
4. **Zoom**: Use browser zoom for fine details
5. **Eraser**: Set to larger width on mobile

---

## 🎨 Quick Workflows

### Create a Logo
1. Set background to **Transparent**
2. Use **Pen** tool with black color
3. Draw your design
4. Add **Text** with company name
5. Download as PNG

### Make a Sketch
1. Keep default **Auto** background
2. Select **Pen** tool
3. Choose your color
4. Adjust line width (2-5px for sketches)
5. Draw freely
6. Use **Eraser** to refine
7. Download when done

### Design with Shapes
1. Choose **Dark Grey** background
2. Set bright color (#00ff00)
3. Use **Rectangle** and **Circle** tools
4. Layer multiple shapes
5. Add **Text** labels
6. Download final design

### Create an Overlay
1. Set to **Transparent** background
2. Use **Pen** with white color
3. Draw decorative elements
4. Download
5. Use in photo editors as overlay

---

## 🔄 Layer Management

- **View Layers**: Right panel shows all objects
- **Delete Layer**: Click trash icon on any layer
- **Layer Order**: Newer layers appear on top
- **Layer Count**: Shows total number of objects

---

## 💡 Pro Tips

1. **Use Keyboard Shortcuts**: Much faster than clicking
2. **Undo Often**: Don't be afraid to experiment
3. **Save Frequently**: Download at milestones
4. **Try Gradients**: Create interesting backgrounds
5. **RGBA Colors**: Use transparency in colors (e.g., `rgba(0,0,0,0.5)`)
6. **Line Width**: Start thin (2px), increase for emphasis
7. **Text Tool**: Click canvas first, then type
8. **Layers**: Delete unwanted layers to keep canvas clean

---

## 🐛 Troubleshooting

### Canvas not responding?
- Click on the canvas to focus it
- Refresh the page (your work will be lost)

### Touch not working?
- Ensure you're touching the canvas area
- Try disabling browser gestures
- Use a single finger for drawing

### Colors look wrong?
- Check if you're in light or dark mode
- Try "Auto" background for theme matching
- Verify color input format (hex/rgba)

### Download not working?
- Check browser pop-up blocker
- Try Ctrl+S instead
- Ensure canvas has content

---

## 🎓 Learning Path

### Beginner (First 5 minutes)
1. Try each tool (P, E, R, C, T)
2. Change colors
3. Adjust line width
4. Draw a simple shape
5. Download your first drawing

### Intermediate (Next 10 minutes)
1. Try all background options
2. Create a gradient background
3. Use keyboard shortcuts
4. Manage layers (add and delete)
5. Create a multi-layer drawing

### Advanced (After 15+ minutes)
1. Use RGBA for transparent colors
2. Combine shapes and freehand
3. Create complex gradients
4. Master keyboard shortcuts
5. Build a complete design

---

## 📊 Canvas Specs

- **Resolution**: Matches container size
- **Background**: Customizable (5 options)
- **Export Format**: PNG
- **Transparency**: Supported
- **Max Layers**: Unlimited
- **History**: Unlimited undo/redo

---

## 🆘 Need Help?

- Read the full documentation: `DrawingPanel.README.md`
- Check feature list: `DRAWING_PANEL_FEATURES.md`
- All keyboard shortcuts are shown at the bottom of the panel

---

## ✅ Quick Checklist

Before you start:
- [ ] Dev server is running
- [ ] Browser is open to localhost:3001
- [ ] Scrolled to Drawing Panel section
- [ ] Tool selected (try Pen first)
- [ ] Color chosen
- [ ] Ready to create!

---

**Happy Drawing! 🎨**

Create amazing digital art with professional tools, all in your browser!