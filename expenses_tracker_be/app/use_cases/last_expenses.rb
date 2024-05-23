class LastExpenses
  def call
    Expense.order(created_at: :desc).limit(5)
  end
end