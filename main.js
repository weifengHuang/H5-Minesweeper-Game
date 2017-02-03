// 复制一个 square
var clonedSquare = function(array) {
    var s = []
    for (var i = 0; i < array.length; i++) {
        var line = []
        for (var j = 0; j < array[i].length; j++) {
            line.push(array[i][j])
        }
        s.push(line)
    }
    return s
}

// 辅助函数, 给数字 +1
// 这里会判断下标是否合法
const plus1 = function(array, x, y) {
    var n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] != '雷') {
            array[x][y] += 1
        }
    }
}

// 辅助函数, 用来给 9 周边的 8 个格子 +1
const markAround = function(array, x, y) {
    /*
    ###
    ###
    ###
    */
    if (array[x][y] == '雷') {
        // 左边 3 个
        plus1(array, x - 1, y - 1)
        plus1(array, x - 1, y)
        plus1(array, x - 1, y + 1)
        // 上下 2 个
        plus1(array, x, y - 1)
        plus1(array, x, y + 1)
        // 右边 3 个
        plus1(array, x + 1, y - 1)
        plus1(array, x + 1, y)
        plus1(array, x + 1, y + 1)
    }
}

var markedSquare = function(array) {
    /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]
    规则是, 0 会被设置为四周 8 个元素中 9 的数量
    */
    var square = clonedSquare(array)
    for (var i = 0; i < square.length; i++) {
        var line = square[i]
        for (var j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

// 生成一个随机数组 10 * 10
//生成0或1的值
var random = function() {
    var num = Math.random()
    if(num <= 0.5){
        return 0
    }else {
        return 1
    }
}
//生成随机数0-9
var random9 = function () {
    var num = Math.random()*9 ;
    num = parseInt(num, 10);
    return num
}

//生成一个全为0的矩阵
var CreateArray = function() {
    var len = 10
    var width = 10
    var array = []
    for (var i = 0; i < len; i++) {
        array[i] = []
        for (var j = 0; j < width; j++) {
            array[i][j] = 0
        }
    }
    return array
}
//随机插入雷, n为雷的个数
var boom = function(array, n) {
    for (var i = 0; i < n; ) {
        var x = random9()
        var y = random9()
        var id = '#id-'+String(x) + String(y)
        var s = document.querySelector(id)
        //避免x，y出现重复的情况
        if (! s.classList.contains('boom')) {
            i++
            s.classList.add('boom')
            array[x][y] = '雷'
        }
    }
    return array
}
//生成带雷矩阵
var CreateBoomArray = function() {
    var array = CreateArray()
    //设置随机雷的个数
    var boomnum = 15
    var boomArray = boom(array,boomnum)
    return boomArray
}

var showNumber = function() {
    var array = CreateArray()
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < width; j++) {
            number = array[i][j]
        }
    }
    return number
}

var addHide = function() {
    var elements = document.querySelectorAll('.single')
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.add('hide')
    }
}

// 把新建随机数组的值赋值到HTML里面
var showArray = function(array) {
    // var array = CreateBoomArray()
    var square = document.querySelectorAll('.square')
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var number = array[i][j]
            var id = '#id-'+String(i) + String(j)
            var s = document.querySelector(id)
            s.innerHTML = number
        }
    }
}
// 屏蔽右键菜单
var forbidRightShow = function() {
    var container = e('.container')
    container.oncontextmenu = function(){
        return false
    }
}
var initShow = function() {
    forbidRightShow()
    //导入雷矩阵
    var array = CreateBoomArray()
    showArray(array)
    //导入雷旁边的个数
    var divarray = divArray()
    var markarray = markedSquare(divarray)
    showArray(markarray)
}
//从html里面获取数组
var divArray = function() {
    var len = 10
    var width = 10
    var divarray = []
    for (var i = 0; i < len; i++) {
        divarray[i] = []
        for (var j = 0; j < width; j++) {
            var id = '#id-'+String(i) + String(j)
            var s = document.querySelector(id)
            if(s.innerHTML != '雷') {
                divarray[i][j] = parseInt(s.innerHTML)
            }else {
                divarray[i][j] = s.innerHTML
            }
        }
    }
    return divarray
}
// 从html里面获取此时雷的个数
var getBoomNum = function() {
    var htmlArray = divArray()
    var boomNum = 0
    for (var i = 0; i < htmlArray.length; i++) {
        for (var j = 0; j < htmlArray.length; j++) {
            if(htmlArray[i][j] == '雷') {
                boomNum += 1
            }
        }
    }
    return boomNum
}

//点击是0则显示zero样式
var plus2 = function(array, x, y) {
    var n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
         var id = '#id-'+String(x) + String(y)
         var s = e(id)
         var judge0 = s.classList.contains('showZero')
         if (array[x][y] == 0 && !judge0) {
            s.classList.add('showZero')
                //点击为0 则递归处理这个格子外面的8个格子
                markAround2(array, x, y)
         }
         else if(array[x][y] != 0 && array[x][y] !='雷') {
             //出现数字则显示出雷的个数
             removeHide(s)
         }
        //  if(array[x][y] !=0 && array[x][y] != '雷') {
        //      log('点击到数字')
        //      removeHide(s)
        //  }
    }
}
var markAround2 = function(array, x, y) {
    /*
    ###
    ###
    ###
    */
        // 左边 3 个
        if(array[x][y] == 0 ){
            plus2(array, x - 1, y - 1)
            plus2(array, x - 1, y)
            plus2(array, x - 1, y + 1)
            // 上下 2 个
            plus2(array, x, y - 1)
            plus2(array, x, y + 1)
            // 右边 3 个
            plus2(array, x + 1, y - 1)
            plus2(array, x + 1, y)
            plus2(array, x + 1, y + 1)
        }
        else if(array[x][y] != 0) {
            var id = '#id-'+String(x) + String(y)
            var s = e(id)
            removeHide(s)
        }
}
var removeHide = function(item) {
    if(item.classList.contains('hide')){
        item.classList.remove('hide')
    }
}
/*
1.遍历格子上的每个数，把没有显示出来的都给显示出来，如果显示出来则不动
*/

//当扫到雷时把游戏里面所有的空格都显示出来
var endshow = function(item,divarray) {
    var all = document.querySelectorAll('.single')
    for (var i = 0; i < all.length; i++) {
        var single = all[i]
        var value = single.innerHTML
        if(value == 0) {
            single.classList.add('showZero')
        }else {
            single.classList.remove('hide')
        }
    }

}

var addTime = function() {
    var startTime = e('#start-time')
    var time = parseInt(startTime.innerHTML)
    var time = time + 1
    startTime.innerHTML = time
}
var controlTime = function(index){
    var startTime = e('#start-time')
    if (index =='start') {
        if (!startTime.classList.contains('time')) {
            startTime.classList.add('time')
             timer1 =setInterval('addTime()',1000)
        }
   }else if (index =='stop') {
       clearInterval(timer1)
   }
}
var downMark = function() {
    var showMark = e('#id-showmark')
    var num = parseInt(showMark.innerHTML)
    if(num <= 0) {
        showMark.innerHTML= 0
    }else {
        num -= 1
        showMark.innerHTML = num
    }
}

var markFlag = function(item) {
    var template = `
        <img src="./image/红旗.png" alt="1">
    `
    var innerHTML = item.innerHTML
    item.innerHTML = null
    appendHtml(item, template)
}

var markBoom = function() {
    var template = `
        <img src="./image/boom2.png" alt="1">
    `
    var single = document.querySelectorAll('.single')
    for (var i = 0; i < single.length; i++) {
        var item = single[i]
        if(item.innerHTML == '雷') {
            item.innerHTML = null
            appendHtml(item, template)
        }
    }

}
var judegeWin = function() {
    var boom = getBoomNum()
    if(boom == 0){
        alert('你赢了')
    }
}
// bind click
var bindSingle = function() {
    var divarray = divArray()
    var container = e('.container')
    var showMark = e('#id-showmark')
    bindEvent(container, 'mousedown', function(event){
        var num = parseInt(showMark.innerHTML)
        controlTime('start')
        var item = event.target
        // btnNum 0为左键，1为中建，右键为2
        var btnNum = event.button
        var value = item.innerHTML
        //获取click的方格ID的数组编号
        var xIndex = parseInt(item.id.split('-')[1][0])
        var yIndex = parseInt(item.id.split('-')[1][1])
        //根据左右键执行不同程序
        if(btnNum == 0) {
            if(value == '雷') {
                markBoom()
                controlTime('stop')
                removeHide(item)
                //遍历出所有元素。
                endshow()
                alert('你输了')
            }
            else if(value == 0) {
                //显示该格的8个按钮
                judegeWin()
                item.classList.add('showZero')
                markAround2(divarray, xIndex, yIndex)
            }else {
                judegeWin()
                removeHide(item)
            }
        }
        else if(btnNum == 2 ) {
            if(num >= 0) {
                downMark()
                markFlag(item)
            }
            judegeWin()
        }
    })
}

var _main = function() {
    initShow()
    addHide()
    bindSingle()
}

_main()
