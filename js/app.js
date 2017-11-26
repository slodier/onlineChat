$(function () {
    var width = window.innerWidth / 10;
    document.getElementsByTagName('html')[0].style.fontSize = width;

    connectWs();

});

// 连接 ws
function connectWs() {
    var ws = new WebSocket("ws://ip:5050");    // 这里连接需要填写实际 ip 地址,不然其他设备连接会报错,根据自己情况设定
    // 连接
    ws.onopen = function (event) {
        console.log('opened');
        alert('opened');
    };

    // 收到消息
    ws.onmessage = function (event) {
        console.log('receive: ' + event.data);
        otherDoc(event.data);
        scrollBottom();
    };

    // 关闭
    ws.onclose = function (p1) {
        console.log('close');
    }

    // 错误
    ws.onerror = function (event) {
        var text = [];
        for (var value in event){
            var key = value;
            var dict = {};
            dict[key] = event[value];
            text.push(dict);
        }
        // alert(text);
        otherDoc(JSON.stringify(text));
        console.log(event);
    }

    // 发送消息
    sendMsg(ws);
}

// 发送按钮点击事件,并滚动到最底部
function sendMsg(ws) {
    $('.chat_edit button').click(function () {
        var $edit = $('.chat_edit input');
        var msg = $edit.val();    // 需要发送的消息
        if (msg == null || msg.length == 0 || !verifyMsg(msg)) {
            alert('您的输入有误');
            return;
        }
        meDoc(msg);
        scrollBottom();
        ws.send(msg);
        $edit.val(null);
    });
}

// 验证发送的消息,不能为空、全为空格
function verifyMsg(test) {
    if(test.match(/^\s+$/)){
        return false;
    }
    if(test.match(/^[ ]+$/)){
        return false;
    }
    if(test.match(/^[ ]*$/)){
        return false;
    }
    if(test.match(/^\s*$/)){
        return false;
    } else {
        return true;
    }
}

// 收到对方的消息,滚动到最底部
function scrollBottom() {
    var height = $('.chat_thread').height();

    $('.chat').animate({    // 滚动到最底部
        scrollTop: height
    }, 300);
}

// 自己的消息
function meDoc(me) {
    var me = '        <li class="me">\n' +
        '            <img src="./public/res/me.jpeg" class="user_icon">\n' +
        '            <div class="chat_content">\n' +
        '                <p>' + me +'</p>\n' +
        '            </div>\n' +
        '            <div class="arrow"></div>\n' +
        '        </li>'
    $('.chat_thread').append(me);
    $('.me:last').insertBefore($('.space'));     // 将当前元素插入到已有 div 元素前面
}

// 对方的消息
function otherDoc(other) {
    var other = '        <li class="other">\n' +
        '            <img src="./public/res/me.jpeg" class="user_icon">\n' +
        '            <div class="chat_content">\n' +
        '                <p>' + other + '</p>\n' +
        '            </div>\n' +
        '            <div class="arrow"></div>\n' +
        '        </li>';
    $('.chat_thread').append(other);
    $('.other:last').insertBefore($('.space'));    // 将当前元素插入到已有 div 元素前面
}