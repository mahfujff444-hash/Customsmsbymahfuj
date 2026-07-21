const form = document.getElementById('smsForm');
const statusDiv = document.getElementById('status');
const sendBtn = document.getElementById('sendBtn');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

let currentProvider = 'api1';

// API Box Selection with Animation
document.querySelectorAll('.api-box').forEach(box => {
    box.addEventListener('click', () => {
        document.querySelectorAll('.api-box').forEach(b => b.classList.remove('active'));
        box.classList.add('active');
        currentProvider = box.dataset.provider;
    });
});

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (!phone || !message) {
        showStatus('❌ ফোন নম্বর ও মেসেজ দিতে হবে!', 'error');
        return;
    }

    // Button Animation
    sendBtn.disabled = true;
    sendBtn.innerHTML = 'পাঠানো হচ্ছে... <span style="animation: spin 1s linear infinite;">⭮</span>';

    let url = '';

    if (currentProvider === 'api1') {
        url = `https://devbd.my.id/sms.php?key=AM–MRXRPSh2PU&number=${encodeURIComponent(phone)}&msg=${encodeURIComponent(message)}`;
    } else {
        url = `https://darktube.serv00.net/api?api_key=SMS_6079418217_ec2b63e94e054c563b3eaabdc39246ab&number=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`;
    }

    try {
        await fetch(url, { method: 'GET', mode: 'no-cors' });
        
        showStatus('✅ SMS সফলভাবে পাঠানো হয়েছে!', 'success');
        
        // Auto clear message after success
        setTimeout(() => {
            messageInput.value = '';
        }, 1800);

    } catch (err) {
        showStatus('❌ সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
    } finally {
        // Reset Button
        sendBtn.disabled = false;
        sendBtn.innerHTML = '🚀 SMS পাঠান';
    }
});

function showStatus(msg, type) {
    let html = '';
    if (type === 'success') {
        html = `<div class="success">${msg}</div>`;
    } else {
        html = `<div style="color: #721c24; background: #f8d7da; padding: 15px; border-radius: 12px; text-align: center;">${msg}</div>`;
    }
    
    statusDiv.innerHTML = html;
    
    // Auto hide status
    setTimeout(() => {
        statusDiv.innerHTML = '';
    }, 4500);
}
