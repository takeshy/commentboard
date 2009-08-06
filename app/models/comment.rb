class Comment < ActiveRecord::Base
	validates_length_of :user_name,:minimum=>1,:message=>"名前が入力されていません。"
	validates_length_of :body,:minimum=>1,:message=>"コメントが入力されていません。"
end
