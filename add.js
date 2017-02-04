//先复制出来
var temSquare = function() {
    var t = `
            <div class="square">
            `
    return t
}
var temSingle = function(x, y) {
    var t =`
            <div id='id-${x}${y}'class="single">
                <span><span>
            </div>
    `
    return t
}

var addSquare = function() {
    var s = document.querySelector('.container')
    var square = temSquare()
    for (var i = 0; i < 10; i++) {
        appendHtml(s, square)
        }
}

var addSingle = function() {
    var square = $('.square')
    for (var i = 0; i < square.length; i++) {
        for (var j = 0; j < 10; j++) {
            var single = temSingle(i, j)
            appendHtml(square[i], single)
        }
    }
}


addSquare()
addSingle()
