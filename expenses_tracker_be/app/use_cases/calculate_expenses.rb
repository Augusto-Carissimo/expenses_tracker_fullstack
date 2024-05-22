class CalculateExpenses
  def calculate_total
    all_type_expenses.map { |t| { name: t.name, value: t.total_expense.to_f } }
  end

  def calculate_monthly
    all_type_expenses.map { |t| { name: t.name, value: t.month_expense.to_f } }
  end

  private

  def all_type_expenses
    @all_type_expenses ||= Type.includes(:expenses).all
  end
end