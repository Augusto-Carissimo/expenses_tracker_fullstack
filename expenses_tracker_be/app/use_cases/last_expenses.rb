class LastExpenses
  def call
    Expense.order(created_at: :desc).limit(10)
  end
end