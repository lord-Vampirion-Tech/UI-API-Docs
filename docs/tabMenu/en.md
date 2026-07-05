---
title: tabMenu.lua
depth: 1
tags: [ui, tabs, menu]
---

# tabMenu.lua

A tab menu.

## What it is

tabMenu.lua creates a set of tabs, where each tab contains its own panel with content.

## Constructor

```lua
ui.tabMenu(x, y, w, h, tabContent)
```

## Main methods

### tabMenu:add(menuID, content)
Adds a new element inside the selected tab.

### tabMenu:onEvent(event)
Handles clicks on tab headers.

## Example

```lua
local ui = require("ui")
local tabs = {
  {name = "One", content = {}},
  {name = "Two", content = {}}
}
local t = ui.tabMenu(2, 2, 30, 10, tabs)
ui:add(t)
```
