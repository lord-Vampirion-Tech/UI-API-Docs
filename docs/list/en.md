---
title: list.lua
depth: 2
tags: [ui, list, collection]
---

# list.lua

A scrollable list.

## What it is

list.lua displays a set of elements and supports scrolling through `mouse_scroll` events.

## Constructor

```lua
ui.list(x, y, w, h, elements)
```

## Main methods

### list:onEvent(event)
Handles list scrolling.

## Example

```lua
local ui = require("ui")
local items = {"One", "Two", "Three"}
local l = ui.list(2, 2, 15, 5, items)
ui:add(l)
```
