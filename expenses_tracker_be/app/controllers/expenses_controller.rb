class ExpensesController < ApplicationController
  rescue_from StandardError, with: :handle_conversion_error

  def create
    CreateExpense.new(params: expense_params, flash: flash).call
    redirect_to root_path
  end

  def destroy
    DestroyExpense.new(params: set_expense, flash: flash).call
    redirect_to root_path
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
    redirect_to root_path
  end
end
