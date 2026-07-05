---
title: label.lua
depth: 1
tags: [ui, label, text]
---

# label.lua

A text label.

## What it is

label.lua draws simple text without interactivity.

## Constructor

```lua
ui.label(x, y, w, text, align)
```

## Example

```lua
local ui = require("ui")
local l = ui.label(2, 2, 20, "Hello", "c")
ui:add(l)
```
