$(document).ready(function(){
    $('#btnSend').click(function(){
        input = $("#inputText").val()
        console.log('Input: ' + input);
        $('#outputText').text("You input: "+ input)

        $.blockUI({message: '<h1><img src="/static/loading.gif" width="120" height="120"/><br>讀取中...</h1>' });
        setTimeout(function () {$.unblockUI(); }, 3000); //3秒後，解除BlockUI

        // GET test
        MyAPI.get('/router1/users/')
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);

            })
            .finally(() => {
                console.log('axios finally')
            }) 

        // POST test
        // MyAPI.post('/ask/'+question)
        //     .then((res) => {
        //         console.log('axios success', res.data)
        //         const answer = res.data.gpt_answer
        //         const txtinfos = answer.choices.map((item) => {  return item.message.content })
        //         $('#txtareaChatGPTMessage').text(txtinfos)
        //     })
        //     .finally(() => {
        //         console.log('axios finally')
        //     }) 
    });
});