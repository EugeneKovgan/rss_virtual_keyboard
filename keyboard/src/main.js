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

let currentLanguage = window.navigator.language;
let capsLockState = 'no_active';
const arrayKeys = [...keys];
console.log(currentLanguage);
console.log(capsLockState);

function init(arr, lang) {
    // console.log(lang);
    // const arr = [...collection];
    const keyboard_block = document.querySelector('.keyboard_block');
    const textarea = document.querySelector('.textarea');
    // const capsLock = document.querySelector('');
    textarea.onblur = () => textarea.focus();
    textarea.focus();

    const line_1 = keyboard_block.querySelector('.line_1');
    const line_2 = keyboard_block.querySelector('.line_2');
    const line_3 = keyboard_block.querySelector('.line_3');
    const line_4 = keyboard_block.querySelector('.line_4');
    const line_5 = keyboard_block.querySelector('.line_5');
    // line_1.innerHTML = '';
    // line_2.innerHTML = '';
    // line_3.innerHTML = '';
    // line_4.innerHTML = '';
    // line_5.innerHTML = '';

    arr.forEach((element) => {
        const key = document.createElement('div');
        key.classList.add(element.size);
        key.classList.add('key_btn');
        key.setAttribute('id', element.code);
        key.setAttribute('line', element.line);
        key.setAttribute('char-en', element.character.en);
        key.setAttribute('char-ru', element.character.ru);
        key.setAttribute('letter-en', element.contents.en);
        key.setAttribute('letter-ru', element.contents.ru);
        key.setAttribute('change-en', element.shift.en);
        key.setAttribute('change-ru', element.shift.ru);

        if (lang == 'en' && capsLockState === 'no_active') {
            key.innerHTML = element.contents.en;
        }
        if (lang == 'en' && capsLockState === 'active') {
            key.innerHTML = element.shift.en;
        }
        if (lang == 'ru' && capsLockState === 'no_active') {
            key.innerHTML = element.contents.ru;
        }
        if (lang == 'ru' && capsLockState === 'active') {
            key.innerHTML = element.shift.ru;
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
    showActiveKeys();
}

function showActiveKeys() {
    document.addEventListener('keydown', (e) => {
        const currentLetter = document.querySelector(`#${e.code}`);
        if (currentLetter.id != 'CapsLock') {
            currentLetter.classList.add('active');
        } else {
            currentLetter.classList.toggle('active');
            if (currentLetter.classList.contains('active')) {
                capsLockState = 'active';
                console.log('active');
            } else {
                console.log('no');
                capsLockState = 'no_active';
            }
        }
    });
    document.removeEventListener('keydown', (e) => {
        const currentLetter = document.querySelector(`#${e.code}`);
        if (currentLetter.id != 'CapsLock') {
            currentLetter.classList.add('active');
        } else {
            currentLetter.classList.toggle('active');
        }
    });
    document.addEventListener('keyup', (e) => {
        const currentLetter = document.querySelector(`#${e.code}`);
        if (currentLetter.id != 'CapsLock') {
            currentLetter.classList.remove('active');
        }
    });
    document.addEventListener('mousedown', (e) => {
        if (e.target.id != 'CapsLock') {
            e.target.classList.add('active');
        } else {
            e.target.classList.toggle('active');
        }
    });
    document.addEventListener('mouseup', (e) => {
        if (e.target.id != 'CapsLock') {
            e.target.classList.remove('active');
        }
    });
}

init(arrayKeys, currentLanguage);
// showActiveKeys();
