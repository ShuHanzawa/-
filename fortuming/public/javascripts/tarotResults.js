const httpGet = async function (url) {  
    try {
      const response = await fetch(url, {
        method: "GET", // GET
      });
      return response.json(); // JSON のレスポンスを JavaScript のオブジェクトに変換
    } catch (err) {
      console.log(err);
    }
  };
  
    $(async function () {
        const num = Math.floor( 1 + Math.random() * 4 ); //ランダムで数字を出す
            console.log(num);
        const judge = Math.floor(Math.random()*2 + 1) ; // 正位置、逆位置の判定
            console.log(judge);
        const id = num;
            console.log(id)
        const data = await httpGet("//" + window.location.host + `/api/results/${id}`);
            console.log("//" + window.location.host + `/api/results/${id}`);
        const list = data.map((item) => {
            if (judge == 1){
                return `
            <div class="card">
                <img id="image1a" src="/images/tarotCard.PNG" class="card-wrongside">
                <img id="#image1b" class="card-rightside" src="/images/${item.img}.png">
            </div>
            <div class="text">            
                <h2 class="fadeIn1">${item.name}の正位置</h2>
                <div class="fadeIn2">
                    <h2>このカードの意味は‥‥</h2>
                        <p>${item.good}</p>
                    <div class="return-wrapper">
                        <div class="return-button"><a onclick="location.href='/tarot'">もう一度占う</a></div>
                    </div>
                </div>
            </div>
                `;
            } else {
                return `
            <div class="card">
                <img id="image1a" src="/images/tarotCard.PNG" class="card-wrongside">
                <img id="#image1b" class="card-rightside bad" src="/images/${item.img}.png">
            </div>
            <div class="text">            
                <h2 class="fadeIn1">${item.name}の逆位置</h2>
                <div class="fadeIn2">
                    <h2>このカードの意味は‥‥</h2>
                        <p>${item.bad}</p>
                    <div class="return-wrapper">
                        <div class="return-button"><a onclick="location.href='/tarot'">もう一度占う</a></div>
                    </div>
                </div>
            </div>
                `;
            };
        });
        $("div.result").append(list);
    });