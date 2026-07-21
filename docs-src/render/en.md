---
title: render.lua
depth: 0
tags: [render, graphics, buffer]
---

# render.lua

This file is responsible for low-level drawing to the terminal.

## What it is

render.lua stores an internal screen buffer and provides methods for drawing text, rectangles, outlines, and pixels.

## Main methods

### render:init(x, y, w, h)
Creates a buffer of the requested size.

### render:clear(bg)
Clears the buffer and fills the background with `bg`.

### render:pixel(x, y, ch, fg, bg, clip)
Draws a single character at the specified coordinates.

### render:blit(x, y, text, fg, bg, clip, mode)
Draws a text string with colors. The `mode` argument can be `"h"` for horizontal drawing.

### render:rect(x, y, w, h, bg, clip)
Draws a rectangle.

### render:rectOutline(x, y, w, h, fg, bg, clip)
Draws a border around an area.

### render:present()
Flushes the buffer contents to the terminal.

## Example

```lua
local render = require("render")
local r = render(1, 1, 20, 10)

r:clear("f")
r:rect(2, 2, 5, 3, "7")
r:blit(3, 3, "Hello", "0", "7")
r:present()
```
