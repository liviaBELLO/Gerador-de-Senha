
function validar() {
    var input = document.getElementById('pwdQuantity').value;

    // Verifica se o valor inserido é um número e se está dentro do intervalo desejado
    if (input === '' || isNaN(input) || input < 1 || input > 10) {
        alert('Insira um número válido entre 1 e 10');
    } 
    if (input > 10) {
        window.location.reload();
    }
}


// Move a função clearTextArea para fora do escopo do evento DOMContentLoaded
function clearTextArea() {
    document.getElementById('pwdContent').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const btnGenerate = document.getElementById('btnGenerate');
    const pwdRange = document.getElementById('pwdRange');
    const pwdRangeStatus = document.getElementById('pwdRangeStatus');
    const pwdInputsChars = Array.from(document.getElementById('pwdInputsChars').getElementsByTagName('input'));
    const pwdQuantityInput = document.getElementById('pwdQuantity');
    const btnClear = document.getElementById('btnClear');

    // Adiciona evento de clique ao botão 'Gerar'
    btnGenerate.addEventListener('click', pwdGenerator);

    // Adiciona evento de input ao range
    pwdRange.addEventListener('input', pwdGenerator);
    pwdRange.addEventListener('input', function(evt) {
        pwdRangeStatus.textContent = evt.currentTarget.value;
    });

    // Adiciona evento de input ao campo de quantidade de senhas
    pwdQuantityInput.addEventListener('input', validar);

    // Adiciona evento de mudança aos checkboxes
    for (let i = 0; i < pwdInputsChars.length; i++) {
        pwdInputsChars[i].addEventListener('change', pwdGenerator);
    }

    // Adiciona evento de clique ao botão 'Limpar'
    btnClear.addEventListener('click', clearTextArea);
});

// Define a função pwdGenerator
function pwdGenerator() {
    const _password = {
        value: '',
        length: 1,
        characters: {
            numbers: '0123456789',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            special: '?/~^{}[]!@#$%&*()_-+=.,:;'
        },
        generate(chars) {
            let pwd = '';

            this.length = this.length < 1 || this.length > 50 ? 15 : this.length;

            chars = chars || Object.values(this.characters).join();

            for (let i = 0; i < this.length; i++) {
                pwd += chars[Math.floor(Math.random() * chars.length)];
            }

            this.value = pwd;
            return pwd;
        }
    };

    let chars = '';
    const pwdQuantity = parseInt(document.getElementById('pwdQuantity').value);

    for (let i = 0; i < pwdInputsChars.length; i++) {
        if (pwdInputsChars[i].checked) {
            chars += _password.characters[pwdInputsChars[i].name];
        }
    }

    _password.length = pwdRange.value;
    let passwords = '';
    for (let j = 0; j < pwdQuantity; j++) {
        passwords += _password.generate(chars) + '\n';
    }
    document.getElementById('pwdContent').value = passwords;
}