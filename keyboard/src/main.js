console.log('ready');
import keys from './keys_arr.js';

const body = document.querySelector('body');
body.innerHTML = `
    <div class="keyboard_wrapper">
        <h1>RSS Virtual Keyboard</h1>
        <div class="keyboard_header">
            <textarea class="textarea" name="" id=""></textarea>
        </div>
        <div class="keyboard_main">
            <div class="keyboard_block">
                <div class="line_1"></div>
                <div class="line_2"></div>
                <div class="line_3"></div>
                <div class="line_4"></div>
                <div class="line_5"></div>
            </div>
        </div>
        <div class="keyboard_footer">created in Windows OS</div>
    </div>
`;

function init(arr) {
    let currentLanguage = window.navigator.language;
    console.log(currentLanguage);
    const keyboard_block = document.querySelector('.keyboard_block');

    const line_1 = keyboard_block.querySelector('.line_1');
    const line_2 = keyboard_block.querySelector('.line_2');
    const line_3 = keyboard_block.querySelector('.line_3');
    const line_4 = keyboard_block.querySelector('.line_4');
    const line_5 = keyboard_block.querySelector('.line_5');
    arr.forEach((element) => {
        const key = document.createElement('div');
        key.classList.add(element.size);
        key.classList.add('key_btn');
        // console.log(element);
        key.setAttribute('id', element.code);
        key.setAttribute('line', element.line);
        key.setAttribute('char-en', element.character.en);
        key.setAttribute('char-ru', element.character.ru);
        key.setAttribute('letter-en', element.contents.en);
        key.setAttribute('letter-ru', element.contents.ru);
        key.setAttribute('change-en', element.shift.en);
        key.setAttribute('change-ru', element.shift.ru);
        if (currentLanguage == 'en') {
            key.innerHTML = element.contents.en;
        } else {
            key.innerHTML = element.contents.ru;
        }

        const current_line = key.getAttribute('line');

        if (current_line === 'line_1') {
            line_1.append(key);
        }
        if (current_line === 'line_2') {
            line_2.append(key);
        }
        if (current_line === 'line_3') {
            line_3.append(key);
        }
        if (current_line === 'line_4') {
            line_4.append(key);
        }
        if (current_line === 'line_5') {
            line_5.append(key);
        }
    });
}
init(keys);

document.addEventListener('keydown', (e) => {
    // const currentLetter = e.code;
    const currentLetter = document.querySelector(`#${e.code}`);
    currentLetter.classList.add('active');
    console.log(currentLetter);
});
