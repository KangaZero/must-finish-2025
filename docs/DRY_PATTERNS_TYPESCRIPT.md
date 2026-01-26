# DRY Patterns in TypeScript: Discriminated Unions

A comprehensive guide to avoiding repetition when defining type-safe data structures.

## The Problem: Repetitive Type Definitions

### ❌ Bad (Not DRY)
```typescript
interface DrawingObject {
  id: string;
  type: "line" | "rectangle" | "circle" | "text" | "image";
  data: any; // No type safety!
  color?: string;
  lineWidth?: number;
}
```

This approach loses type safety because `data` is `any`.

---

## Solution 1: Discriminated Unions ✅ (BEST - Used in DrawingPanel)

### Pattern
```typescript
// Define specific data types
interface LineData {
  points: { x: number; y: number }[];
}

interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CircleData {
  x: number;
  y: number;
  radius: number;
}

// Create discriminated union
type DrawingObject =
  | {
      id: string;
      type: "line";
      data: LineData;
      color: string;
      lineWidth: number;
    }
  | {
      id: string;
      type: "rectangle";
      data: RectangleData;
      color: string;
      lineWidth: number;
    }
  | {
      id: string;
      type: "circle";
      data: CircleData;
      color: string;
      lineWidth: number;
    };
```

### Benefits
- ✅ **Type Safety**: TypeScript knows exactly which `data` type for each `type`
- ✅ **Exhaustive Checking**: Switch statements are checked for completeness
- ✅ **IntelliSense**: Auto-completion knows available properties
- ✅ **Refactor Safe**: Renaming properties updates all usages

### Usage Example
```typescript
const drawObject = (ctx: CanvasRenderingContext2D, obj: DrawingObject) => {
  switch (obj.type) {
    case "line":
      // TypeScript knows obj.data is LineData
      obj.data.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      break;
    
    case "rectangle":
      // TypeScript knows obj.data is RectangleData
      ctx.strokeRect(obj.data.x, obj.data.y, obj.data.width, obj.data.height);
      break;
    
    case "circle":
      // TypeScript knows obj.data is CircleData
      ctx.arc(obj.data.x, obj.data.y, obj.data.radius, 0, Math.PI * 2);
      break;
  }
};
```

---

## Solution 2: Helper Type with Mapped Types

### Pattern
```typescript
// Define data types
interface DataTypes {
  line: LineData;
  rectangle: RectangleData;
  circle: CircleData;
  text: TextData;
  image: ImageData;
}

// Base shape
interface BaseDrawingObject {
  id: string;
  color?: string;
  lineWidth?: number;
}

// Generate union using mapped types
type DrawingObject = {
  [K in keyof DataTypes]: BaseDrawingObject & {
    type: K;
    data: DataTypes[K];
  };
}[keyof DataTypes];
```

### Benefits
- ✅ Single source of truth for data types
- ✅ Less repetition
- ✅ Easy to add new types
- ⚠️ More complex syntax

### Adding a New Type
```typescript
// Just add to DataTypes
interface DataTypes {
  line: LineData;
  rectangle: RectangleData;
  circle: CircleData;
  text: TextData;
  image: ImageData;
  triangle: TriangleData; // ← New type automatically included!
}
```

---

## Solution 3: Generic Base Type

### Pattern
```typescript
// Generic base
interface DrawingObject<T extends string, D> {
  id: string;
  type: T;
  data: D;
  color?: string;
  lineWidth?: number;
}

// Specific types
type LineObject = DrawingObject<"line", LineData>;
type RectangleObject = DrawingObject<"rectangle", RectangleData>;
type CircleObject = DrawingObject<"circle", CircleData>;

// Union
type AnyDrawingObject = LineObject | RectangleObject | CircleObject;
```

### Benefits
- ✅ DRY base properties
- ✅ Reusable generic
- ⚠️ More verbose when creating objects

---

## Solution 4: Factory Function Pattern

### Pattern
```typescript
// Type-safe factory
const createDrawingObject = <T extends DrawingObject["type"]>(
  type: T,
  data: Extract<DrawingObject, { type: T }>["data"],
  color: string,
  lineWidth: number
): Extract<DrawingObject, { type: T }> => {
  return {
    id: Date.now().toString(),
    type,
    data,
    color,
    lineWidth,
  } as Extract<DrawingObject, { type: T }>;
};

// Usage
const line = createDrawingObject("line", { points: [{ x: 0, y: 0 }] }, "#000", 2);
const rect = createDrawingObject("rectangle", { x: 0, y: 0, width: 100, height: 50 }, "#000", 2);
```

### Benefits
- ✅ Centralized object creation
- ✅ Type-safe without repetition
- ✅ Easy to add common logic (ID generation, validation)

---

## Solution 5: Conditional Types for Shared Properties

### Pattern
```typescript
// Define which types have which properties
type HasColor = "line" | "rectangle" | "circle" | "text";
type HasLineWidth = "line" | "rectangle" | "circle";

type DrawingObject = {
  id: string;
  type: "line" | "rectangle" | "circle" | "text" | "image";
  data: LineData | RectangleData | CircleData | TextData | ImageData;
} & (
  | { type: HasColor; color: string }
  | { type: Exclude<DrawingObject["type"], HasColor>; color?: never }
) & (
  | { type: HasLineWidth; lineWidth: number }
  | { type: Exclude<DrawingObject["type"], HasLineWidth>; lineWidth?: never }
);
```

### Benefits
- ✅ Very precise about which types have which properties
- ⚠️ Complex and hard to maintain
- ⚠️ Not recommended for most cases

---

## Comparison Table

| Pattern | Type Safety | Readability | Maintainability | Best For |
|---------|-------------|-------------|-----------------|----------|
| **Discriminated Union** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **Most cases** |
| **Mapped Types** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Many similar types |
| **Generic Base** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Reusable patterns |
| **Factory Function** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Complex creation logic |
| **Conditional Types** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | Advanced scenarios |

---

## Real-World Example: DrawingPanel

### Before (Not DRY)
```typescript
// Creating objects everywhere with repetition
const line = {
  id: Date.now().toString(),
  type: "line" as const,
  data: currentPath,
  color: currentColor,
  lineWidth: lineWidth,
};

const rect = {
  id: Date.now().toString(),
  type: "rectangle" as const,
  data: { x: 0, y: 0, width: 100, height: 50 },
  color: currentColor,
  lineWidth: lineWidth,
};
```

### After (DRY with Discriminated Union)
```typescript
// Type definition (once)
type DrawingObject =
  | { id: string; type: "line"; data: LineData; color: string; lineWidth: number }
  | { id: string; type: "rectangle"; data: RectangleData; color: string; lineWidth: number };

// Usage (type-safe!)
const line: DrawingObject = {
  id: Date.now().toString(),
  type: "line",
  data: { points: currentPath },
  color: currentColor,
  lineWidth: lineWidth,
};

const rect: DrawingObject = {
  id: Date.now().toString(),
  type: "rectangle",
  data: { x: 0, y: 0, width: 100, height: 50 },
  color: currentColor,
  lineWidth: lineWidth,
};
```

---

## Advanced: Type Guards

### Pattern
```typescript
// Type guard functions
const isLineObject = (obj: DrawingObject): obj is Extract<DrawingObject, { type: "line" }> => {
  return obj.type === "line";
};

const isRectangleObject = (obj: DrawingObject): obj is Extract<DrawingObject, { type: "rectangle" }> => {
  return obj.type === "rectangle";
};

// Usage
if (isLineObject(obj)) {
  // TypeScript knows obj.data.points exists
  console.log(obj.data.points.length);
}
```

---

## Best Practices

### ✅ Do
1. **Use Discriminated Unions** for most cases
2. **Keep data types separate** from the union definition
3. **Use `switch` statements** for exhaustive checking
4. **Extract common properties** to avoid repetition
5. **Add `never` type** for exhaustive checks:
   ```typescript
   default:
     const _exhaustive: never = obj;
     throw new Error(`Unknown type: ${_exhaustive}`);
   ```

### ❌ Don't
1. **Don't use `any`** - defeats the purpose of TypeScript
2. **Don't repeat property definitions** - use inheritance or intersection
3. **Don't skip type guards** when needed
4. **Don't make types too complex** - prefer readability

---

## TypeScript Pro Tips

### Exhaustive Type Checking
```typescript
const drawObject = (obj: DrawingObject) => {
  switch (obj.type) {
    case "line":
      // handle line
      break;
    case "rectangle":
      // handle rectangle
      break;
    case "circle":
      // handle circle
      break;
    default:
      // This will error if we forgot a case!
      const _exhaustive: never = obj;
      throw new Error(`Unhandled type: ${_exhaustive}`);
  }
};
```

### Extract Specific Type
```typescript
type LineObject = Extract<DrawingObject, { type: "line" }>;
type ShapeObjects = Extract<DrawingObject, { type: "rectangle" | "circle" }>;
```

### Exclude Specific Type
```typescript
type NonImageObjects = Exclude<DrawingObject, { type: "image" }>;
```

### Get All Type Values
```typescript
type ObjectTypes = DrawingObject["type"]; // "line" | "rectangle" | "circle" | ...
```

---

## Migration Guide

### From Any to Discriminated Union

**Step 1: Define Data Types**
```typescript
interface LineData { points: Point[] }
interface RectangleData { x: number; y: number; width: number; height: number }
```

**Step 2: Create Union**
```typescript
type DrawingObject = 
  | { type: "line"; data: LineData }
  | { type: "rectangle"; data: RectangleData };
```

**Step 3: Update Functions**
```typescript
// Before
const draw = (obj: { type: string; data: any }) => { ... }

// After
const draw = (obj: DrawingObject) => {
  switch (obj.type) {
    case "line": return drawLine(obj.data);
    case "rectangle": return drawRect(obj.data);
  }
}
```

**Step 4: Fix Errors**
- TypeScript will show exactly where types don't match
- Fix each error systematically
- Test thoroughly

---

## Conclusion

**For the DrawingPanel component, we chose Discriminated Unions because:**

1. ✅ **Excellent type safety** - TypeScript knows exact shape
2. ✅ **Great IntelliSense** - Auto-completion works perfectly
3. ✅ **Easy to read** - Clear structure, self-documenting
4. ✅ **Exhaustive checking** - Can't forget cases
5. ✅ **Refactor-friendly** - Changes propagate automatically

**The pattern scales well and makes the codebase more maintainable!**

---

## Resources

- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)
- [TypeScript Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Effective TypeScript](https://effectivetypescript.com/)

---

**Remember: The best DRY pattern is the one your team understands and maintains easily!**