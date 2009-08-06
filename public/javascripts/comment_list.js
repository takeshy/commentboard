var CommentList = Class.create({
  initialize:function(args){
	this.id = args.id;
	this.page_num = args.page_num;
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
document.observe('dom:loaded',function(){
var c_list = new CommentList({id: "comment_list",page_num:20});
$('register_comment').observe('click',function(){ 
  c_list.submit_form($$('form')[0],function(msg){
    $("error_area").update("");
    $('comment_user_name').style.background="white";
    $('comment_body').style.background="white";
    if(msg == ""){
      $('comment_body').update("");
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
