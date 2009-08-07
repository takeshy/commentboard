class AddIndexToComment < ActiveRecord::Migration
  def self.up
		add_index(:comments,:created_at)
  end

  def self.down
		remove_index(:comments,:created_at)
  end
end
