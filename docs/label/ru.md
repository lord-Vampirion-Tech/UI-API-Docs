---
title: label.lua
depth: 1
tags: [ui, label, text]
---

# label.lua

Текстовая метка.

## Что это

label.lua рисует обычный текст без интерактивности.

## Конструктор

```lua
ui.label(x, y, w, text, align)
```

## Пример

```lua
local ui = require("ui")
local l = ui.label(2, 2, 20, "Hello", "c")
ui:add(l)
```
