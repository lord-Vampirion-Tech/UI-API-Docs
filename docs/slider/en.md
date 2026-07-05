---
title: slider.lua
depth: 1
tags: [ui, slider, input]
---

# slider.lua

A value slider.

## What it is

slider.lua draws a linear indicator with a marker and allows changing the value programmatically or through mouse scrolling.

## Constructor

```lua
ui.slider(x, y, w, leng, align)
```

## Main methods

### slider:setValue(value)
Sets the current value within range.

### slider:getPercent()
Returns the value as a percentage of the range.

### slider:setPercent(value)
Sets the value from a percentage between `0` and `1`.

## Example

```lua
local ui = require("ui")
local s = ui.slider(2, 2, 10, 100, "h")
s:setPercent(0.5)
ui:add(s)
```
