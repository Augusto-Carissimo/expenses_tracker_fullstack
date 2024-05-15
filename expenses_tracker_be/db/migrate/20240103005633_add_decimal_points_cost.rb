class AddDecimalPointsCost < ActiveRecord::Migration[7.0]
  def up
    change_table :expenses do |t|
      t.change :cost, :decimal, precision: 8, scale: 2
    end
  end

  def down
    change_table :expenses do |t|
      t.change :cost, :decimal
    end
  end
end
