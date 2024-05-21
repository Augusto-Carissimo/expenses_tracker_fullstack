class ExpensesController < ApplicationController
  skip_before_action :verify_authenticity_token
  rescue_from StandardError, with: :handle_conversion_error

  def index
    @last_expenses = LastExpenses.new.call
    render json: @last_expenses
  end

  def create
    CreateExpense.new(params: expense_params, flash: flash).call
    render json: { message: 'Creating Expense' }, status: :ok
  end

  def destroy
    DestroyExpense.new(params: set_expense, flash: flash).call
    render json: { message: 'Deleting Expense' }, status: :ok
  end

  def total_expenses
    total = CalculateExpenses.new.calculate_total
    render json: { total_expenses: total }
  end

  def monthly_expenses
    monthly = CalculateExpenses.new.calculate_monthly
    render json: { monthly_expenses: monthly }
  end

  private

  def set_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense).permit(:cost, :type_id, :expense_name, :created_at)
  end

  def handle_conversion_error(exception)
    Rails.logger.error "An error occurred: #{exception.message}"
    flash[:alert] = 'Failed to convert cost to dolars. Expense was not added.'
    render json: { message: 'Error' }, status: :ok
  end
end
