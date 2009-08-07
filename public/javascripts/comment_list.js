var CommentList = Class.create({
  initialize:function(args){
	this.id = args.id;
	this.url = '/comments/list.json';
	this.dataSet = null;
  if(args.params){
    this.params = args.params;
  }
  else                                                                                                                    {
    this.params = new Object();
  }
  this.loadData();
},
loadData:function()
{
  this.params.tmpid = new Date().getTime();
  var a = new Ajax.Request(
      '/comments/list.json',
      {
          "method": "get",
          "parameters":$H(this.params).toQueryString(),
          onSuccess: function(response) {
            this.dataSet = response.responseText.escapeHTML().evalJSON(true);
            this.setCommentList(this.dataSet);
          }.bind(this),
          onFailure: function(response) {
            alert('読み込みに失敗しました');
          },
          onException: function (response) {
            alert('読み込み中にエラーが発生しました');
          }
      });
},
setCommentList:function(data)
{
  $(this.id).update("");
  for(var i=0;i<this.dataSet.length;i++)
  {
    var comment = this.dataSet[i];

    var dlElem = '<dl><dt>'+ comment.index + " 名前:<span class='vivid'>" + comment.user_name+ "</span> " + 
                  comment.datetime + "</dt>" +  '<dd>' + comment.body + '</dd></dl>';
    $(this.id).insert(dlElem);
  }
},
submit_form:function(form,call_back) {
  var a = new Ajax.Request(
      '/comments',
      {
          "method": "post",
          "parameters":form.serialize(),
          onSuccess: function(response) {
            this.loadData();
            call_back("");
          }.bind(this),
          onFailure: function(response) {
            call_back(response.responseText);
          }.bind(this),
          onException: function (response) {
            alert('読み込み中にエラーが発生しました');
          }
      });
}
});

function date_to_s(dateObj){
  return dateObj.getFullYear() + "/" + (dateObj.getMonth()+1) + "/" + dateObj.getDate();
}

document.observe('dom:loaded',function(){
  var today = new Date();
  var start_day = new Date(today.getFullYear(),today.getMonth(),1);
  var end_day = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
  var c_list = new CommentList({id: "comment_list",params:{from:date_to_s(start_day),to:date_to_s(end_day)}});
  var update_date_obj = new DateSpan({id:"disp_span",start:{year:-1},
                                default_start_day:start_day,default_end_day:today});

  $('change_span').observe('click',function(){
    from = $('start_disp_span_year').value + "/" + $('start_disp_span_month').value + "/" + $('start_disp_span_day').value;
    to = $('end_disp_span_year').value + "/" + $('end_disp_span_month').value + "/" + 
      (parseInt($('end_disp_span_day').value)+1);

    c_list.params = {from:from,to:to}
    c_list.loadData();
    });

  $('register_comment').observe('click',function(){ 
    c_list.submit_form($$('form')[0],function(msg){
      $("error_area").update("");
      $('comment_user_name').style.background="white";
      $('comment_body').style.background="white";
      if(msg == ""){
        $('comment_body').value="";
      }
      else
      { 
        if(msg.match(/名前/)){
          $('comment_user_name').style.background="#fcc";
        }
        if(msg.match(/コメント/)){
          $('comment_body').style.background="#fcc";
        }
        msg = msg.gsub("\n","<br>");
        $("error_area").update(msg);
      }
      });});
  $('comment_user_name').focus();
});
