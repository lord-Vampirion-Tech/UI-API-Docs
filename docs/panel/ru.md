---
title: panel.lua
depth: 1
tags: [ui, panel, layout]
---

# panel.lua

Контейнер для группировки других элементов.

## Что это?

panel.lua хранит список дочерних элементов и рисует их внутри своей области.

## Конструктор

```lua
ui.panel(x, y, w, h, elements)
```

## Основные методы

### panel:add(element)
Добавляет элемент в контейнер.

### panel:getChecked()
Возвращает список всех дочерних элементов с флагом `checked == true`.

## Пример

```lua
local ui = require("ui")
local p = ui.panel(2, 2, 20, 6, {})
p:add(ui.label(1, 1, 10, "Inside"))
ui:add(p)
```
