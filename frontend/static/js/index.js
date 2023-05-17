(function() {
    // text取值設值, val 取值設值, append, remove, hide

    const elements = {
        inputText: $("#inputText"),
        outputText: $('#outputText'),

        btnSend: $('#btnSend'),
        btnClear: $('#btnClear'),
        btnClearHis: $('#btnClearHis'),
        // btnCopy: $('#btnCopy'),
        // btnSave: $('#btnSave'),

        areaHistory: $("#history")
    }

    const handleGet = () => {
        input = elements.inputText.val();

        MyAPI.get('/router1/users/')
          .then(function(response) {
              console.log(response.data);
              elements.outputText.text("You input: "+ input);
          })
          .catch(function(error) {
              console.log(error);
          })
          .finally(() => {
              console.log('axios finally');
          });
      }
    
    const handlePost = () => {
        console.log('handlePost')
        who = elements.inputText.val();

        MyAPI.post('/echo/'+who)
            .then((res) => {
                $.blockUI({message: '<h1><img src="/static/loading.gif" width="120" height="120"/><br>讀取中...</h1>' });
                console.log('axios success', res.data)
                // const txtinfos = res.data.answer.choices.map((item) => {  return item.message.content })
                // $('#Message').text(txtinfos)
            })
            .catch(function(error) {
                console.log(error);
            })
            .finally(() => {
                elements.outputText.text("Echo: "+ who);
                console.log('axios finally');
                $.unblockUI();
                handleSave()
            }) 
    }

    const handleClear = () => {
        console.log('handleClear')
        elements.inputText.val('')
        elements.outputText.text('')
    }

    const handleSave = () => {
        console.log('handleSave')

        var date = new Date();

        // append 往下加, prepend 往上加
        elements.areaHistory.prepend(
            `<div class="row records">
                <div class="col"><input type="checkbox" class="status"></div>
                <div class="col"><p>${date.toLocaleString()}</p></div>
                <div class="col recordInput"><p>${elements.inputText.val()}</p></div>
                <div class="col"><p>${elements.outputText.val()}</p></div>
                <div class="col"><button class="delete btn btn-light">Delete</button>
                <button class="copyInput btn btn-light">CopyInput</button>
                <button class="copyOutput btn btn-light">CopyOutput</button>
                <button class="reInput btn btn-light">重新提問</button></div>
            </div>`
          );

        elements.btnClearHis.show()

        $(".delete").each(function(){
            $(this).click(function(){
                $(this).closest('.records').remove(); 
            })
        })

        // $(".reInput").each(function(){
        //     handleClear()
        //     $(this).click(function(){
        //         txt = $(this).closest('.records')
        //         console.log(txt)
        //         console.log(txt[0].outerText)
        //         // elements.inputText.val('reInput')
        //     })
        // })

        // elements.inputText.clone().insertAfter($('#i-history'))
        // elements.outputText.clone().insertAfter($('#o-history'))
    }

    const handleClearHis= () => {
        // remove 會把整個 ele 刪除
        console.log('handleClearHis')
        $('.records').remove()
        elements.btnClearHis.hide()
    }

    const main = () => {
        console.log('Init Function')
        elements.btnSend.click(handlePost)
        elements.btnClear.click(handleClear)
        // elements.btnSave.click(handleSave)
        elements.btnClearHis.click(handleClearHis)
    }
    main()


})();