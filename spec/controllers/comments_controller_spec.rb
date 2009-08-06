require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe CommentsController do
  fixtures :comments
  #Delete these examples and add some real ones
  it "should use CommentsController" do
    controller.should be_an_instance_of(CommentsController)
  end

  describe "GET 'index'" do
    it "should be successful" do
      get 'index'
      response.should be_success
    end
  end
  describe "GET 'list'" do
    it "すべてのコメントを降順でロードしていること" do
      assigns[:format] = 'json'
      get 'list'
      assigns[:comments].should == [comments(:two),comments(:one)]
    end
  end
  describe "post 'create'" do

    describe "正常" do
      it "should be successful" do
        post 'create',:comment=>{:user_name=>'a',:body=>'bb'}
        response.should be_success
      end
      it "レコードが増えていること" do
        @count = Comment.find(:all).size
        post 'create',:comment=>{:user_name=>'a',:body=>'bb'}
        (@count + 1).should be_eql(Comment.find(:all).size)
      end
    end
    describe "名前がない" do
      it "レスポンスコードが400で返ること" do
        post 'create',:comment=>{:user_name=>'',:body=>'bb'}
        response.response_code.should be_eql(400)
      end
      it "正しいエラーメッセージが返ること" do
        post 'create',:comment=>{:user_name=>'',:body=>'bb'}
        response.body.should be_eql('名前が入力されていません。')
      end
      it "レコードが増えていないこと" do
        @count = Comment.find(:all).size
        post 'create',:comment=>{:user_name=>'',:body=>'bb'}
        @count.should be_eql(Comment.find(:all).size)
      end
    end
    describe "コメントがない" do
      it "レスポンスコードが400で返ること" do
        post 'create',:comment=>{:user_name=>'a',:body=>''}
        response.response_code.should be_eql(400)
      end
      it "正しいエラーメッセージが返ること" do
        post 'create',:comment=>{:user_name=>'a',:body=>''}
        response.body.should be_eql('コメントが入力されていません。')
      end
      it "レコードが増えていないこと" do
        @count = Comment.find(:all).size
        post 'create',:comment=>{:user_name=>'a',:body=>''}
        @count.should be_eql(Comment.find(:all).size)
      end
    end
  end
end
