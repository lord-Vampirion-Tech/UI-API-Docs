---
title: base.lua
depth: 0
tags: [base, core, ui]
---

# base.lua

The base class for all visual elements.

## What it is

base.lua defines shared properties such as position, size, visibility, text color, and background color, as well as the base event-handling logic.

## Main methods

### base:init(x, y, w, h)
Initializes the base fields of an element.

### base:draw(render, gx, gy, clip)
The base drawing method. In the current implementation it is empty and intended to be overridden.

### base:hitTest(x, y, clip)
Checks whether a point lies inside the element.

### base:handleEvent(event, clip)
Checks whether the mouse is inside the area and calls `onEvent`.

### base:onEvent(event)
The base event handler. By default it returns `true`.

## Example

```lua
local ui = require("ui")
local item = ui.base(1, 1, 10, 3)
print(item.x, item.y)
```
