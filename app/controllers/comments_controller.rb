class CommentsController < ApplicationController
  def index
  end
  def list
   @comments = Comment.find(:all,:order => "created_at ASC")
   @respond = []
   @comments.each_with_index do |comment,i|
     data_set = {}
     data_set["index"] = i+1
     data_set["user_name"] = comment.user_name
     data_set["body"] = comment.body
     c = comment.created_at
     data_set["datetime"] = c.year.to_s + "/" + "%02d"%c.month + "/" + "%02d"%c.day + "(" + WEEK_DAY[c.wday] + ")" +
                             " " +  "%02d"%c.hour + ":" + "%02d"%c.min + ":" + "%02d"%c.sec
     @respond.push(data_set)
   end
   render :json => @respond.to_json
  end
  def create
    @comment = Comment.create(params[:comment])
    unless @comment.valid?
      err_msg = ""
      @comment.errors.each do |h,m|
        err_msg += "\n" unless err_msg == ""
        err_msg += m 
      end
      render :text=> err_msg,:status=>400
      return
    end
    @comment.save
    return render(:nothing=>true)
  end
end
