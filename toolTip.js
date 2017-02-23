var removeItem = function(sel) {
    var tags = document.querySelectorAll(sel)
    for (var i = 0; i < tags.length; i++) {
        tag = tags[i]
        tag.remove()
    }
}
var callback = function(index) {
    if(!index) {
        removeItem('.modal-remove')
    } else {
        //初始化到简单模式
        removeItem('.modal-remove')
        var container = e('.container')
        var showMark = e('#id-showmark')
        container.innerHTML = null
        addSquare()
        addSingle()
        showMark.innerHTML = 15
        var array = CreateBoomArray(15)
        var markarray = markedSquare(array)
        showArray(markarray)
        addHide()
    }
}

var toolTip = function(title, message, callback) {
    /*
    title 是 string
    message 是 string
    callback 是一个接受一个 bool 类型参数的函数

    这个函数生成一个弹窗插入页面
    弹窗包含 title 作为标题 和 message 作为信息
    还包含一个 OK 按钮 和一个 Cancel 按钮
    点击 OK 按钮关闭弹窗, 调用 callback(true)
    点击 Cancel 按钮关闭弹窗, 调用 callback(false)
    */
    var t = `
    <div class='modal-container modal-remove'>
        <div class='modal-mask'></div>
        <div class="modal-alert vertical-center">
            <div class="modal-title">
                ${title}
            </div>
            <div class="modal-message">
                ${message}
            </div>
            <div class='modal-control'>
                <button class="modal-button" type="button" data-type="return">返回界面</button>
                <button class="modal-button" type="button" data-type="restart">重新开始</button>
            </div>
        </div>
    </div>
    `
    var body = e('body')
    appendHtml(body, t)
    // css
    var css = `
    <style class="modal-remove">
        .modal-container {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message {
            font-size: large;
            text-align: center;
            padding: 10px 5px;
            background: white;
        }
        .modal-control {
            font-size: 0;
        }
        .modal-button {
            width: 50%;
            height: 100%;
            font-size: 22px;
            border: 0;
        }
        .vertical-center {
            top: 25%;
            position: relative;
            transform: translateY(-50%);
        }
    </style>
    `
    var head = e('head')
    appendHtml(head, css)
    // event
    bindAll('.modal-button', 'click', function(event){
    // e('body').addEventListener('click', function(event){
        console.log('click button')
        var type = event.target.dataset.type
        log('type', type)
        if (type === 'return') {
            callback(false)
        } else {
            callback(true)
        }
    })
}
