---
title: кнопка
depth: 2
tags: [ui, кнопка, входы]
---

# button.lua

Кнопка с простым состоянием: нормальная, нажатая и отключённая.

## Что это

button.lua создаёт интерактивную кнопку, которая реагирует на `mouse_click` и `mouse_up`.

## Конструктор

```lua
ui.button(x, y, w, h, text, align, callback_left, callback_right)
```

## Основные свойства

- `text` — надпись на кнопке;
- `align` — выравнивание текста (`"l"`, `"c"`, `"r"`);
- `callback_left` — функция для левой кнопки мыши;
- `callback_right` — функция для правой кнопки мыши.

## Пример

```lua
local ui = require("ui")
local b = ui.button(2, 2, 10, 3, "OK", "c", function()
  print("Pressed")
end)
ui:add(b)
```
