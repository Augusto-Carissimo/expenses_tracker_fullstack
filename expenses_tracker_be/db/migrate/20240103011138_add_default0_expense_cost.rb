class AddDefault0ExpenseCost < ActiveRecord::Migration[7.0]
  def up
    change_column_default :expenses, :cost, 0.0
  end

  def down
    change_column_default :expenses, :cost, nil
  end
end
