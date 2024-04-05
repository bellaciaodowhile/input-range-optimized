console.log('Optimized')

const rangerSliders = [...document.querySelectorAll('.range__slider')];
rangerSliders.map(($rangeSlider, $index) => {


    // Variables
    const $title = $rangeSlider.attributes['title'].textContent;
    const $titleCamelCase = camelCase($title)
    const $min = $rangeSlider.attributes['min'].textContent;
    const $max = $rangeSlider.attributes['max'].textContent;
    const $step = $rangeSlider.attributes['step'].textContent;

    // Elements
    const $titleElement = document.createElement('div');
    const $iconEye = document.createElement('i');
    const $inputs = document.createElement('div');
    const $inputForm = document.createElement('div');
    const $contentInputForm =
        `<label class="txt-field icon-right">
        <span class="input-normal">Min.</span>
        <input type="number" id="" name="" min="${$min}" max="${$max}"
            oninput="javascript: if (this.value.length > 5) this.value = this.value.slice(0, 5);">
        <i class="material-icons euro">euro</i>
    </label>`;
    const $mainRange = document.createElement('div');
    const $contentMainRange =
        `<input type="range" id="left" min="${ $min }" max="${ $max }" step="${ $step }" value="${ $min }">
    <output></output>
    <input type="range" id="right" min="${ $min }" max="${ $max }" step="${ $step }" value="${ $max }">
    <output></output>
    <div class='range-slider__progress'></div>`;



    // Assignament
    $titleElement.classList.add('filters-title', 'space-between');
    $titleElement.textContent = $title;
    $iconEye.classList.add('material-icons-outlined', 'salary-range');
    $iconEye.setAttribute('aria-label-top', 'Hide Salary Range');
    $iconEye.textContent = 'visibility';
    $inputs.classList.add('insert-data-range');
    $inputForm.classList.add('input-form');
    $inputForm.innerHTML = $contentInputForm;
    $mainRange.classList.add('range-slider', 'flat');
    $mainRange.setAttribute('data-ticks-position', 'top');
    $mainRange.setAttribute('style', `--min:${ $min }; --max:${ $max }; --value-a:${ $min }; --value-b:${ $max }; --suffix:"€"; --text-value-a:"${ $min }"; --text-value-b:"${ $max }";`);
    $mainRange.innerHTML = $contentMainRange;

    // Render
    $titleElement.appendChild($iconEye);
    $inputs.appendChild($inputForm.cloneNode(true));
    $inputs.appendChild($inputForm.cloneNode(true));
    $rangeSlider.appendChild($titleElement);
    $rangeSlider.appendChild($inputs);
    $rangeSlider.appendChild($mainRange);

    // Global
    let $minInput = $inputs.children[0].querySelector('.input-normal');
    let $maxInput = $inputs.children[1].querySelector('.input-normal');

    // Functions
    function camelCase($text) {
        let $keywords = $text.split(' ');
        let $camel = $keywords[0].toLowerCase();
        for (let i = 1; i < $keywords.length; i++) {
            $camel += $keywords[i].charAt(0).toUpperCase() + $keywords[i].slice(1).toLowerCase();
        }
        return $camel;
    }

    function inputFocusBlur() {
        let inputsRangeSlider = [...$inputs.querySelectorAll('.input-form input')];
        inputsRangeSlider.map(el => {
            let span = el.parentElement.children[0];
            let label = el.parentElement;
            let icon = el.parentElement.querySelector('i.euro');

            el.addEventListener('focus', (e) => {
                span.style.top = '-15px';
                span.style.color = 'var(--color-primary-light)';
                label.style.borderColor = 'var(--color-primary-light)';
                icon.style.color = 'var(--color-text)';
            });
            el.addEventListener('blur', (e) => {
                if (el.value.trim().length == 0) {
                    span.style.top = '-15px';
                    span.style.color = 'var(--color-grey-light-5)';
                    label.style.borderColor = 'var(--color-grey-light-7)';
                    icon.style.color = 'initial';
                } else {
                    span.style.top = '-15px';
                    span.style.color = 'var(--color-primary-light)';
                    label.style.borderColor = 'var(--color-primary-light)';
                    icon.style.color = 'var(--color-text)';
                }
            });
        });
    }

    function renameLabelInput() {

        $minInput.textContent = 'Min.';
        $maxInput.textContent = 'Max.';
        $minInput.nextElementSibling.classList.add('min');
        $maxInput.nextElementSibling.classList.add('max');
        for (let $index = 0; $index < $inputs.childNodes.length; $index++) {
            const $element = $inputs.children[$index];
            $element.setAttribute('id', $titleCamelCase + $index);
            $element.setAttribute('name', $titleCamelCase + $index);
        }

    }

    function calculateInput($value) {
        let $calculate = $inputs.children[$value == 'a' ? 0 : 1].querySelector('input');
        $calculate.onkeyup = (e) => {
            $mainRange.querySelector(`.range-slider input#${ $value == 'a' ? 'left' : 'right' }`).value = e.currentTarget.value;
            $mainRange.style.setProperty(`--value-${ $value == 'a' ? 'a' : 'b' }`, e.currentTarget.value);
            $mainRange.style.setProperty(`--text-value-${ $value == 'a' ? 'a' : 'b' }`, JSON.stringify(e.currentTarget.value));
            if (e.currentTarget.value.length == 0) {
                $mainRange.querySelector(`.range-slider input#${ $value == 'a' ? 'left' : 'right' }`).value = $value == 'a' ? $min : $max;
                $mainRange.style.setProperty(`--value-${ $value == 'a' ? 'a' : 'b' }`, $value == 'a' ? $min : $max);
                $mainRange.style.setProperty(`--text-value-${ $value == 'a' ? 'a' : 'b' }`, JSON.stringify($value == 'a' ? $min : $max));
            }
        }
    }

    function calculateInputs() {
        calculateInput('a');
        calculateInput('b');
    }

    function calculateRangeOnly($el) {
        let $parent = $el.parentNode;
        let $__parent = $el.parentNode.parentNode;

        let $valueA = parseFloat($parent.style.getPropertyValue('--value-a'));
        let $valueB = parseFloat($parent.style.getPropertyValue('--value-b'));
        let $rangeA = $parent.querySelector('input[type="range"]:nth-of-type(1)');
        let $rangeB = $parent.querySelector('input[type="range"]:nth-of-type(2)');

        if ($el === $rangeA) {
            $parent.style.setProperty('--value-a', $el.value);
            $parent.style.setProperty('--text-value-a', JSON.stringify($el.value));
            $parent.querySelector('#left').value = $el.value;
            $__parent.querySelector('.min').value = $el.value;
        } else if ($el === $rangeB) {
            $parent.style.setProperty('--value-b', $el.value);
            $parent.style.setProperty('--text-value-b', JSON.stringify($el.value));
            $parent.querySelector('#right').value = $el.value;
            $__parent.querySelector('.max').value = $el.value;
        }

        // Check and adjust values ​​if necessary
        if ($valueA > $valueB) {
            $rangeA.value = $valueB;
            $parent.style.setProperty('--value-a', $valueB);
            $parent.querySelector('#left').value = $valueB;
            $__parent.querySelector('.min').value = $valueB;
        }
        if ($valueB < $valueA) {
            $rangeB.value = $valueA;
            $parent.style.setProperty('--value-b', $valueA);
            $parent.querySelector('#right').value = $valueA;
            $__parent.querySelector('.max').value = $valueA;
        }
    }

    function calculateRange() {
        const $ranges = [...$mainRange.querySelectorAll('input[type="range"]')];
        $ranges.map($el => {
            $el.oninput = () => {
                calculateRangeOnly($el);
            }
        });
    }

    function triggerInputForRange() {
        let $rangeSliders = $mainRange.querySelectorAll('.range-slider input[type="range"]');
        let $inputsRangeSlider = [...document.querySelectorAll('.input-form input')];
        $rangeSliders.forEach(slider => {
            slider.addEventListener('input', function () {
                let $inputIndex = Array.from(this.parentNode.parentNode.querySelectorAll('input[type="range"]')).indexOf(this);
                let $input = $inputsRangeSlider[$inputIndex];
                let $span = $input.parentElement.children[0];
                let $label = $input.parentElement;
                let $icon = $input.parentElement.querySelector('i.euro');

                // Apply focus styles to the input when moving the range slider thumb
                $span.style.top = '-15px';
                $span.style.color = 'var(--color-primary-light)';
                $label.style.borderColor = 'var(--color-primary-light)';
                $icon.style.color = 'var(--color-text)';
            });
        });
    }

    function onFocusInputReset($el) {
        $el.onfocus = ($e) => {
            $e.currentTarget.value = '';
        };
    }

    function onBlurInputBefore($el, $id) {
        $el.onblur = ($e) => {
            if ($e.currentTarget.value === '') {
                $e.currentTarget.value = $mainRange.querySelector($id).value;
            }
        };
    }

    function focusAndBlur() {
        onFocusInputReset($minInput.nextElementSibling);
        onFocusInputReset($maxInput.nextElementSibling);
        onBlurInputBefore($minInput.nextElementSibling, '#left');
        onBlurInputBefore($maxInput.nextElementSibling, '#right');
    }

    function limitRange($id) {
        console.log($mainRange.querySelector($id))
        $mainRange.querySelector($id).addEventListener('input', ($e) => {
            if ($id == '#left') {
                if (parseInt($e.currentTarget.value) > parseInt($e.currentTarget.parentNode.style.getPropertyValue(`--value-${ $id == '#left' ? 'b' : 'a' }`))) {
                    $e.currentTarget.value = $e.currentTarget.parentNode.style.getPropertyValue(`--value-${ $id == '#left' ? 'b' : 'a' }`);
                }
            } else {
                if (parseInt($e.currentTarget.value) < parseInt($e.currentTarget.parentNode.style.getPropertyValue(`--value-${ $id == '#left' ? 'b' : 'a' }`))) {
                    $e.currentTarget.value = $e.currentTarget.parentNode.style.getPropertyValue(`--value-${ $id == '#left' ? 'b' : 'a' }`);
                }
            }
            $e.currentTarget.parentNode.style.setProperty(`--value-${ $id == '#left' ? 'a':'b' }`, $e.currentTarget.value);
            $e.currentTarget.parentNode.style.setProperty(`--text-value-${ $id == '#left' ? 'a':'b' }`, JSON.stringify($e.currentTarget.value));
        });
    }
    
    limitRange('#left');
    limitRange('#right');

    focusAndBlur();
    triggerInputForRange();
    calculateRange();
    calculateInputs();
    inputFocusBlur();
    renameLabelInput()
});