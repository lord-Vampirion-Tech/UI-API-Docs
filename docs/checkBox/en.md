---
title: checkBox.lua
depth: 2
tags: [ui, checkbox, input]
---

# checkBox.lua

A checkbox with a toggleable state.

## What it is

checkBox.lua creates an element that can be turned on or off.

## Constructor

```lua
ui.checkBox(x, y, w, text, align, callback_left, callback_right)
```

## Main properties

- `checked` — current state;
- `text` — label next to the checkbox;
- `align` — text alignment.

## Example

```lua
local ui = require("ui")
local box = ui.checkBox(2, 2, 20, "Enable", "l")
ui:add(box)
```
