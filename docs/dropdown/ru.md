---
title: dropdown.lua
depth: 2
tags: [ui, dropdown, menu]
---

# dropdown.lua

Выпадающий список с раскрывающимся содержимым.

## Что это

dropdown.lua создаёт элемент, который может раскрывать список вариантов.

## Конструктор

```lua
ui.dropdown(x, y, w, h, text, elements)
```

## Основные свойства

- `open` — состояние раскрытия;
- `text` — заголовок элемента;
- `_list` — внутренний список вариантов.

## Пример

```lua
local ui = require("ui")
local d = ui.dropdown(2, 2, 12, 4, "Items", {"One", "Two"})
ui:add(d)
```
