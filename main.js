document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const buffer = e.target.result;
            analyzeZipFile(buffer);
        };
        reader.readAsArrayBuffer(file);
    }
});


function analyzeZipFile(zipFile) {
    JSZip.loadAsync(zipFile)
        .then(function (zip) {
            let result = '';
            zip.forEach(function (relativePath, zipEntry) {
                if (/\.(jpg|jpeg|png|gif)$/i.test(relativePath)) {
                    zipEntry.async("base64").then(function (content) {
                        result += "<p><strong>ファイル名:</strong> " + relativePath + "</p>"
                        result += '<p>内容:<img src="data:image/png;base64,' + content + '" /></p>';
                        document.getElementById('result').innerHTML = result;
                    });
                }else
                if(/\.(mp3|wav)$/i.test(relativePath)){
                    zipEntry.async("base64").then(function (content) {
                        result += "<p><strong>ファイル名:</strong> " + relativePath + "</p>"
                        result += '<p>内容:<audio controls="true" src="data:image/wave;base64,' + content + '" /></p>';
                        document.getElementById('result').innerHTML = result;
                    });    
                }else
                if(/\.(svg)$/i.test(relativePath)){
                result += "<p><strong>ファイル名:</strong> " + relativePath + "</p>";
                        zipEntry.async("string").then(function (content) {
                            result += "<p><strong>内容:</strong> " + content + "</p>";
                            result += "<p>解析結果:</p>"+getAllImagesInSvg(text_element(content))
                            document.getElementById('result').innerHTML = result;
            });
        }
            document.getElementById('result').innerHTML = result;
        });
})}