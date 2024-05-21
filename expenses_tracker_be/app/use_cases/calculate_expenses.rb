class CalculateExpenses
  def calculate_total
    total_expense = all_type_expenses.sum(&:total_expense)
    return {} if total_expense.zero?

    all_type_expenses.each_with_object({}) do |type, expense|
      expense[type.name] = ((type.total_expense / total_expense) * 100).round(2)
    end
  end

  def calculate_monthly
    total_monthly_expense = all_type_expenses.sum(&:month_expense)
    return {} if total_monthly_expense.zero?

    all_type_expenses.each_with_object({}) do |type, expense|
      expense[type.name] = ((type.month_expense / total_monthly_expense) * 100).round(2)
    end
  end

  private

  def all_type_expenses
    @all_type_expenses ||= Type.includes(:expenses).all
  end
end