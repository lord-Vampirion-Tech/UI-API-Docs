---
title: Overview
depth: 0
tags: [overview, ui, library]
---

# UI library overview

This is a small library for building user interfaces in CraftOS-PC. It is built around a render buffer, a shared UI container, and a set of components such as buttons, labels, checkboxes, panels, lists, sliders, and tabs.

## Core idea

The library follows an event-driven model:

1. Create a UI container instance.
2. Add elements to it.
3. The UI handles mouse events and redraws the interface.

## Main parts

- render — a drawing buffer that stores characters, text colors, and background colors.
- utils — helper functions for class creation, text alignment, coordinates, and clipping.
- ui — the root application container that stores elements and runs the event loop.
- modules — ready-made UI components.

## Quick start

```lua
local ui = require("ui")

local title = ui.label(2, 2, 20, "Hello", "c")
local button = ui.button(2, 4, 12, 3, "OK", "c", function()
  print("Clicked")
end)

ui:add(title)
ui:add(button)
ui:start()
```

## What you can build

- simple windows and panels;
- buttons and toggle controls;
- lists and dropdown menus;
- tabs and sliders;
- element positioning, visibility, and event handling.
