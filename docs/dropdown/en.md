---
title: dropdown.lua
depth: 2
tags: [ui, dropdown, menu]
---

# dropdown.lua

A dropdown control with expandable content.

## What it is

dropdown.lua creates an element that can expand to show a list of options.

## Constructor

```lua
ui.dropdown(x, y, w, h, text, elements)
```

## Main properties

- `open` — expanded state;
- `text` — element title;
- `_list` — internal list of options.

## Example

```lua
local ui = require("ui")
local d = ui.dropdown(2, 2, 12, 4, "Items", {"One", "Two"})
ui:add(d)
```
