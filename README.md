# Input Range
Este input es un solo elemento.

Sus atributos únicos y obligatorios son:

```
title="Título de mi Input"
min="20" // Valor mínimo
max="399" // Valor máximo
step="1" // Especifica la granularidad que debe cumplir el valor

```

### Atributos condicionales
```
label="New Label" // Label
type="orphan" // Tipo de range-slider
```
## Uso 
### Doble
```HTML
<div 
    class="range__slider"
    title="Salary Range"
    min="20"
    max="399"
    step="1"
></div>
```
### Range Orphan
```HTML
<div 
    class="range__slider"
    title="Salary Range"
    min="20"
    max="399"
    step="1"
    label="New Label"
    type="orphan"
></div>
```
