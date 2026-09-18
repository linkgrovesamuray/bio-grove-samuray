document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
            (e.ctrlKey && e.key === 'u')
        ) {
            e.preventDefault();
        }
    });

    const botTrigger = document.getElementById('botTrigger');
    const botModal = document.getElementById('botModal');
    const modalClose = document.getElementById('modalClose');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    let userName = '';
    let currentStep = 'ASK_NAME';

    function playClickSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(528, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {}
    }

    document.querySelectorAll('.btn-cyber, .btn-send, .bot-trigger').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });

    botTrigger.addEventListener('click', () => { botModal.style.display = 'flex'; });
    modalClose.addEventListener('click', () => { botModal.style.display = 'none'; });

    function appendMsg(text, isUser = false) {
        const div = document.createElement('div');
        div.className = `msg ${isUser ? 'user-msg' : 'bot-msg'}`;
        div.innerHTML = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showMainMenu() {
        currentStep = 'MAIN_MENU';
        const menuText = `
            Perfeito, <strong>${userName}</strong>! Escolha uma opção do SamuraBot para continuar:<br><br>
            <strong>[1]</strong> 🎵 Músicas, Faixas & Lançamentos<br>
            <strong>[2]</strong> 👕 Moda Manifesto (Favela Vence)<br>
            <strong>[3]</strong> 📦 Atendperto (Serviços e Entregas)<br>
            <strong>[4]</strong> ⚡ Falar no WhatsApp com S Samuray
        `;
        appendMsg(menuText);
        chatInput.placeholder = "Digite 1, 2, 3 ou 4...";
    }

    function handleInput() {
        const val = chatInput.value.trim();
        if (!val) return;

        appendMsg(val, true);
        chatInput.value = '';

        if (currentStep === 'ASK_NAME') {
            userName = val;
            setTimeout(showMainMenu, 300);
            return;
        }

        if (val === '0') {
            setTimeout(showMainMenu, 300);
            return;
        }

        if (currentStep === 'MAIN_MENU') {
            if (val === '1') {
                currentStep = 'SUB_MUSIC';
                setTimeout(() => {
                    appendMsg(`
                        🎵 <strong>Acervo S Samuray:</strong><br>
                        • Total: +148 faixas lançadas.<br>
                        • EP Destaque: "Tudo Fica Bom"<br><br>
                        Escolha a plataforma:<br>
                        <strong>[1.1]</strong> Spotify Oficial<br>
                        <strong>[1.2]</strong> YouTube Canal<br>
                        <strong>[0]</strong> Voltar
                    `);
                    chatInput.placeholder = "Digite 1.1, 1.2 ou 0...";
                }, 300);
            } else if (val === '2') {
                currentStep = 'SUB_SHOP';
                setTimeout(() => {
                    appendMsg(`
                        👕 <strong>Moda Manifesto (Favela Vence):</strong><br>
                        Coleção autoral nascida no Subúrbio de Salvador.<br><br>
                        <a href="https://grovesamuray3.lojavirtualnuvem.com.br" target="_blank" style="color:var(--gold-electric); font-weight:bold;">👉 Ir para a Loja Oficial Nuvemshop</a><br><br>
                        Digite <strong>0</strong> para voltar.
                    `);
                    chatInput.placeholder = "Digite 0 para voltar...";
                }, 300);
            } else if (val === '3') {
                currentStep = 'SUB_ATEND';
                setTimeout(() => {
                    appendMsg(`
                        📦 <strong>Atendperto Logística:</strong><br>
                        Serviço de entregas rápidas e conexões locais.<br><br>
                        <a href="https://atendpert.netlify.app/" target="_blank" style="color:var(--cyan-electric); font-weight:bold;">👉 Acessar Atendperto</a><br><br>
                        Digite <strong>0</strong> para voltar.
                    `);
                    chatInput.placeholder = "Digite 0 para voltar...";
                }, 300);
            } else if (val === '4') {
                currentStep = 'SUB_BOOKING';
                setTimeout(() => {
                    const waLink = `https://wa.me/557185430459?text=${encodeURIComponent(`Olá Samuray! Meu nome é ${userName}. Através do SamuraBot gostaria de informações sobre shows e parcerias.`)}`;
                    appendMsg(`
                        ⚡ <strong>Atendimento WhatsApp Direct:</strong><br><br>
                        <a href="${waLink}" target="_blank" style="color:var(--gold-electric); font-weight:bold;">📲 Iniciar conversa no WhatsApp do S Samuray</a><br><br>
                        Digite <strong>0</strong> para voltar.
                    `);
                    chatInput.placeholder = "Digite 0 para voltar...";
                }, 300);
            } else {
                setTimeout(() => appendMsg("Opção inválida. Digite 1, 2, 3 ou 4 (ou 0 para voltar)."), 300);
            }
            return;
        }

        if (currentStep === 'SUB_MUSIC') {
            if (val === '1.1') {
                window.open("https://open.spotify.com/artist/7xYI83UxtESrmFA0ddnqos", "_blank");
            } else if (val === '1.2') {
                window.open("https://www.youtube.com/@Samurays57", "_blank");
            }
            setTimeout(showMainMenu, 400);
        }
    }

    sendBtn.addEventListener('click', handleInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleInput();
    });
});
