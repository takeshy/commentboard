require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "/comments/index" do
  before(:each) do
    render 'comments/index'
  end

  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('div', %r[掲示板])
  end
end
