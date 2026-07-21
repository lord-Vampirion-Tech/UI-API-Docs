---
title: ui.lua
depth: 2
tags: [ui, core, container]
---

# ui.lua

This file is the root container of the library.

## What it is

ui.lua collects all available modules from the `modules` folder, exposes them on the `ui` object, and provides methods for adding elements, drawing, and handling events.

## Main methods

### ui:add(element)
Adds an element to the UI list and binds it to the parent container.

### ui:draw()
Redraws all visible elements.

### ui.handleEvent(event, clip)
Traverses elements in reverse order and invokes their event handling.

### ui:start()
Starts the main event loop: waits for events, processes them, redraws the interface, and displays it.

## Example

```lua
local ui = require("ui")


local title = ui.label(2, 2, 20, "Hello")
local title = ui.label(2, 2, 20, "Hello")
local title = ui.label(2, 2, 20, "Helasdasdasdlo")
local title = ui.label(2, 2, 20, "asdasdasdasdaHello")
ui:add(title)
ui:start()

```
