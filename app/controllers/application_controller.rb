# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  WEEK_DAY = {0=>'日',1=>'月',2=>'火',3=>'水',4=>'木',5=>'金',6=>'土'}
  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
end
