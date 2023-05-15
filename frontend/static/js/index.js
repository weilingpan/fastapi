(function() {

    function getUsers() {
        var input = $("#inputText").val();

        MyAPI.get('/router1/users/')
          .then(function(response) {
              console.log(response.data);
              $('#outputText').text("You input: "+ input);
          })
          .catch(function(error) {
              console.log(error);
          })
          .finally(() => {
              console.log('axios finally');
          });
      }

    function postTest() {
        var who = $("#inputText").val();

        MyAPI.post('/hello/'+who)
            .then((res) => {
                console.log('axios success', res.data)
                // const txtinfos = res.data.answer.choices.map((item) => {  return item.message.content })
                // $('#Message').text(txtinfos)
                $('#outputText').text("Hello "+ who);
            })
            .finally(() => {
                console.log('axios finally');
            }) 
    }

    $(document).ready(function(){
      $('#btnSend').click(function(){
          $.blockUI({message: '<h1><img src="/static/loading.gif" width="120" height="120"/><br>讀取中...</h1>' });
          setTimeout(function () {$.unblockUI(); }, 3000); //3秒後，解除BlockUI
  
          // GET test
          getUsers()
  
          // POST test
          // postTest()
          
      });
    });
  })();