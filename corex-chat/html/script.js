const container = document.getElementById('chat-container');
const output = document.getElementById('chat-output');
const input = document.getElementById('chat-input');

let chatOpen = false;

let outputFadeTimeout = null;
let inputCloseTimeout = null;

let history = [];
let historyIndex = -1;

/* CONFIG (you can tweak easily) */
const INPUT_CLOSE_DELAY = 1000;   // 1 second
const OUTPUT_FADE_DELAY = 5000;  // 5 seconds

/* OUTPUT CONTROL */
function showOutput() {
    container.classList.remove('hidden');
    output.classList.remove('fade-out');
    output.classList.add('visible');

    if (outputFadeTimeout) clearTimeout(outputFadeTimeout);

    outputFadeTimeout = setTimeout(() => {
        output.classList.remove('visible');
        output.classList.add('fade-out');

        setTimeout(() => {
            if (!chatOpen) {
                container.classList.add('hidden');
            }
        }, 400);
    }, OUTPUT_FADE_DELAY);
}

/* INPUT CONTROL */
function closeInputWithDelay() {
    if (inputCloseTimeout) clearTimeout(inputCloseTimeout);

    inputCloseTimeout = setTimeout(() => {
        chatOpen = false;
        input.blur();
    }, INPUT_CLOSE_DELAY);
}

function closeInputInstant() {
    if (inputCloseTimeout) clearTimeout(inputCloseTimeout);

    chatOpen = false;
    input.blur();
}

/* MESSAGE */
function addMessage(name, text, type) {
    const msg = document.createElement('div');
    msg.classList.add('message', type);

    if (type === "me") {
        msg.innerHTML = `<span class="name">*</span> ${name} ${text}`;
    } else {
        msg.innerHTML = `<span class="name">${name}:</span> ${text}`;
    }

    output.appendChild(msg);
    output.scrollTop = output.scrollHeight;

    showOutput();
}

/* EVENTS */
window.addEventListener('message', (e) => {
    const data = e.data;

    if (data.type === "toggle") {
        chatOpen = data.state;

        if (chatOpen) {
            container.classList.remove('hidden');
            output.classList.remove('fade-out');
            output.classList.add('visible');

            input.focus();

            if (outputFadeTimeout) clearTimeout(outputFadeTimeout);
        } else {
            closeInputInstant();
        }
    }

    if (data.type === "chat") {
        addMessage(data.name, data.message, data.chatType);
    }

    if (data.type === "typing") {
        addMessage(data.name, "is typing...", "local");
    }
});

/* INPUT */
input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
        const value = input.value.trim();
        if (!value) return;

        fetch(`https://${GetParentResourceName()}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({ message: value })
        });

        history.push(value);
        historyIndex = history.length;

        input.value = '';

        closeInputWithDelay(); // 🔥 1 second delay
    }

    if (e.key === 'Escape') {
        closeInputInstant(); // 🔥 immediate close

        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST'
        });
    }

    if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
    }

    if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            input.value = "";
        }
    }
});

/* GLOBAL ESC SAFETY */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInputInstant();

        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST'
        });
    }
});