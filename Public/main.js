// Text color picker 
const textColor = document.getElementById('textColor');
const textColorPicker = document.getElementById('textColorPicker');
// Background color picker
const bgColorText = document.getElementById('bgColorText');
const bgColorPicker = document.getElementById('bgColorPicker');
// generate QR code
let qrcodeImage = document.getElementById('qrcodeImage');
let message = document.getElementById('message');
// change text Scan me
let textScanMe = document.getElementById('textScanMe');
let textCode = document.getElementById('textCode');
let errorText = document.getElementById('errorText');
// Download QR code
let Allqrcode = document.getElementById('Allqrcode');
let downloadQRCode = document.getElementById('downloadQRCode');

// Text color picker update on input text
textColorPicker.addEventListener('input', function () {
    textColor.value = textColorPicker.value;
    textCode.style.color = textColor.value;
    textCode.style.borderColor = textColor.value;
    qrcodeImage.style.borderColor = textColor.value;

});
// Text color picker update on input color
textColor.addEventListener('input', function () {
    textColorPicker.value = textColor.value;
    textCode.style.color = textColor.value;
    textCode.style.borderColor = textColor.value;
    qrcodeImage.style.borderColor = textColor.value;
});

// Background color picker update on input text
bgColorPicker.addEventListener('input', function () {
    bgColorText.value = bgColorPicker.value;
    textCode.style.backgroundColor = bgColorText.value;
});
// Background color picker update on input color
bgColorText.addEventListener('input', function () {
    bgColorPicker.value = bgColorText.value;
    textCode.style.backgroundColor = bgColorText.value;
});





// generate QR code

message.addEventListener('keyup', () => {
    if (message.value.length > 0) {
        qrcodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${message.value}&size=200x200`
    }
})






// change text Scan me

textScanMe.addEventListener('keyup', () => {
    if (textScanMe.value.length < 20) {
        textCode.innerText = textScanMe.value
        errorText.style.display = "none";
    }
    else {
        errorText.innerText = "please enter text less than 20 character"
        errorText.style.display = "block";
    }
})






// Download QR code



downloadQRCode.addEventListener('click', () => {
    if (message.value !== '') {
        // التأكد من أن الصورة تم تحميلها
        const img = new Image();
        img.src = qrcodeImage.src;
        img.onload = () => {
            if (Allqrcode) {
                captureQRCode(Allqrcode);
            }
        };

        img.onerror = () => {
            console.error('حدث خطأ أثناء تحميل الصورة');
        }
    }
});

function captureQRCode(Allqrcode) {
    // استخدام dom-to-image لتحويل العنصر إلى صورة
    domtoimage.toPng(Allqrcode)
        .then(function(dataUrl) {
            // استبدال البيانات لتمكين التنزيل كـ Octet Stream
            let newData = dataUrl.replace(/^data:image\/png/, 'data:application/octet-stream');
            // إنشاء رابط لتحميل الصورة
            let downloadLink = document.createElement('a');
            downloadLink.href = newData;
            downloadLink.download = 'qrcode_image.png';
            downloadLink.click();
        })
        .catch(function(error) {
            console.error('حدث خطأ أثناء تحويل العنصر إلى صورة:', error);
        });
}
