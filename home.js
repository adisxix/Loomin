const nameEl = document.getElementById("firstnameDisplay");
const timeEl = document.getElementById("time");

const firstname = localStorage.getItem("firstname");

if (nameEl && firstname) {
nameEl.textContent = `Wassup ${firstname}`;
}

function updateTime() {
if (!timeEl) return;

const now = new Date();
timeEl.textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});
}

updateTime();
setInterval(updateTime, 1000);

const goalChecks = document.querySelectorAll(".goal-check");
const goalInputs = document.querySelectorAll(".goal-input");
const clearBtn = document.getElementById("clearGoals");

goalChecks.forEach((checkbox, index) => {
checkbox.addEventListener("change", function () {
    goalInputs[index].classList.toggle("completed", this.checked);
});
});

if (clearBtn) {
clearBtn.addEventListener("click", function () {
    goalChecks.forEach(cb => cb.checked = false);
    goalInputs.forEach(input => {
        input.classList.remove("completed");
        input.value = "";
    });
});
}

const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

const timerDisplay = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let countdown;
let timeLeft = 0;
let isRunning = false;
let isBreakActive = false;

const breakContainer = document.getElementById("breakContainer");
const breakBtn = document.getElementById("breakBtn");
const activeBreak = document.getElementById("activeBreak");
const endBreakBtn = document.getElementById("endBreakBtn");
const breakSound = document.getElementById("breakSound");

function updateDisplay() {
const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;

timerDisplay.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function disableTimerControls() {
startBtn.disabled = true;
pauseBtn.disabled = true;
resetBtn.disabled = true;

hoursInput.disabled = true;
minutesInput.disabled = true;
secondsInput.disabled = true;
}

function enableTimerControls() {
startBtn.disabled = false;
pauseBtn.disabled = false;
resetBtn.disabled = false;

hoursInput.disabled = false;
minutesInput.disabled = false;
secondsInput.disabled = false;
}

startBtn.addEventListener("click", () => {

if (isRunning || isBreakActive) return;

if (timeLeft === 0) {
    const hours = Number(hoursInput.value) || 0;
    const minutes = Number(minutesInput.value) || 0;
    const seconds = Number(secondsInput.value) || 0;

    timeLeft = (hours * 3600) + (minutes * 60) + seconds;

    if (timeLeft <= 0) return;
}

isRunning = true;

countdown = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(countdown);
        isRunning = false;
        triggerBreakMode();
    }
}, 1000);
});


pauseBtn.addEventListener("click", () => {
if (isBreakActive) return;
clearInterval(countdown);
isRunning = false;
});


resetBtn.addEventListener("click", () => {
if (isBreakActive) return;

clearInterval(countdown);
isRunning = false;
timeLeft = 0;

timerDisplay.textContent = "00:00:00";

hoursInput.value = "";
minutesInput.value = "";
secondsInput.value = "";
});


function triggerBreakMode() {

if (!breakContainer) return;

breakContainer.style.display = "block";

disableTimerControls();

if (breakSound) {
    breakSound.loop = true;
    breakSound.currentTime = 0;
    breakSound.play();
}
}


if (breakBtn) {
breakBtn.addEventListener("click", () => {

    if (breakSound) {
        breakSound.pause();
        breakSound.currentTime = 0;
    }

    breakBtn.style.display = "none";
    activeBreak.style.display = "block";

    isBreakActive = true;
});
}


if (endBreakBtn) {
endBreakBtn.addEventListener("click", () => {

    activeBreak.style.display = "none";
    breakContainer.style.display = "none";
    breakBtn.style.display = "block";

    isBreakActive = false;

    enableTimerControls();
});
}

const askLeoBtn = document.getElementById("askLeoBtn");
const aiStart = document.getElementById("aiStart");
const aiChat = document.getElementById("aiChat");
const chatMessages = document.getElementById("chatMessages"); 
const chatInput = document.getElementById("chatInput");       
const sendBtn = document.getElementById("sendBtn");          

if (askLeoBtn) {
askLeoBtn.addEventListener("click", () => {
    aiStart.style.display = "none";
    aiChat.style.display = "flex";
});
}

function addMessage(text, sender) {
if (!chatMessages) return;
const msg = document.createElement("div");
msg.classList.add("message");
msg.textContent = sender + ": " + text;
chatMessages.appendChild(msg);
chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSend() {
const question = chatInput.value.trim();
if (!question) return;

addMessage(question, "You");
chatInput.value = "";

try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
            "HTTP-Referer": window.location.origin, 
            "X-Title": "Leo Chatbot"               
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-chat", 
            messages: [
                { role: "user", content: question }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Detail:", errorData);
        throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    const aiReply = data.choices ? data.choices[0].message.content : "No response.";
    addMessage(aiReply, "Leo");

} catch (error) {
    console.error("Chat Error:", error);
    addMessage("Error: Check your API key or connection.", "Leo");
}
}

if (sendBtn) {
sendBtn.addEventListener("click", handleSend);
}

if (chatInput) {
chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleSend();
    }
});
}

