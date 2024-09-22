function getAllImagesInSvg(svgElement) {
    const imageElements = [];

    // <svg>内のすべての <image> 要素を取得
    const svgTags = svgElement.querySelectorAll('svg');
    svgTags.forEach(svgTag => {
        const allElements = svgTag.querySelectorAll('image');
        allElements.forEach(element => {
            const url = element.getAttribute('xlink:href')
            imageElements.push(`<img src=${url}>`); // テキスト化して配列に追加
        });
    });

    return imageElements.join('\n'); // 配列を改行で連結して文字列として返す
}

function text_element(text){
    document.getElementById('result').innerHTML = `<div id="temp1">${text}</div>`
    let temp1 = document.getElementById('temp1')
    return temp1
}