class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.decimal :cost
      t.references :type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
