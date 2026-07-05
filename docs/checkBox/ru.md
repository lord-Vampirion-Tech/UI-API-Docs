---
title: checkBox.lua
depth: 2
tags: [ui, checkbox, input]
---

# checkBox.lua

Чекбокс с переключаемым состоянием.

## Что это

checkBox.lua создаёт элемент, который может быть включён или выключен.

## Конструктор

```lua
ui.checkBox(x, y, w, text, align, callback_left, callback_right)
```

## Основные свойства

- `checked` — текущее состояние;
- `text` — подпись рядом с чекбоксом;
- `align` — выравнивание текста.

## Пример

```lua
local ui = require("ui")
local box = ui.checkBox(2, 2, 20, "Enable", "l")
ui:add(box)
```
