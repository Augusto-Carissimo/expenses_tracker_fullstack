class HomeController < ApplicationController
  def index
    @total_expenses = total_expenses
    @monthly_expenses = monthly_expenses
    @last_expenses = Expense.order(created_at: :desc).limit(10)
  end

  def test
    @test = 'test'
    render json: @test.to_json, status: :ok
  end

  private

  def all_type_expenses
    @all_type_expenses ||= Type.includes(:expenses).all
  end

  def total_expenses
    total_expense = all_type_expenses.sum(&:total_expense)
    return {} if total_expense.zero?

    all_type_expenses.each_with_object({}) do |type, expense|
      expense[type.name] = ((type.total_expense / total_expense) * 100).round(2)
    end
  end

  def monthly_expenses
    total_monthly_expense = all_type_expenses.sum(&:month_expense)
    return {} if total_monthly_expense.zero?

    all_type_expenses.each_with_object({}) do |type, expense|
      expense[type.name] = ((type.month_expense / total_monthly_expense) * 100).round(2)
    end
  end
end
