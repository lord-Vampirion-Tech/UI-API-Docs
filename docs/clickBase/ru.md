---
title: clickBase.lua
depth: 1
tags: [ui, click, base]
---

# clickBase.lua

Базовый класс для интерактивных элементов.

## Что это

clickBase.lua добавляет поведение кликабельных контролов: callbacks, состояние `normal/pressed/disabled` и флаги `enabled`.

## Основные методы

### clickBase:init(x, y, w, h, callback_left, callback_right)
Настраивает базовые параметры кликабельного элемента.

### clickBase:_stateUpdate()
Обновляет состояние элемента в зависимости от `enabled` и `checked`.

## Пример

```lua
local ui = require("ui")
local item = ui.button(2, 2, 10, 3, "Test")
item.enabled = false
```
