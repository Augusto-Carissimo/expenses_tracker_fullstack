class CreateExpense

  def initialize(params:, flash:)
    @params = params
    @flash = flash
  end

  def call
    expense = Expense.new(@params)
    @flash[:notice] = 'New expense added successfully.' if expense.save
    @flash.now[:alert] = 'Failed to add the expense. Please check the form.' unless expense.persisted?
  end
end
