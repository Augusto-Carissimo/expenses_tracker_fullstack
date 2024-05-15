class AddColumnExpenses < ActiveRecord::Migration[7.0]
  def up
    add_column :expenses, :expense_name,:string
  end

  def down
    remove_column :expenses, :expense_name
  end
end
