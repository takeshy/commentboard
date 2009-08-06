# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_commentboad_session',
  :secret      => 'b4b08c26f177a8797d50e0d39809f7808acac2347d29f2ce8b1630caa3ce41725be8966cad922dd457b87a86eb784ad28cb806887f44a08fdebcadfa3292e31e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
