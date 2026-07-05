---
title: radioButton.lua
depth: 3
tags: [ui, radio, input]
---

# radioButton.lua

A single-choice button from a group.

## What it is

radioButton.lua behaves like a checkbox, but within a parent container it allows only one option to be selected at a time.

## Constructor

```lua
ui.radioButton(x, y, w, text, align, callback_left, callback_right)
```

## Example

```lua
local ui = require("ui")
local group = ui.panel(2, 2, 20, 5, {})
group:add(ui.radioButton(1, 1, 10, "A"))
group:add(ui.radioButton(1, 2, 10, "B"))
ui:add(group)
```
