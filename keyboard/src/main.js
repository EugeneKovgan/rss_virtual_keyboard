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
        <div class="keyboard_footer">created in Windows OS (language chande - ShiftLeft + AltLeft )</div>
    </div>
`;

if (localStorage.length === 0) {
    localStorage.setItem('lang', 'en');
}
let currentLanguage = localStorage.getItem('lang', 'en');
let capsLockState = 'no_active';
const arrayKeys = [...keys];
console.log(`CapsLock - ${capsLockState}`);

function init(arr) {
    console.log(currentLanguage);
    const textarea = document.querySelector('.textarea');
    textarea.onblur = () => textarea.focus();
    textarea.focus();

    arr.forEach((element) => {
        const key = document.createElement('div');
        key.classList.add(element.size);
        key.classList.add('key_btn');
        key.setAttribute('id', element.code);
        key.setAttribute('line', element.line);
        key.setAttribute('lover-en', element.lover.en);
        key.setAttribute('lover-ru', element.lover.ru);
        key.setAttribute('upper-en', element.upper.en);
        key.setAttribute('upper-ru', element.upper.ru);
        key.setAttribute('type_key', element.type.en);
        drowKeys(currentLanguage, key, element);
    });
    showActiveKeys();
    typingMouse(currentLanguage, capsLockState);
    changeLang(
        () => {
            // alert('Привет!');
            localStorage.getItem('lang') === 'en'
                ? localStorage.setItem('lang', 'ru')
                : console.log(localStorage.getItem('lang'));
        },
        'ShiftLeft',
        'AltLeft'
    );
}

function drowKeys(lang, key, element) {
    const keyboard_block = document.querySelector('.keyboard_block');
    const line_1 = keyboard_block.querySelector('.line_1');
    const line_2 = keyboard_block.querySelector('.line_2');
    const line_3 = keyboard_block.querySelector('.line_3');
    const line_4 = keyboard_block.querySelector('.line_4');
    const line_5 = keyboard_block.querySelector('.line_5');
    if (lang == 'en' && capsLockState === 'no_active') {
        key.innerHTML = element.lover.en;
    }
    if (lang == 'en' && capsLockState === 'active') {
        key.innerHTML = element.upper.en;
    }
    if (lang == 'ru' && capsLockState === 'no_active') {
        key.innerHTML = element.lover.ru;
    }
    if (lang == 'ru' && capsLockState === 'active') {
        key.innerHTML = element.upper.ru;
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
}

function redrowingKey(lang, size) {
    console.log(currentLanguage);
    console.log(`CapsLock - ${capsLockState}`);
    const keys = document.querySelectorAll('.key_btn');
    keys.forEach((el) => {
        el.innerHTML = el.getAttribute(`${size}-${lang}`);
    });
}

function typingMouse(lang, capsLockState) {
    document.addEventListener('click', (e) => {
        console.log('click');
        const textarea = document.querySelector('.textarea');
        let size;
        if (capsLockState == 'active') {
            size = 'upper';
        } else {
            size = 'lover';
        }
        if (
            e.target.getAttribute('type_key') == 'symbol' ||
            e.target.getAttribute('type_key') == 'letter' ||
            e.target.getAttribute('type_key') == 'digit'
        ) {
            textarea.innerHTML += e.target.getAttribute(`${size}-${lang}`);
        }
    });
}

function showActiveKeys() {
    document.addEventListener('keydown', (e) => {
        const currentLetter = document.querySelector(`#${e.code}`);
        if (currentLetter.id != 'CapsLock' && currentLetter.id != 'ShiftLeft' && currentLetter.id != 'ShiftRight') {
            currentLetter.classList.add('active');
        } else if (currentLetter.id == 'ShiftLeft' || currentLetter.id == 'ShiftRight') {
            currentLetter.classList.add('active');
            capsLockState = 'active';
            redrowingKey(currentLanguage, 'upper');
        } else {
            currentLetter.classList.toggle('active');
            currentLetter.classList.contains('active')
                ? ((capsLockState = 'active'), redrowingKey(currentLanguage, 'upper'))
                : ((capsLockState = 'no_active'), redrowingKey(currentLanguage, 'lover'));
        }
    });
    document.addEventListener('keyup', (e) => {
        const currentLetter = document.querySelector(`#${e.code}`);
        if (currentLetter.id != 'CapsLock' && currentLetter.id != 'ShiftLeft' && currentLetter.id != 'ShiftRight') {
            currentLetter.classList.remove('active');
        } else if (currentLetter.id == 'ShiftLeft' || currentLetter.id == 'ShiftRight') {
            currentLetter.classList.remove('active');
            capsLockState = 'no_active';
            redrowingKey(currentLanguage, 'lover');
        }
    });
    document.addEventListener('mousedown', (e) => {
        if (e.target.id != 'CapsLock' && e.target.id != 'ShiftLeft' && e.target.id != 'ShiftRight') {
            e.target.classList.add('active');
        } else if (e.target.id == 'ShiftLeft' || e.target.id == 'ShiftRight') {
            e.target.classList.add('active');
            capsLockState = 'active';
            redrowingKey(currentLanguage, 'upper');
        } else {
            e.target.classList.toggle('active');
            e.target.classList.contains('active')
                ? ((capsLockState = 'active'), redrowingKey(currentLanguage, 'upper'))
                : ((capsLockState = 'no_active'), redrowingKey(currentLanguage, 'lover'));
        }
    });
    document.addEventListener('mouseup', (e) => {
        if (e.target.id != 'CapsLock' && e.target.id != 'ShiftLeft' && e.target.id != 'ShiftRight') {
            e.target.classList.remove('active');
        } else if (e.target.id == 'ShiftLeft' || e.target.id == 'ShiftRight') {
            e.target.classList.remove('active');
            capsLockState = 'no_active';
            redrowingKey(currentLanguage, 'lover');
            typingMouse(currentLanguage, capsLockState);
        }
    });
}

function changeLang(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
        pressed.add(event.code);

        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();
        func();
    });

    document.addEventListener('keyup', function (event) {
        pressed.delete(event.code);
    });
}

init(arrayKeys);
