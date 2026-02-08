# Icons (SVG Sprite)

## Usage

```tsx
import { Icon } from '@/components/Icon'

<Icon name="icon-arrow" size={24} />
<Icon name="icon-chevron-down" className="nav__chevron" />
```

## Adding icons

1. Add `.svg` file to `src/icons/` (e.g. `heart.svg`)
2. Run `pnpm build:icons`
3. Use as `<Icon name="icon-heart" />`

Icons run through `predev` and `prebuild` automatically.
