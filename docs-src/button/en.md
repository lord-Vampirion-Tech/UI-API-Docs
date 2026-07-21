---
title: button
depth: 2
tags: [ui, button, input]
---

# button.lua

A button with simple states: normal, pressed, and disabled.

## What it is

button.lua creates an interactive button that reacts to `mouse_click` and `mouse_up`.

## Constructor

```lua
ui.button(x, y, w, h, text, align, callback_left, callback_right)
```

## Main properties

- `text` — button label;
- `align` — text alignment (`"l"`, `"c"`, `"r"`);
- `callback_left` — function for the left mouse button;
- `callback_right` — function for the right mouse button.

## Example

```lua
local ui = require("ui")
local b = ui.button(2, 2, 10, 3, "OK", "c", function()
  print("Pressed")
end)
ui:add(b)
```
