// ...existing code...
// This file is intentionally left blank.

(function () {
    // Configuration
    const wishes = [
        "Wishing you joy, peace, and love this Christmas.",
        "May your holidays be merry and bright!",
        "Warm wishes for a wonderful Christmas and a Happy New Year.",
        "May your home be filled with laughter and cheer.",
        "Sending you Christmas blessings and warm hugs."
    ];
    const rotateInterval = 4000; // ms

    // Create container if not present
    let container = document.getElementById("greeting");
    if (!container) {
        container = document.createElement("div");
        container.id = "greeting";
        document.body.appendChild(container);
    }

    // Basic styles for container (so it looks okay on a plain page)
    const style = document.createElement("style");
    style.textContent = `
    #greeting {
        position: relative;
        z-index: 2;
        max-width: 760px;
        margin: 48px auto;
        padding: 28px;
        background: rgba(255,255,255,0.9);
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        text-align: center;
    }
    #greeting h1 { margin: 0 0 8px 0; color: #b11226; }
    #greeting p { margin: 0 0 16px 0; color: #333; font-size: 1.1rem; }
    #greeting .actions { display:flex; gap:8px; justify-content:center; }
    #greeting button {
        background:#0b7a75; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer;
    }
    #greeting button.secondary { background:#8b5f9b; }
    canvas#snowCanvas { position:fixed; left:0; top:0; width:100%; height:100%; pointer-events:none; z-index:1; }
    `;
    document.head.appendChild(style);

    // Build content
    container.innerHTML = "";
    const title = document.createElement("h1");
    title.textContent = "Merry Christmas!";
    const message = document.createElement("p");
    message.textContent = wishes[0];

    const actions = document.createElement("div");
    actions.className = "actions";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = "Copy Message";
    copyBtn.addEventListener("click", () => {
        const text = `${title.textContent} — ${message.textContent}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.textContent = "Copied!";
                setTimeout(() => (copyBtn.textContent = "Copy Message"), 1500);
            }).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    });

    const shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.className = "secondary";
    shareBtn.textContent = "Share";
    shareBtn.addEventListener("click", async () => {
        const text = `${title.textContent} — ${message.textContent}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: "Merry Christmas", text });
            } catch (err) {
                console.log("Share canceled or failed", err);
            }
        } else {
            alert("Share is not supported in this browser. You can copy the message instead.");
        }
    });

    actions.appendChild(copyBtn);
    actions.appendChild(shareBtn);

    container.appendChild(title);
    container.appendChild(message);
    container.appendChild(actions);

    // Rotate wishes
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % wishes.length;
        message.style.opacity = 0;
        setTimeout(() => {
            message.textContent = wishes[idx];
            message.style.opacity = 1;
        }, 220);
    }, rotateInterval);

    // Fallback copy for older browsers
    function fallbackCopy(text) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand("copy");
            copyBtn.textContent = "Copied!";
            setTimeout(() => (copyBtn.textContent = "Copy Message"), 1500);
        } catch (e) {
            alert("Copy failed. Please select and copy manually:\n\n" + text);
        }
        document.body.removeChild(ta);
    }

    // Simple falling snow effect on a canvas
    const canvas = document.createElement("canvas");
    canvas.id = "snowCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let particles = [];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function spawnParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            vy: 0.5 + Math.random() * 1.2,
            vx: -0.5 + Math.random() * 1,
            r: 1 + Math.random() * 3,
            alpha: 0.6 + Math.random() * 0.4
        };
    }

    for (let i = 0; i < 60; i++) particles.push(spawnParticle());

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx += (Math.sin((p.y + i) * 0.01) * 0.02);
            if (p.y - p.r > canvas.height || p.x < -20 || p.x > canvas.width + 20) {
                particles[i] = spawnParticle();
                particles[i].y = -10;
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255," + p.alpha + ")";
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        // occasionally spawn new ones
        if (particles.length < 120 && Math.random() < 0.2) particles.push(spawnParticle());
        requestAnimationFrame(update);
    }
    update();

})();