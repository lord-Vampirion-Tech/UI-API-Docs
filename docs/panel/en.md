---
title: panel.lua
depth: 1
tags: [ui, panel, layout]
---

# panel.lua

A container for grouping other elements.

## What it is

panel.lua stores a list of child elements and draws them inside its own area.

## Constructor

```lua
ui.panel(x, y, w, h, elements)
```

## Main methods

### panel:add(element)
Adds an element to the container.

### panel:getChecked()
Returns all child elements where `checked == true`.

## Example

```lua
local ui = require("ui")
local p = ui.panel(2, 2, 20, 6, {})
p:add(ui.label(1, 1, 10, "Inside"))
ui:add(p)
```
