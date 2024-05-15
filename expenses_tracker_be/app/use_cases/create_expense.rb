class CreateExpense

  def initialize(params:, flash:)
    @params = params
    @flash = flash
  end

  def call
    expense = Expense.new(@params)
    convert_cost_to_dolars(expense) if expense.cost.present?
    @flash[:notice] = 'New expense added successfully.' if expense.save
    @flash.now[:alert] = 'Failed to add the expense. Please check the form.' unless expense.persisted?
  end

  private

  def convert_cost_to_dolars(expense)
    dolar_price = DolarService.new.fetch_dolar_price
    expense.cost /= dolar_price
  end
end
