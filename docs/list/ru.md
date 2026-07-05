---
title: list.lua
depth: 2
tags: [ui, list, collection]
---

# list.lua

Список с прокруткой.

## Что это

list.lua отображает набор элементов и поддерживает прокрутку через события `mouse_scroll`.

## Конструктор

```lua
ui.list(x, y, w, h, elements)
```

## Основные методы

### list:onEvent(event)
Обрабатывает прокрутку списка.

## Пример

```lua
local ui = require("ui")
local items = {"One", "Two", "Three"}
local l = ui.list(2, 2, 15, 5, items)
ui:add(l)
```
