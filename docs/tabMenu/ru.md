---
title: tabMenu.lua
depth: 1
tags: [ui, tabs, menu]
---

# tabMenu.lua

Меню вкладок.

## Что это

tabMenu.lua создаёт набор вкладок, каждая из которых содержит собственную панель с содержимым.

## Конструктор

```lua
ui.tabMenu(x, y, w, h, tabContent)
```

## Основные методы

### tabMenu:add(menuID, content)
Добавляет новый элемент внутрь выбранной вкладки.

### tabMenu:onEvent(event)
Обрабатывает клики по заголовкам вкладок.

## Пример

```lua
local ui = require("ui")
local tabs = {
  {name = "One", content = {}},
  {name = "Two", content = {}}
}
local t = ui.tabMenu(2, 2, 30, 10, tabs)
ui:add(t)
```
