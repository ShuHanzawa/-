$(async function ()  {
    
    window.onload = function() {
        // URLを取得
        const url = new URL(window.location.href);
        // URLSearchParamsオブジェクトを取得
        const params = url.searchParams;
        // consoleに受け取ったパラメータを出力
        console.log(params);
        // パラメータから「username」を取得
        const username = params.get("username");
        console.log(username);          
    }
    
    
    const requestData = {
    star: $("#deta radio[name=horoscope]").val(),
    blood: $("#deta radio[name=blood]").val(),
    eto: $("#deta radio[name=blood]").val()
  };

  // 日付を xxxx-xx-xx　に変換
const date = new Date();
const month = Number(("0" + (date.getMonth() +1)).slice(-2));
const day = Number(("0" + (date.getDate() )).slice(-2));
const yydd = (month + day);


  let colors = ["赤","青","黄色","緑","紫","オレンジ","白","黒","グレー"];
  let items = ["ボールペン","ハンカチ","ティッシュ","メモ帳","イヤホン"]
  const color = Math.floor( Math.random() * colors.length );
  const item = Math.floor( Math.random() * items.length );

  const result = (Number(requestData.star) + Number(requestData.blood) + Number(requestData.eto) + yydd) % 5;
  console.log(result);

switch (result){
    case 0: $("#result").text("絶好調！");
        break;
    case 1: $("#result").text("よい");
        break;
    case 2: $("#result").text("普通");
        break;
    case 3: $("#result").text("まずまず");
        break;
    case 4: $("#result").text("よくないかも");
        break;
};

console.log(color);
console.log(item);

console.log(colors[color]);
console.log(items[item]);

$("#color").text(colors[color]);
$("#item").text(items[item]);
  

});
