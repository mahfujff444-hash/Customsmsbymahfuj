const form = document.getElementById('smsForm');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const provider = document.getElementById('provider').value;
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!phone || !message) {
        showStatus('ফোন নম্বর ও মেসেজ দিতে হবে!', 'error');
        return;
    }

    showStatus('পাঠানো হচ্ছে...', 'info');

    let url = '';

    if (provider === 'api1') {
        url = `https://devbd.my.id/sms.php?key=AM–MRXRPSh2PU&number=${encodeURIComponent(phone)}&msg=${encodeURIComponent(message)}`;
    } else {
        url = `https://darktube.serv00.net/api?api_key=SMS_6079418217_ec2b63e94e054c563b3eaabdc39246ab&number=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`;
    }

    try {
        const response = await fetch(url, { 
            method: 'GET',
            mode: 'no-cors'  // CORS সমস্যা এড়ানোর জন্য
        });

        showStatus('✅ SMS পাঠানোর অনুরোধ পাঠানো হয়েছে!', 'success');
        
        // লগ দেখার জন্য কনসোলে
        console.log('SMS Request Sent to:', provider);

    } catch (err) {
        showStatus('❌ সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।', 'error');
        console.error(err);
    }
});

function showStatus(msg, type) {
    let colorClass = '';
    if (type === 'success') colorClass = 'success';
    else if (type === 'error') colorClass = 'error';
    else colorClass = 'info';

    statusDiv.innerHTML = `<div class="${colorClass}">${msg}</div>`;
}
