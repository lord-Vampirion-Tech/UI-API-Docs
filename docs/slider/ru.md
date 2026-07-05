---
title: slider.lua
depth: 1
tags: [ui, slider, input]
---

# slider.lua

Ползунок для выбора значения.

## Что это

slider.lua рисует линейный индикатор с точкой и позволяет менять значение программно или через прокрутку мыши.

## Конструктор

```lua
ui.slider(x, y, w, leng, align)
```

## Основные методы

### slider:setValue(value)
Устанавливает текущее значение в диапазон.

### slider:getPercent()
Возвращает процент от диапазона.

### slider:setPercent(value)
Устанавливает значение по проценту от `0` до `1`.

## Пример

```lua
local ui = require("ui")
local s = ui.slider(2, 2, 10, 100, "h")
s:setPercent(0.5)
ui:add(s)
```
