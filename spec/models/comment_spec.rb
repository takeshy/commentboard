require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Comment do
  fixtures :comments
  describe "正常作成" do
		before(:each) do
			@valid_attributes = {
				:user_name => "ユーザーA",
				:body => "正しい内容"
			}
		end
		it "名前、内容が記述されている場合は、登録できること" do
			Comment.create!(@valid_attributes)
		end
	end
  describe "名前が記述されていない場合" do
		it "例外が投げられ、登録されないこと" do
			lambda{Comment.create!({:user_name=>'',:body=>'いろいろ'})}.should raise_error(ActiveRecord::RecordInvalid) 
		end
	end
  describe "コメントが記述されていない場合" do
		it "例外が投げられ、登録されないこと" do
			lambda{Comment.create!({:user_name=>'トニー',:body=>''})}.should raise_error(ActiveRecord::RecordInvalid)
		end
	end
end
