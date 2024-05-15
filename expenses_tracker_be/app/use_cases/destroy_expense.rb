class DestroyExpense

  def initialize(params:, flash:)
    @params = params
    @flash = flash
  end

  def call
    @expense = Expense.find(@params.id)
    @expense.destroy
  end
end