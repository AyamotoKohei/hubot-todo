// Description:
//  TODOを管理できるボットです
// Commands:
//  ボット名 add        - TODOを作成
//  ボット名 done       - TODOを完了にする
//  ボット名 del        - TODOを消す
//  ボット名 list       - TODOの一覧表示
//  ボット名 donelist   - 完了したTODOの一覧表示
'use strict';

// todoパッケージを読み込む
const todo = require('todo');

module.exports = robot => {
    // addの実装
    robot.respond(/add (.+)/i, msg => {
        // 1番目の()でマッチした文字列の両端の空白を取り除いた文字列を取得する関数
        const task = msg.match[1].trim();

        // todoモジュールのadd関数を呼び出す
        todo.add(task);
        
        // ボットに発言をさせる
        msg.send(`追加しました: ${task}`);
    });

    // doneの実装
    robot.respond(/done (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send(`完了しました: ${task}`);
    });

    // delの実装
    robot.respond(/del (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send(`削除しました: ${task}`);
    });

    // listの実装
    robot.respond(/list/i, msg => {
        const list = todo.list();

        if (list.length === 0) {
            msg.send('(TODOはありません)');
        } else {
            // 配列の全ての要素を与えられた文字列で繋いで1つの文字列にする
            msg.send(list.join('\n'));
        }
    });

    // donelistの実装
    robot.respond(/donelist/i, msg => {
        const donelist = todo.donelist();
        
        if (donelist.length === 0) {
            msg.send('(完了したTODOはありません)');
        } else {
            msg.send(donelist.join('\n'));
        }
    });
};