<?php
// ================== তোমার API কনফিগারেশন ==================

// API 1: https://devbd.my.id
$api1_url = 'https://devbd.my.id/sms.php';
$api1_key = 'AM–MRXRPSh2PU';

// API 2: https://darktube.serv00.net
$api2_url = 'https://darktube.serv00.net/api';
$api2_key = 'SMS_6079418217_ec2b63e94e054c563b3eaabdc39246ab';

// =====================================================================

$message = '';
$status = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone   = trim($_POST['phone']);
    $msg     = trim($_POST['message']);
    $provider = $_POST['provider'] ?? 'api1';

    if (empty($phone) || empty($msg)) {
        $status = '<div class="error">ফোন নম্বর ও মেসেজ দিতে হবে!</div>';
    } elseif (strlen($msg) > 300) {
        $status = '<div class="error">মেসেজ খুব বড়! সর্বোচ্চ ৩০০ অক্ষর।</div>';
    } else {
        $result = sendSMS($phone, $msg, $provider);
        $status = $result ? 
            '<div class="success">✅ SMS সফলভাবে পাঠানো হয়েছে!</div>' : 
            '<div class="error">❌ SMS পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।</div>';
    }
}

function sendSMS($phone, $message, $provider) {
    global $api1_url, $api1_key;
    global $api2_url, $api2_key;

    if ($provider === 'api1') {
        $url = $api1_url . '?key=' . urlencode($api1_key) . 
               '&number=' . urlencode($phone) . 
               '&msg=' . urlencode($message);
    } else {
        $url = $api2_url . '?api_key=' . urlencode($api2_key) . 
               '&number=' . urlencode($phone) . 
               '&message=' . urlencode($message);
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // লগ সেভ করা (সমস্যা ট্র্যাক করার জন্য)
    file_put_contents('sms_log.txt', 
        date('Y-m-d H:i:s') . " | Provider: $provider | Phone: $phone | Status: $httpCode | Response: $response\n", 
        FILE_APPEND);

    return ($httpCode >= 200 && $httpCode < 300) || stripos($response, 'success') !== false;
}
?>

<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom SMS Sender</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h2 { text-align: center; color: #333; }
        label { display: block; margin: 15px 0 5px; font-weight: bold; }
        input, textarea, select, button { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 16px; }
        button { background: #28a745; color: white; font-weight: bold; cursor: pointer; margin-top: 10px; }
        button:hover { background: #218838; }
        .success { color: #155724; background: #d4edda; padding: 12px; border-radius: 6px; margin: 15px 0; }
        .error { color: #721c24; background: #f8d7da; padding: 12px; border-radius: 6px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h2>📱 Custom SMS Sender</h2>
        
        <?= $status ?>

        <form method="POST">
            <label>প্রোভাইডার নির্বাচন করুন:</label>
            <select name="provider">
                <option value="api1">API 1 - devbd.my.id</option>
                <option value="api2">API 2 - darktube.serv00.net</option>
            </select>

            <label>ফোন নম্বর (01866...):</label>
            <input type="text" name="phone" placeholder="01866184669" required>

            <label>মেসেজ লিখুন:</label>
            <textarea name="message" rows="5" placeholder="আপনার মেসেজ এখানে..." required></textarea>

            <button type="submit">🚀 SMS পাঠান</button>
        </form>
    </div>
</body>
</html>
