---
title: utils.lua
depth: 0
tags: [utils, helpers, library]
---

# utils.lua

This file contains shared helper functions for the whole library.

## What it is

utils.lua implements the core mechanics for class creation, text alignment, global coordinate calculation, clipping, and area intersections.

## Main functions

### utils.createClass(className, parent)
Creates a class with inheritance support and calls `init` automatically when an instance is created.

### utils.align(text, width, mode)
Truncates or aligns text to a given width. Supports `"l"`, `"c"`, and `"r"` modes.

### utils.getGlobalPos(self, gx, gy)
Returns the absolute position of an element, taking parent containers into account.

### utils.getClip(self)
Returns the clip area of an element.

### utils.inClip(x, y, clip)
Checks whether a point lies inside a clip area.

### utils.intersectClip(a, b)
Returns the intersection of two clip areas.

## Example

```lua
local utils = require("utils")
local text = utils.align("Hello", 10, "c")
print(text)
```
