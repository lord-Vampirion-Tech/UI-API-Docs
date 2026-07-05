---
title: clickBase.lua
depth: 1
tags: [ui, click, base]
---

# clickBase.lua

The base class for interactive elements.

## What it is

clickBase.lua adds click behavior for controls: callbacks, states such as `normal/pressed/disabled`, and the `enabled` flag.

## Main methods

### clickBase:init(x, y, w, h, callback_left, callback_right)
Configures the base parameters of a clickable element.

### clickBase:_stateUpdate()
Updates the element state based on `enabled` and `checked`.

## Example

```lua
local ui = require("ui")
local item = ui.button(2, 2, 10, 3, "Test")
item.enabled = false
```
