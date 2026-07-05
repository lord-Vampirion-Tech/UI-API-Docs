---
title: radioButton.lua
depth: 3
tags: [ui, radio, input]
---

# radioButton.lua

Кнопка выбора из группы.

## Что это

radioButton.lua похож на чекбокс, но внутри родительского контейнера позволяет выбрать только один вариант.

## Конструктор

```lua
ui.radioButton(x, y, w, text, align, callback_left, callback_right)
```

## Пример

```lua
local ui = require("ui")
local group = ui.panel(2, 2, 20, 5, {})
group:add(ui.radioButton(1, 1, 10, "A"))
group:add(ui.radioButton(1, 2, 10, "B"))
ui:add(group)
```
